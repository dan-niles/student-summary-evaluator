import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";

export default authMiddleware();

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
