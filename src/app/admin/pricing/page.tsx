"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "@/lib/auth-client";
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { LunaxcodeAppSidebar } from '@/components/admin/LunaxcodeAppSidebar';
import { LunaxcodeSiteHeader } from '@/components/admin/LunaxcodeSiteHeader';
import { LunaxcodeSiteFooter } from '@/components/admin/LunaxcodeSiteFooter';
import { Button } from '@/components/ui/unified-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  UnifiedCard as Card, 
  UnifiedCardHeader as CardHeader, 
  UnifiedCardTitle as CardTitle, 
  UnifiedCardContent as CardContent 
} from '@/components/ui/unified-card';
import { Text, Heading } from '@/components/ui/text';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/design-tokens';
import { AdvancedDataTable, createSortableColumn } from '@/components/ui/advanced-data-table';
import { ColumnDef } from '@tanstack/react-table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Star, Loader2, AlertCircle, Trash2 } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: string;
  popular: boolean;
  timeline: string;
  displayOrder: number;
  isActive: boolean;
}

const initialPlanData: Omit<PricingPlan, 'createdAt' | 'updatedAt'> = {
  id: '',
  name: '',
  price: '',
  period: '',
  description: '',
  features: [],
  buttonText: 'Get Started',
  buttonVariant: 'outline',
  popular: false,
  timeline: '',
  displayOrder: 0,
  isActive: true,
};

