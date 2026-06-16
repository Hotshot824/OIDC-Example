"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-indigo-600 tracking-tight">OIDC Lab</span>
          </div>
          <div className="flex items-center gap-4">
            {status === "loading" ? (
              <div className="h-8 w-20 bg-gray-100 animate-pulse rounded"></div>
            ) : session ? (
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-gray-600">
                  {session.user?.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("keycloak")}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
