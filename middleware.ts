import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 👇 Define public routes (accessible without auth)
const isPublicRoute = createRouteMatcher([
  "/",
  "/(auth)/sign-in(.*)",
  "/(auth)/sign-up(.*)",
  "/api/webhooks/clerk",
]);

// 👇 Define the middleware
export default clerkMiddleware(async (auth, req) => {
  // If not a public route, require auth
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

// 👇 Next.js Middleware Matcher Config
export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpg|jpeg|png|svg|gif|ico|woff2?|ttf|csv|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
