import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";

export default authMiddleware({
	ignoredRoutes: ["/((?!api|trpc))(_next.*|.+.[w]+$)","/api/(.*)"],
   });

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)","/","/(api|trpc)(.*)"],
};
