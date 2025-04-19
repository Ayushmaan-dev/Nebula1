import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes using a matcher
const isPublicRoute = createRouteMatcher(["/api/webhooks/clerk"]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return;
  // otherwise, Clerk will protect the route
});

export const config = {
  matcher: [
    // Skip static/internal stuff
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
