"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "@/lib/auth-client";
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { LunaxcodeAppSidebar } from '@/components/admin/LunaxcodeAppSidebar';
import { LunaxcodeSiteHeader } from '@/components/admin/LunaxcodeSiteHeader';
import { LunaxcodeSiteFooter } from '@/components/admin/LunaxcodeSiteFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Star, Loader2, AlertCircle, Trash2, Package } from 'lucide-react';

interface AddOnService {
  id: string;
  name: string;
  price: string;
  description: string;
  unit?: string;
  category: string;
  icon?: string;
  popular: boolean;
  displayOrder: number;
  isActive: boolean;
}

const initialAddOnData: Omit<AddOnService, 'createdAt' | 'updatedAt'> = {
  id: '',
  name: '',
  price: '',
  description: '',
  unit: '',
  category: 'general',
  icon: '',
  popular: false,
  displayOrder: 0,
  isActive: true,
};

const categoryOptions = [
  { value: 'general', label: 'General' },
  { value: 'seo', label: 'SEO' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'integration', label: 'Integration' },
];

const iconOptions = [
  { value: 'FileText', label: 'FileText' },
  { value: 'Bot', label: 'Bot' },
  { value: 'Settings', label: 'Settings' },
  { value: 'Search', label: 'Search' },
  { value: 'ShoppingCart', label: 'ShoppingCart' },
  { value: 'Plug', label: 'Plug' },
  { value: 'Package', label: 'Package' },
  { value: 'Zap', label: 'Zap' },
  { value: 'Globe', label: 'Globe' },
  { value: 'Code', label: 'Code' },
];

export default function AddOnsManagement() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [addons, setAddons] = useState<AddOnService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAddon, setEditingAddon] = useState<AddOnService | null>(null);
  const [formData, setFormData] = useState(initialAddOnData);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/admin');
    }
  }, [session, isPending, router]);

  useEffect(() => {
    fetchAddons();
  }, []);

  const fetchAddons = async () => {
    try {
      const response = await fetch('/api/cms/addons');
      if (!response.ok) throw new Error('Failed to fetch add-on services');
      
      const result = await response.json();
      setAddons(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch add-on services');
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

      const method = editingAddon ? 'PUT' : 'POST';
      const response = await fetch('/api/cms/addons', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This ensures cookies are sent with the request
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save add-on service');
      }

      setSuccess(editingAddon ? 'Add-on service updated successfully!' : 'Add-on service created successfully!');
      setDialogOpen(false);
      setEditingAddon(null);
      setFormData(initialAddOnData);
      fetchAddons();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save add-on service');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (addon: AddOnService) => {
    setEditingAddon(addon);
    setFormData(addon);
    setDialogOpen(true);
  };

  const handleDelete = async (addonId: string) => {
    if (!confirm('Are you sure you want to delete this add-on service?')) return;

    try {
      if (!session) throw new Error('No authentication token');

      const response = await fetch(`/api/cms/addons?id=${addonId}`, {
        method: 'DELETE',
        credentials: 'include', // This ensures cookies are sent with the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete add-on service');
      }

      setSuccess('Add-on service deleted successfully!');
      fetchAddons();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete add-on service');
    }
  };

  // Define columns for the advanced data table
  const columns: ColumnDef<AddOnService>[] = [
    createSortableColumn('name', 'Name'),
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.getValue('category')}
        </Badge>
      ),
    },
    createSortableColumn('price', 'Price'),
    {
      accessorKey: 'unit',
      header: 'Unit',
      cell: ({ row }) => (
        <span className="text-sm text-gray-500">
          {row.getValue('unit') || 'N/A'}
        </span>
      ),
    },
    {
      accessorKey: 'popular',
      header: 'Popular',
      cell: ({ row }) => (
        row.getValue('popular') ? (
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
        ) : (
          <span className="text-gray-400">-</span>
        )
      ),
    },
    createSortableColumn('displayOrder', 'Order'),
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.getValue('isActive') ? 'default' : 'secondary'}>
          {row.getValue('isActive') ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(row.original)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(row.original.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
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
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Add-On Services</h1>
              <p className="text-muted-foreground">
                Manage your service add-ons and packages
              </p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setEditingAddon(null);
                  setFormData(initialAddOnData);
                }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Add-On Service
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingAddon ? 'Edit Add-On Service' : 'Create New Add-On Service'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingAddon ? 'Update the add-on service details below.' : 'Fill in the details for the new add-on service.'}
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="id">ID</Label>
                      <Input
                        id="id"
                        value={formData.id}
                        onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
                        placeholder="unique_service_id"
                        required
                        disabled={!!editingAddon}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Service Name"
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
                        placeholder="₱9,999"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unit</Label>
                      <Input
                        id="unit"
                        value={formData.unit}
                        onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                        placeholder="per page, per month, one-time"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of the service"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="icon">Icon</Label>
                      <Select
                        value={formData.icon}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select icon" />
                        </SelectTrigger>
                        <SelectContent>
                          {iconOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, popular: checked as boolean }))}
                      />
                      <Label htmlFor="popular">Mark as Popular</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked as boolean }))}
                      />
                      <Label htmlFor="isActive">Active</Label>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={submitting}>
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {editingAddon ? 'Updating...' : 'Creating...'}
                        </>
                      ) : (
                        editingAddon ? 'Update Add-On' : 'Create Add-On'
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Add-On Services ({addons.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <AdvancedDataTable
                  data={addons}
                  columns={columns}
                  searchKey="name"
                  placeholder="Search add-on services..."
                />
              )}
            </CardContent>
          </Card>
        </div>
        <LunaxcodeSiteFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
