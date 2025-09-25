"use client";

import { useAdminSession } from "@/lib/auth-client";
import { AdminLoginForm } from "@/components/admin-login-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { isAdmin, isPending } = useAdminSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && isAdmin) {
      // Redirect to admin dashboard if already authenticated
      router.push('/admin/dashboard');
    }
  }, [isAdmin, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]" data-admin-page>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[var(--color-border-focus)]"></div>
      </div>
    );
  }

  if (isAdmin) {
    return null; // Will redirect to admin dashboard
  }

  return (
    <div className="bg-[var(--color-bg)] min-h-screen flex flex-col items-center justify-center p-6 md:p-10" data-admin-page>
      <div className="w-full max-w-sm md:max-w-3xl">
        <AdminLoginForm />
      </div>
    </div>
  );
}