"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "@/lib/auth-client";
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { LunaxcodeAppSidebar } from '@/components/admin/LunaxcodeAppSidebar';
import { LunaxcodeSiteHeader } from '@/components/admin/LunaxcodeSiteHeader';
import { LunaxcodeSiteFooter } from '@/components/admin/LunaxcodeSiteFooter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdvancedDataTable, createSortableColumn, createBadgeColumn } from '@/components/ui/advanced-data-table';
import { ColumnDef } from '@tanstack/react-table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

interface OnboardingSubmission {
  id: string;
  projectName: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  serviceType: 'landing_page' | 'web_app' | 'mobile_app';
  industry: string;
  projectDescription: string;
  timeline: string;
  budget: string;
  features: string[];
  designPreferences: string;
  contentReady: boolean;
  additionalServices: string[];
  status: 'new' | 'in_review' | 'approved' | 'in_progress' | 'completed' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
}

export default function SubmissionsPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [submissions, setSubmissions] = useState<OnboardingSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<OnboardingSubmission | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/admin');
    }
  }, [session, isPending, router]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockSubmissions: OnboardingSubmission[] = [
        {
          id: '1',
          projectName: 'E-commerce Platform',
          companyName: 'Tech Solutions Inc.',
          contactName: 'John Doe',
          email: 'john@techsolutions.com',
          phone: '+63 912 345 6789',
          serviceType: 'web_app',
          industry: 'E-commerce',
          projectDescription: 'A comprehensive e-commerce platform with payment integration',
          timeline: '4-6 weeks',
          budget: '₱50,000 - ₱100,000',
          features: ['User Authentication', 'Payment Gateway', 'Inventory Management'],
          designPreferences: 'Modern, clean design with blue color scheme',
          contentReady: true,
          additionalServices: ['SEO Optimization', 'Maintenance Package'],
          status: 'new',
          priority: 'high',
          createdAt: '2023-12-20T10:30:00Z',
          updatedAt: '2023-12-20T10:30:00Z',
        },
        {
          id: '2',
          projectName: 'Restaurant Website',
          companyName: 'Foodie Delights',
          contactName: 'Maria Santos',
          email: 'maria@foodiedelights.com',
          phone: '+63 917 123 4567',
          serviceType: 'landing_page',
          industry: 'Food & Beverage',
          projectDescription: 'A simple landing page for our restaurant with menu and contact info',
          timeline: '1-2 weeks',
          budget: '₱15,000 - ₱25,000',
          features: ['Online Menu', 'Contact Form', 'Location Map'],
          designPreferences: 'Warm colors, food photography focused',
          contentReady: false,
          additionalServices: ['Social Media Integration'],
          status: 'in_progress',
          priority: 'medium',
          createdAt: '2023-12-19T14:15:00Z',
          updatedAt: '2023-12-20T09:00:00Z',
        },
        {
          id: '3',
          projectName: 'Mobile Banking App',
          companyName: 'FinTech Startup',
          contactName: 'David Lee',
          email: 'david@fintech.ph',
          phone: '+63 905 987 6543',
          serviceType: 'mobile_app',
          industry: 'Financial Services',
          projectDescription: 'A secure mobile banking application with advanced features',
          timeline: '12-16 weeks',
          budget: '₱200,000+',
          features: ['Biometric Authentication', 'Real-time Transactions', 'Budget Tracking'],
          designPreferences: 'Professional, trustworthy design with green accents',
          contentReady: true,
          additionalServices: ['Security Audit', 'App Store Optimization'],
          status: 'approved',
          priority: 'urgent',
          createdAt: '2023-12-18T16:45:00Z',
          updatedAt: '2023-12-19T11:30:00Z',
        },
      ];
      setSubmissions(mockSubmissions);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const handleViewSubmission = (submission: OnboardingSubmission) => {
    setSelectedSubmission(submission);
    setIsViewModalOpen(true);
  };


  const handleDeleteSubmission = async (submissionId: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      try {
        // Remove from local state for now - replace with API call
        setSubmissions(prev => prev.filter(sub => sub.id !== submissionId));
      } catch (error) {
        console.error('Error deleting submission:', error);
      }
    }
  };

  // Define columns for the advanced data table
  const columns: ColumnDef<OnboardingSubmission>[] = [
    {
      accessorKey: "projectName",
      header: "Project",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.projectName}</div>
          <div className="text-sm text-gray-500">{row.original.companyName}</div>
          <div className="text-xs text-gray-400">{row.original.contactName}</div>
        </div>
      ),
    },
    createBadgeColumn<OnboardingSubmission>(
      "serviceType",
      "Service Type",
      "serviceType",
      {
        landing_page: "outline",
        web_app: "default",
        mobile_app: "secondary",
      }
    ),
    createBadgeColumn<OnboardingSubmission>(
      "status",
      "Status",
      "status",
      {
        new: "default",
        in_review: "secondary",
        approved: "default",
        in_progress: "default",
        completed: "default",
        rejected: "destructive",
      }
    ),
    createBadgeColumn<OnboardingSubmission>(
      "priority",
      "Priority",
      "priority",
      {
        urgent: "destructive",
        high: "default",
        medium: "secondary",
        low: "outline",
      }
    ),
    createSortableColumn<OnboardingSubmission>("timeline", "Timeline"),
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <div className="text-sm">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </div>
      ),
    },
  ];

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <SidebarProvider>
      <LunaxcodeAppSidebar />
      <SidebarInset>
        <LunaxcodeSiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-h-0">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project Submissions</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage client onboarding submissions and project requests
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </div>

          {/* Advanced Data Table */}
          <AdvancedDataTable
            columns={columns}
            data={submissions}
            searchKey="projectName"
            searchPlaceholder="Search by project name, company, contact, or email..."
            enableRowSelection={true}
            enableColumnVisibility={true}
            enablePagination={true}
            enableSorting={true}
            enableFiltering={true}
            actions={[
              {
                label: "View Details",
                onClick: (submission) => handleViewSubmission(submission),
                variant: "default",
              },
              {
                label: "Edit",
                onClick: (submission) => console.log("Edit submission:", submission.id),
                variant: "default",
              },
              {
                label: "Delete",
                onClick: (submission) => handleDeleteSubmission(submission.id),
                variant: "destructive",
              },
            ]}
            onRowClick={(submission) => handleViewSubmission(submission)}
          />

          {/* View Submission Modal */}
          <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Project Details</DialogTitle>
                <DialogDescription>
                  Complete submission information for {selectedSubmission?.projectName}
                </DialogDescription>
              </DialogHeader>
              {selectedSubmission && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Project Information</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>Project Name:</strong> {selectedSubmission.projectName}</div>
                      <div><strong>Company:</strong> {selectedSubmission.companyName}</div>
                      <div><strong>Service Type:</strong> {selectedSubmission.serviceType.replace('_', ' ')}</div>
                      <div><strong>Industry:</strong> {selectedSubmission.industry}</div>
                      <div><strong>Timeline:</strong> {selectedSubmission.timeline}</div>
                      <div><strong>Budget:</strong> {selectedSubmission.budget}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      <div><strong>Contact Name:</strong> {selectedSubmission.contactName}</div>
                      <div><strong>Email:</strong> {selectedSubmission.email}</div>
                      <div><strong>Phone:</strong> {selectedSubmission.phone}</div>
                      <div><strong>Content Ready:</strong> {selectedSubmission.contentReady ? 'Yes' : 'No'}</div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-semibold mb-3">Project Description</h3>
                    <p className="text-sm text-gray-600">{selectedSubmission.projectDescription}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Required Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSubmission.features.map((feature, index) => (
                        <Badge key={index} variant="secondary">{feature}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Additional Services</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSubmission.additionalServices.map((service, index) => (
                        <Badge key={index} variant="outline">{service}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-semibold mb-3">Design Preferences</h3>
                    <p className="text-sm text-gray-600">{selectedSubmission.designPreferences}</p>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
        <LunaxcodeSiteFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}