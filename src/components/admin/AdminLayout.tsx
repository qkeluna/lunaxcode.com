"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useSession, signOut } from '@/lib/auth-client';
import { 
  LayoutDashboard, 
  DollarSign, 
  Star, 
  CheckSquare, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface AdminLayoutProps {
  readonly children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Pricing Plans', href: '/admin/pricing', icon: DollarSign },
  { name: 'Features', href: '/admin/features', icon: Star },
  { name: 'Process Steps', href: '/admin/process', icon: CheckSquare },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { name: 'Form Submissions', href: '/admin/submissions', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check authentication - redirect to admin login if not authenticated
    if (!isPending && !session) {
      router.push('/admin');
      return;
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin');
  };

  // Show loading state while checking authentication
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Mobile sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out lg:hidden ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex h-16 items-center justify-between px-4">
            <span className="text-xl font-bold text-blue-600">Lunaxcode CMS</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    pathname === item.href
                      ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white dark:bg-gray-800 shadow-lg">
          <div className="flex h-16 items-center px-4">
            <span className="text-xl font-bold text-blue-600">Lunaxcode CMS</span>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                    pathname === item.href
                      ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {session.user.name ? session.user.name.charAt(0).toUpperCase() : session.user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {session.user.name || 'Admin User'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {session.user.email}
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}