import { clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server";
//setting up CORS
// import { NextResponse } from "next/server";

// export function middleware(request: Request) {
//     const origin = request.headers.get("origin");
//     console.log(origin);    
    
//     const response = NextResponse.next();
//     response.headers.set("Access-Control-Allow-Origin", "*");
//     response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     response.headers.set("Access-Control-Max-Age", "86400");
    
//     console.log("middleware");
//     console.log(request.method);
//     console.log(request.url);
    

//     return NextResponse.next();
// }
// export const config = {
//     matcher:"/api/:path*",
// }
    


// const isPublicRoute = createRouteMatcher(["/signin(.*)", "/signup(.*)"]);

// export default clerkMiddleware((auth, request) => {
//   if (!isPublicRoute(request)) {
//     auth().protect();
//   }
// });
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};