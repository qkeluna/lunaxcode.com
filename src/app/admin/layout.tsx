"use client";

import { useSession } from '@/lib/auth-client';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const { isPending } = useSession();
  const pathname = usePathname();

  // Only show loading on the login page or when session is pending
  const isLoginPage = pathname === '/admin';

  if (isPending && isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // All admin pages now use the new sidebar layout consistently
  // No additional wrapper needed as each page handles its own layout
  return <>{children}</>;
}