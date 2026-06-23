interface TokenInspectorProps {
  token?: string;
}

export default function TokenInspector({ token }: TokenInspectorProps) {
  if (!token) return null;

  const decodeJWT = (t: string) => {
    try {
      const base64Url = t.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (e) {
      return null;
    }
  };

  const decoded = decodeJWT(token);

  const formatTime = (seconds: number) => {
    return new Date(seconds * 1000).toLocaleString();
  };

  return (
    <div className="bg-white shadow rounded-lg border border-gray-100 overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-100">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Access Token</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">This JWT is used to authenticate requests to the backend.</p>
      </div>
      <div className="p-4 space-y-4">
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

        {decoded && (
          <div className="bg-gray-900 rounded p-4 overflow-auto">
            <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase">Decoded Payload</h4>
            <div className="text-[11px] font-mono text-indigo-300">
              {Object.entries(decoded).map(([key, value]) => (
                <div key={key} className="flex gap-2">
                  <span className="text-gray-500 w-24">{key}:</span>
                  <span className="break-all">
                    {['exp', 'iat', 'auth_time'].includes(key) && typeof value === 'number'
                      ? `${value} (${formatTime(value)})`
                      : JSON.stringify(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
