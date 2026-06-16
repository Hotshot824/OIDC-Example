"use client";

import { useState } from "react";
import { Session } from "next-auth";
import { Button } from "./Button";
import { Spinner } from "./Spinner";

interface ApiExplorerProps {
  session: Session;
}

export default function ApiExplorer({ session }: ApiExplorerProps) {
  const [apiResponse, setApiResponse] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  const callBackend = async () => {
    if (!session.accessToken) return;
    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/hello", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      const data = await res.json() as Record<string, unknown>;
      setApiResponse(data);
    } catch (err) {
      console.error(err);
      setApiResponse({ error: "Failed to call backend" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg border border-gray-100 overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-100">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Backend Integration</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Test OIDC authentication with Spring Boot.</p>
      </div>
      <div className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Endpoint: <code className="bg-gray-100 px-1 rounded text-pink-600">/hello</code></span>
            <Button onClick={callBackend} disabled={loading}>
              {loading ? (
                <>
                  <Spinner className="-ml-1 mr-3 h-5 w-5 text-white" />
                  Calling...
                </>
              ) : "Call Secure API"}
            </Button>
          </div>

          {apiResponse && (
            <div className="mt-4">
              <div className="rounded-md bg-gray-900 p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Response Body</span>
                  <span className={`text-xs font-mono ${apiResponse.error ? 'text-red-400' : 'text-green-400'}`}>
                    {apiResponse.error ? 'Error' : '200 OK'}
                  </span>
                </div>
                <pre className="text-xs font-mono text-gray-100 overflow-auto max-h-60 scrollbar-thin scrollbar-thumb-gray-700">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
