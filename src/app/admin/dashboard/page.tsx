"use client";

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Star, 
  CheckSquare, 
  MessageSquare, 
  Users, 
  TrendingUp,
  Activity,
  Clock
} from 'lucide-react';

interface DashboardStats {
  pricingPlans: number;
  features: number;
  processSteps: number;
  testimonials: number;
  formSubmissions: number;
  activeFeatures: number;
  activePricingPlans: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    pricingPlans: 0,
    features: 0,
    processSteps: 0,
    testimonials: 0,
    formSubmissions: 0,
    activeFeatures: 0,
    activePricingPlans: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('cms_token');
        if (!token) return;

        // Fetch data from different endpoints
        const [pricingRes, featuresRes, processRes] = await Promise.all([
          fetch('/api/cms/pricing'),
          fetch('/api/cms/features'),
          fetch('/api/cms/process'),
        ]);

        const [pricingData, featuresData, processData] = await Promise.all([
          pricingRes.json(),
          featuresRes.json(),
          processRes.json(),
        ]);

        setStats({
          pricingPlans: pricingData.length || 0,
          features: featuresData.length || 0,
          processSteps: processData.length || 0,
          testimonials: 0, // Will be updated when testimonials API is ready
          formSubmissions: 0, // Will be updated when form submissions API is ready
          activeFeatures: featuresData.filter((f: { isActive: boolean }) => f.isActive).length || 0,
          activePricingPlans: pricingData.filter((p: { isActive: boolean }) => p.isActive).length || 0,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsCards = [
    {
      title: 'Active Pricing Plans',
      value: stats.activePricingPlans,
      total: stats.pricingPlans,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900',
    },
    {
      title: 'Features',
      value: stats.activeFeatures,
      total: stats.features,
      icon: Star,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      title: 'Process Steps',
      value: stats.processSteps,
      total: stats.processSteps,
      icon: CheckSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900',
    },
    {
      title: 'Testimonials',
      value: stats.testimonials,
      total: stats.testimonials,
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900',
    },
    {
      title: 'Form Submissions',
      value: stats.formSubmissions,
      total: stats.formSubmissions,
      icon: Users,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900',
    },
  ];

  const quickActions = [
    { title: 'Add New Pricing Plan', href: '/admin/pricing', icon: DollarSign },
    { title: 'Manage Features', href: '/admin/features', icon: Star },
    { title: 'Update Process Steps', href: '/admin/process', icon: CheckSquare },
    { title: 'View Submissions', href: '/admin/submissions', icon: Users },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Welcome to your Lunaxcode CMS dashboard. Manage your website content from here.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {statsCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {stat.title}
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {loading ? '...' : stat.value}
                        {stat.total !== stat.value && (
                          <span className="text-sm font-normal text-gray-500">
                            /{stat.total}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <a
                      key={action.title}
                      href={action.href}
                      className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Icon className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {action.title}
                      </span>
                    </a>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-3" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Database</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Online
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-3" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">API</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    Operational
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="mr-3 h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Last Updated</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date().toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started */}
        {stats.pricingPlans === 0 && stats.features === 0 && (
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-blue-900 dark:text-blue-100">
                🚀 Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Welcome! It looks like this is your first time using the CMS. Here&apos;s what you can do to get started:
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-3" />
                  <span>Add your pricing plans to showcase your services</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-3" />
                  <span>Configure your features to highlight what makes you unique</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-3" />
                  <span>Set up your process steps to explain your workflow</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}