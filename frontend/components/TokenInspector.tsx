interface TokenInspectorProps {
  token?: string;
}

export default function TokenInspector({ token }: TokenInspectorProps) {
  if (!token) return null;

  return (
    <div className="bg-white shadow rounded-lg border border-gray-100 overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-100">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Access Token</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">This JWT is used to authenticate requests to the backend.</p>
      </div>
      <div className="p-4">
        <div className="relative">
          <div className="bg-gray-50 rounded border border-gray-200 p-3 overflow-hidden">
            <p className="text-[10px] font-mono break-all text-gray-600 leading-relaxed">
              {token}
            </p>
          </div>
          <div className="absolute top-0 right-0 p-2">
             <span className="text-[10px] font-bold text-gray-300 uppercase">JWT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
