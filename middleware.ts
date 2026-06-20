import { withAuth } from "next-auth/middleware";

// This explicitly exports the required middleware function
export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

// This defines which routes are protected
export const config = {
  matcher: ["/admin/:path*"],
};