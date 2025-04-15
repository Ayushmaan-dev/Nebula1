import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

import { createUser, deleteUser, updateUser } from "@/lib/actions/user.actions";

export async function POST(req: Request) {
  // 1. Retrieve the Clerk webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Missing CLERK_WEBHOOK_SECRET in .env");
  }

  // 2. Extract SVIX headers (used for webhook verification)
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing SVIX headers", { status: 400 });
  }

  // 3. Parse the incoming request payload
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // 4. Initialize Svix Webhook verifier with the secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    // 5. Verify the webhook payload using Svix headers
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid webhook", { status: 400 });
  }

  const eventType = evt.type;

  // --- Handle different Clerk webhook events ---

  // A. CREATE USER (Triggered when a new user signs up)
  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name, username } =
      evt.data;

    // Prepare user data for database
    const user = {
      clerkId: id,
      email: email_addresses[0]?.email_address || "", // Use first email
      username: username ?? "", // Fallback to empty string if null
      firstName: first_name ?? "",
      lastName: last_name ?? "",
      photo: image_url,
    };

    // Save user to database
    const newUser = await createUser(user);

    // Update Clerk metadata with our database user ID
    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id,
        },
      });
    }

    return NextResponse.json({ message: "user created", user: newUser });
  }

  // B. UPDATE USER (Triggered when user profile changes)
  if (eventType === "user.updated") {
    const { id, image_url, first_name, last_name, username } = evt.data;

    const user = {
      firstName: first_name ?? "",
      lastName: last_name ?? "",
      username: username ?? "",
      photo: image_url,
    };

    // Update user in database
    const updatedUser = await updateUser(id, user);
    return NextResponse.json({ message: "user updated", user: updatedUser });
  }

  // C. DELETE USER (Triggered when user is deleted)
  if (eventType === "user.deleted") {
    const { id } = evt.data;
    if (!id) {
      return new Response("User ID is missing", { status: 400 });
    }
    // Remove user from database
    const deletedUser = await deleteUser(id);
    return NextResponse.json({ message: "user deleted", user: deletedUser });
  }

  // Default response for unhandled events
  return new Response("Webhook received", { status: 200 });
}