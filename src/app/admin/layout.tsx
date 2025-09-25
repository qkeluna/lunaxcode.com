"use client";

import { useAdminSession } from '@/lib/auth-client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { QueryProvider } from '@/components/providers/QueryProvider';

export default function AdminLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const { isAdmin, isPending } = useAdminSession();
  const pathname = usePathname();
  const router = useRouter();

  // Check if we're on the login page
  const isLoginPage = pathname === '/admin';

  useEffect(() => {
    // If not pending and not admin and not on login page, redirect to login
    if (!isPending && !isAdmin && !isLoginPage) {
      router.push('/admin');
    }
  }, [isPending, isAdmin, isLoginPage, router]);

  // Show loading state while checking authentication
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Authenticating...</p>
        </div>
      </div>
    );
  }

  // If not authenticated and not on login page, show nothing (redirect will happen)
  if (!isAdmin && !isLoginPage) {
    return null;
  }

  // Wrap authenticated admin pages with QueryProvider for TanStack functionality
  if (isAdmin && !isLoginPage) {
    return (
      <QueryProvider>
        {children}
      </QueryProvider>
    );
  }

  // Login page doesn't need QueryProvider
  return <>{children}</>;
}