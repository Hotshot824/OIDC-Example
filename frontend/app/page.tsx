"use client";

import { useSession } from "next-auth/react";
import UserCard from "../components/UserCard";
import ApiExplorer from "../components/ApiExplorer";
import TokenInspector from "../components/TokenInspector";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="text-gray-500 font-medium">Checking session...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            OIDC Authentication Lab
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            A secure environment for testing OpenID Connect flows with Next.js and Spring Boot.
          </p>
        </header>

        {!session ? (
          <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-r-lg shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-indigo-800">Authentication Required</h3>
                <div className="mt-2 text-sm text-indigo-700">
                  <p>Please sign in using the button in the top right corner to access the lab features.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <section className="grid grid-cols-1 gap-2">
              <UserCard session={session} />
              <ApiExplorer session={session} />
              <TokenInspector token={session.accessToken} />
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