export default function PricingManagement() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [formData, setFormData] = useState(initialPlanData);
  const [newFeature, setNewFeature] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/admin');
    }
  }, [session, isPending, router]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/cms/pricing');
      if (!response.ok) throw new Error('Failed to fetch pricing plans');
      
      const result = await response.json();
      setPlans(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch pricing plans');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      if (!session) throw new Error('No authentication token');

      const method = editingPlan ? 'PUT' : 'POST';
      const response = await fetch('/api/cms/pricing', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This ensures cookies are sent with the request
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save pricing plan');
      }

      setSuccess(editingPlan ? 'Pricing plan updated successfully!' : 'Pricing plan created successfully!');
      setDialogOpen(false);
      setEditingPlan(null);
      setFormData(initialPlanData);
      fetchPlans();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save pricing plan');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setFormData(plan);
    setDialogOpen(true);
  };

  const handleDelete = async (planId: string) => {
    if (!confirm('Are you sure you want to delete this pricing plan?')) return;

    try {
      if (!session) throw new Error('No authentication token');

      const response = await fetch(`/api/cms/pricing?id=${planId}`, {
        method: 'DELETE',
        credentials: 'include', // This ensures cookies are sent with the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete pricing plan');
      }

      setSuccess('Pricing plan deleted successfully!');
      fetchPlans();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete pricing plan');
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  // Define columns for the advanced data table
  const columns: ColumnDef<PricingPlan>[] = [
    {
      accessorKey: "name",
      header: "Plan",
      cell: ({ row }) => (
        <div className="flex items-center space-x-[var(--space-200)]">
          <div>
            <Text variant="bodyMd" weight="medium">{row.original.name}</Text>
            <Text variant="bodySm" tone="secondary">{row.original.description}</Text>
          </div>
          {row.original.popular && (
            <Badge variant="secondary" className="ml-2">
              <Star className="mr-1 h-3 w-3" />
              Popular
            </Badge>
          )}
        </div>
      ),
    },
    createSortableColumn<PricingPlan>("price", "Price"),
    createSortableColumn<PricingPlan>("timeline", "Timeline"),
    {
      accessorKey: "features",
      header: "Features",
      cell: ({ row }) => (
        <Text variant="bodySm" tone="secondary">
          {row.original.features.length} feature{row.original.features.length !== 1 ? 's' : ''}
        </Text>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? 'default' : 'secondary'}>
          {row.original.isActive ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    createSortableColumn<PricingPlan>("displayOrder", "Order"),
  ];

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingPlan(null);
    setFormData(initialPlanData);
    setNewFeature('');
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-border-focus)]"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (loading) {
    return (
      <div data-admin-page>
      <SidebarProvider>
        <LunaxcodeAppSidebar />
        <SidebarInset>
          <LunaxcodeSiteHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-h-0">
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          </div>
          <LunaxcodeSiteFooter />
        </SidebarInset>
      </SidebarProvider>
      </div>
    );
  }

  return (
    <div data-admin-page>
    <SidebarProvider>
      <LunaxcodeAppSidebar />
      <SidebarInset>
        <LunaxcodeSiteHeader />
        <div className="flex flex-1 flex-col gap-[var(--space-400)] p-[var(--space-400)] pt-0 min-h-0">
      <div className="space-y-[var(--space-600)]">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <Heading variant="headingLg" as="h1">Pricing Plans</Heading>
            <Text variant="bodyMd" tone="secondary" className="mt-1">
              Manage your service pricing and packages
            </Text>
          </div>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Pricing Plan
              </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPlan ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}
                </DialogTitle>
                <DialogDescription>
                  {editingPlan 
                    ? 'Update the pricing plan details below.' 
                    : 'Create a new pricing plan for your services.'
                  }
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="id">Plan ID</Label>
                    <Input
                      id="id"
                      value={formData.id}
                      onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
                      placeholder="e.g., landing_page"
                      required
                      disabled={editingPlan !== null}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Plan Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Landing Page"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="e.g., ₱8,000"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline</Label>
                    <Input
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                      placeholder="e.g., 48 hours"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the plan"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Features</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a feature"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addFeature();
                        }
                      }}
                    />
                    <Button type="button" onClick={addFeature} variant="outline">
                      Add
                    </Button>
                  </div>
                  
                  {formData.features.length > 0 && (
                    <div className="space-y-2">
                      {formData.features.map((feature, index) => (
                        <div key={`feature-${index}-${feature.slice(0, 10)}`} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded">
                          <span className="text-sm">{feature}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFeature(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="buttonText">Button Text</Label>
                    <Input
                      id="buttonText"
                      value={formData.buttonText}
                      onChange={(e) => setFormData(prev => ({ ...prev, buttonText: e.target.value }))}
                      placeholder="Get Started"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="displayOrder">Display Order</Label>
                    <Input
                      id="displayOrder"
                      type="number"
                      value={formData.displayOrder}
                      onChange={(e) => setFormData(prev => ({ ...prev, displayOrder: parseInt(e.target.value) || 0 }))}
                      min="0"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="popular"
                      checked={formData.popular}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, popular: !!checked }))}
                    />
                    <Label htmlFor="popular">Mark as Popular</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: !!checked }))}
                    />
                    <Label htmlFor="isActive">Active</Label>
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={closeDialog}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {editingPlan ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      <>
                        {editingPlan ? 'Update Plan' : 'Create Plan'}
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Alerts */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="border-[var(--color-border-success)] bg-[var(--color-bg-fill-success)] text-[var(--color-text-success)]">
            <AlertDescription>
              {success}
            </AlertDescription>
          </Alert>
        )}

        {/* Plans Table */}
        <Card variant="elevated">
          <CardHeader>
            <CardTitle as="h2">Pricing Plans ({Array.isArray(plans) ? plans.length : 0})</CardTitle>
          </CardHeader>
          <CardContent>
            <AdvancedDataTable
              columns={columns}
              data={Array.isArray(plans) ? plans.slice().sort((a, b) => a.displayOrder - b.displayOrder) : []}
              searchKey="name"
              searchPlaceholder="Search pricing plans..."
              enableRowSelection={true}
              enableColumnVisibility={true}
              enablePagination={true}
              enableSorting={true}
              enableFiltering={true}
              actions={[
                {
                  label: "Edit Plan",
                  onClick: (plan) => handleEdit(plan),
                  variant: "default",
                },
                {
                  label: "Delete Plan",
                  onClick: (plan) => handleDelete(plan.id),
                  variant: "destructive",
                },
              ]}
            />
          </CardContent>
        </Card>
      </div>
        </div>
        <LunaxcodeSiteFooter />
      </SidebarInset>
    </SidebarProvider>
    </div>
  );
}