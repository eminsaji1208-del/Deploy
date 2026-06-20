// middleware.ts
export { default } from "next-auth/middleware";

export const config = {
  // The Bouncer: Protects /admin and absolutely any sub-page inside it
  matcher: ["/admin/:path*"],
};