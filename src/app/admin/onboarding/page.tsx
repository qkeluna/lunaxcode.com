"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  OnboardingSubmission, 
  OnboardingSubmissionFilters,
  OnboardingSubmissionListResponse,
  ServiceType,
  SubmissionStatus,
  SubmissionPriority 
} from '@/types/onboarding';
import { Search, Filter, Plus, Eye, Edit, Trash2 } from 'lucide-react';

// Status badge component
const StatusBadge = ({ status }: { status: SubmissionStatus }) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
    </span>
  );
};

// Priority badge component
const PriorityBadge = ({ priority }: { priority: SubmissionPriority }) => {
  const colors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-blue-100 text-blue-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800',
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority || 'medium']}`}>
      {(priority || 'medium').charAt(0).toUpperCase() + (priority || 'medium').slice(1)}
    </span>
  );
};

export default function OnboardingDashboard() {
  const [submissions, setSubmissions] = useState<OnboardingSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  
  const [filters, setFilters] = useState<OnboardingSubmissionFilters>({
    search: '',
    serviceType: undefined,
    status: undefined,
    priority: undefined,
    assignedTo: undefined,
    dateFrom: undefined,
    dateTo: undefined,
  });

  const [showFilters, setShowFilters] = useState(false);

  // Fetch submissions
  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', pagination.page.toString());
      queryParams.append('limit', pagination.limit.toString());
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });

      const response = await fetch(`/api/cms/onboarding?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }

      const result: { success: boolean; data: OnboardingSubmissionListResponse } = await response.json();
      
      if (result.success) {
        setSubmissions(result.data.submissions);
        setPagination({
          page: result.data.page,
          limit: result.data.limit,
          total: result.data.total,
          totalPages: result.data.totalPages
        });
      } else {
        throw new Error('Failed to load submissions');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchSubmissions();
  }, [pagination.page, pagination.limit]);

  // Search and filter handler
  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchSubmissions();
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      search: '',
      serviceType: undefined,
      status: undefined,
      priority: undefined,
      assignedTo: undefined,
      dateFrom: undefined,
      dateTo: undefined,
    });
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchSubmissions();
  };

  // Format date
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Onboarding Submissions</h1>
        <p className="text-gray-600 mt-2">Manage and track client project requests</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by project name, company, or email..."
                value={filters.search || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="pl-10"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSearch} className="px-4">
              Search
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="px-4"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" onClick={resetFilters} className="px-4">
              Clear
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t">
            <div>
              <label htmlFor="service-type-filter" className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
              <Select value={filters.serviceType || ''} onValueChange={(value) => setFilters(prev => ({ ...prev, serviceType: value as ServiceType || undefined }))}>
                <SelectTrigger id="service-type-filter">
                  <SelectValue placeholder="All Services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Services</SelectItem>
                  <SelectItem value="landing_page">Landing Page</SelectItem>
                  <SelectItem value="web_app">Web App</SelectItem>
                  <SelectItem value="mobile_app">Mobile App</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <Select value={filters.status || ''} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value as SubmissionStatus || undefined }))}>
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="priority-filter" className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <Select value={filters.priority || ''} onValueChange={(value) => setFilters(prev => ({ ...prev, priority: value as SubmissionPriority || undefined }))}>
                <SelectTrigger id="priority-filter">
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="date-from-filter" className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
              <Input
                id="date-from-filter"
                type="date"
                value={filters.dateFrom || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
              />
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Table Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {pagination.total} Submissions
              </h2>
              <p className="text-sm text-gray-600">
                Page {pagination.page} of {pagination.totalPages}
              </p>
            </div>
            <Button className="px-4">
              <Plus className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-12 text-center">
            <div className="text-gray-500">Loading submissions...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-12 text-center">
            <div className="text-red-500 mb-2">Error: {error}</div>
            <Button onClick={fetchSubmissions} variant="outline">
              Try Again
            </Button>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {submission.projectName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {submission.companyName} • {submission.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 capitalize">
                        {submission.serviceType?.replace('_', ' ')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={submission.status || 'pending'} />
                    </td>
                    <td className="px-6 py-4">
                      <PriorityBadge priority={submission.priority || 'medium'} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(submission.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && submissions.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-gray-500 mb-2">No submissions found</div>
            <p className="text-sm text-gray-400">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                {pagination.total} results
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page <= 1}
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}