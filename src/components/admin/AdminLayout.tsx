"use client";

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/unified-button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Text, Heading } from '@/components/ui/text';
import { useSession, signOut } from '@/lib/auth-client';
import { cn } from '@/lib/design-tokens';
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
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <div className="text-center space-y-[var(--space-400)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-border-focus)] mx-auto"></div>
          <Text tone="secondary">Loading...</Text>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]" data-admin-page>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-[var(--color-black-alpha-14)]" 
            onClick={() => setSidebarOpen(false)} 
          />
        </div>
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-[var(--color-bg-surface)] border-r border-[var(--color-border)]",
        "transform transition-transform duration-[var(--duration-300)] ease-[var(--easing-ease-in-out)] lg:hidden",
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex h-16 items-center justify-between px-[var(--space-400)]">
            <Heading variant="headingSm" tone="brand">Lunaxcode CMS</Heading>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 space-y-[var(--space-100)] px-[var(--space-200)] py-[var(--space-400)]">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center rounded-[var(--radius-md)] px-[var(--space-200)] py-[var(--space-200)]",
                    "text-sm font-medium transition-colors",
                    isActive 
                      ? 'bg-[var(--color-bg-fill-brand)] text-[var(--color-text-brand-on-bg-fill)]'
                      : 'text-[var(--color-text)] hover:bg-[var(--color-bg-surface-hover)]'
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className={cn(
                    "mr-3 h-5 w-5",
                    isActive ? 'text-[var(--color-icon-inverse)]' : 'text-[var(--color-icon)]'
                  )} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-[var(--color-bg-surface)] border-r border-[var(--color-border)] shadow-lg">
          <div className="flex h-16 items-center px-[var(--space-400)]">
            <Heading variant="headingSm" tone="brand">Lunaxcode CMS</Heading>
          </div>
          <nav className="flex-1 space-y-[var(--space-100)] px-[var(--space-200)] py-[var(--space-400)]">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center rounded-[var(--radius-md)] px-[var(--space-200)] py-[var(--space-200)]",
                    "text-sm font-medium transition-colors",
                    isActive 
                      ? 'bg-[var(--color-bg-fill-brand)] text-[var(--color-text-brand-on-bg-fill)]'
                      : 'text-[var(--color-text)] hover:bg-[var(--color-bg-surface-hover)]'
                  )}
                >
                  <Icon className={cn(
                    "mr-3 h-5 w-5",
                    isActive ? 'text-[var(--color-icon-inverse)]' : 'text-[var(--color-icon)]'
                  )} />
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
        <div className="sticky top-0 z-10 bg-[var(--color-bg-surface)] shadow-sm border-b border-[var(--color-border)]">
          <div className="flex h-16 items-center justify-between px-[var(--space-400)] sm:px-[var(--space-600)] lg:px-[var(--space-800)]">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-[var(--space-400)]">
              <ThemeToggle />
              
              <div className="flex items-center space-x-[var(--space-300)]">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-[var(--color-bg-fill-brand)] text-[var(--color-text-brand-on-bg-fill)]">
                    {session.user.name ? session.user.name.charAt(0).toUpperCase() : session.user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="hidden sm:block">
                  <Text variant="bodySm" weight="medium">
                    {session.user.name || 'Admin User'}
                  </Text>
                  <Text variant="caption" tone="secondary">
                    {session.user.email}
                  </Text>
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
        <main className="p-[var(--space-400)] sm:p-[var(--space-600)] lg:p-[var(--space-800)]">
          {children}
        </main>
      </div>
    </div>
  );
}