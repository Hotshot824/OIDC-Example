import { Session } from "next-auth";

interface UserCardProps {
  session: Session;
}

export default function UserCard({ session }: UserCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-100">
        <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and session info.</p>
      </div>
      <div className="px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{session.user?.name || "N/A"}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{session.user?.email || "N/A"}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Auth Method</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Keycloak OIDC
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
