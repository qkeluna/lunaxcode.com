"use client";

import { useState } from 'react';
import { useRequireAdmin } from "@/lib/auth-client";
import { useOnboardingSubmissions, useUpdateOnboardingSubmission, type OnboardingSubmission } from "@/lib/collections";
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
import { Plus, Loader2 } from 'lucide-react';

// OnboardingSubmission type is now imported from collections

export default function SubmissionsPage() {
  const { isAdmin, isPending } = useRequireAdmin();
  const [selectedSubmission, setSelectedSubmission] = useState<OnboardingSubmission | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Use TanStack Query to get onboarding submissions
  const { data: submissions = [], error, isLoading } = useOnboardingSubmissions();
  const updateSubmissionMutation = useUpdateOnboardingSubmission();

  const handleViewSubmission = (submission: OnboardingSubmission) => {
    setSelectedSubmission(submission);
    setIsViewModalOpen(true);
  };


  const handleDeleteSubmission = async (submissionId: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      try {
        // For now, just update status to 'rejected' - you can implement actual delete API later
        await updateSubmissionMutation.mutateAsync({
          id: submissionId,
          updates: {
            status: 'rejected' as const,
            updatedAt: new Date(),
          },
        });
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
          <div className="text-xs text-gray-400">{row.original.name}</div>
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

  if (isPending || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm text-gray-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading submissions: {error.message}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
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
                      <div><strong>Contact Name:</strong> {selectedSubmission.name}</div>
                      <div><strong>Email:</strong> {selectedSubmission.email}</div>
                      <div><strong>Phone:</strong> {selectedSubmission.phone || 'Not provided'}</div>
                      <div><strong>Status:</strong> {selectedSubmission.status}</div>
                      <div><strong>Priority:</strong> {selectedSubmission.priority}</div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-semibold mb-3">Project Description</h3>
                    <p className="text-sm text-gray-600">{selectedSubmission.description || 'No description provided'}</p>
                  </div>
                  {selectedSubmission.serviceSpecificData && (
                    <div className="md:col-span-2">
                      <h3 className="font-semibold mb-3">Service-Specific Details</h3>
                      <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
                        {JSON.stringify(selectedSubmission.serviceSpecificData, null, 2)}
                      </pre>
                    </div>
                  )}
                  {selectedSubmission.addOns && selectedSubmission.addOns.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Selected Add-ons</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedSubmission.addOns.map((addon, index) => (
                          <Badge key={index} variant="outline">{addon}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedSubmission.additionalRequirements && (
                    <div className="md:col-span-2">
                      <h3 className="font-semibold mb-3">Additional Requirements</h3>
                      <p className="text-sm text-gray-600">{selectedSubmission.additionalRequirements}</p>
                    </div>
                  )}
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