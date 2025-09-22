"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { LunaxcodeAppSidebar } from '@/components/admin/LunaxcodeAppSidebar';
import { LunaxcodeSiteHeader } from '@/components/admin/LunaxcodeSiteHeader';
import { LunaxcodeSiteFooter } from '@/components/admin/LunaxcodeSiteFooter';
import { 
  Users, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  Star,
  CheckSquare
} from 'lucide-react';

interface DashboardStats {
  totalSubmissions: number;
  revenue: string;
  completedProjects: number;
  pendingReviews: number;
  submissionsChange: string;
  revenueChange: string;
  projectsChange: string;
  reviewsChange: string;
}

interface Submission {
  id: string;
  projectName: string;
  companyName: string;
  serviceType: string;
  status: string;
  priority: string;
  createdAt: string;
}

export function LunaxcodeDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSubmissions: 0,
    revenue: "₱0",
    completedProjects: 0,
    pendingReviews: 0,
    submissionsChange: "+0%",
    revenueChange: "+0%",
    projectsChange: "+0%",
    reviewsChange: "+0%"
  });
  const [recentSubmissions, setRecentSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getPriorityVariant = (priority: string) => {
    if (priority === 'urgent') return 'destructive';
    if (priority === 'high') return 'default';
    return 'secondary';
  };

  const getStatusVariant = (status: string) => {
    if (status === 'completed') return 'default';
    if (status === 'in-progress') return 'secondary';
    return 'outline';
  };

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // Mock data for now - replace with actual API calls
        setStats({
          totalSubmissions: 24,
          revenue: "₱180,000",
          completedProjects: 18,
          pendingReviews: 6,
          submissionsChange: "+12%",
          revenueChange: "+23%",
          projectsChange: "+8%",
          reviewsChange: "-4%"
        });

        setRecentSubmissions([
          {
            id: '1',
            projectName: 'E-commerce Website',
            companyName: 'Tech Solutions Inc.',
            serviceType: 'web_app',
            status: 'pending',
            priority: 'high',
            createdAt: '2023-12-20',
          },
          {
            id: '2',
            projectName: 'Mobile Banking App',
            companyName: 'FinTech Startup',
            serviceType: 'mobile_app',
            status: 'in-progress',
            priority: 'urgent',
            createdAt: '2023-12-19',
          },
          {
            id: '3',
            projectName: 'Restaurant Landing Page',
            companyName: 'Foodie Delights',
            serviceType: 'landing_page',
            status: 'completed',
            priority: 'medium',
            createdAt: '2023-12-18',
          },
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const dashboardStats = [
    {
      title: 'Total Submissions',
      value: stats.totalSubmissions.toString(),
      change: stats.submissionsChange,
      trend: 'up' as const,
      icon: Users,
    },
    {
      title: 'Revenue This Month',
      value: stats.revenue,
      change: stats.revenueChange,
      trend: 'up' as const,
      icon: DollarSign,
    },
    {
      title: 'Completed Projects',
      value: stats.completedProjects.toString(),
      change: stats.projectsChange,
      trend: 'up' as const,
      icon: CheckCircle,
    },
    {
      title: 'Pending Reviews',
      value: stats.pendingReviews.toString(),
      change: stats.reviewsChange,
      trend: 'down' as const,
      icon: Clock,
    },
  ];

  const quickActions = [
    { title: 'Add New Pricing Plan', href: '/admin/pricing', icon: DollarSign },
    { title: 'Manage Features', href: '/admin/features', icon: Star },
    { title: 'Update Process Steps', href: '/admin/process', icon: CheckSquare },
    { title: 'View Submissions', href: '/admin/submissions', icon: Users },
  ];

  return (
    <SidebarProvider>
      <LunaxcodeAppSidebar />
      <SidebarInset>
        <LunaxcodeSiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-h-0">
          {loading ? (
            <div className="flex h-96 items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {/* Stats grid */}
              <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
                {dashboardStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={stat.title}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                          <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <p className={`text-xs ${
                            stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stat.change} from last month
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Main content */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Recent Submissions */}
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Submissions</CardTitle>
                    <CardDescription>
                      Latest project submissions that need your attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentSubmissions.map((submission) => (
                        <div
                          key={submission.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="space-y-1">
                            <p className="font-medium">{submission.projectName}</p>
                            <p className="text-sm text-muted-foreground">{submission.companyName}</p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">
                                {submission.serviceType.replace('_', ' ')}
                              </Badge>
                              <Badge
                                variant={getPriorityVariant(submission.priority)}
                              >
                                {submission.priority}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={getStatusVariant(submission.status)}
                            >
                              {submission.status}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">
                              {submission.createdAt}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                      Common tasks and shortcuts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {quickActions.map((action) => {
                        const Icon = action.icon;
                        return (
                          <Button
                            key={action.title}
                            variant="outline"
                            className="h-auto p-4 flex items-start space-x-4 text-left"
                            onClick={() => router.push(action.href)}
                          >
                            <Icon className="h-6 w-6 mt-1 flex-shrink-0" />
                            <span className="text-sm">{action.title}</span>
                          </Button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
        <LunaxcodeSiteFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}