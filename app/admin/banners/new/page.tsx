'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, X } from 'lucide-react';
import Link from 'next/link';
import { createBanner } from '@/lib/api/services/bannerService';

export default function NewBannerPage() {
  const router = useRouter();

  const [preview, setPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    imageFile: null as File | null,
    badge: '',
    link: '',
    buttonText: '',
    order: '0',
    isActive: true,
    startDate: '',
    endDate: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.imageFile) newErrors.image = 'Image file is required';

    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.startDate) >= new Date(formData.endDate)
    ) {
      newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append('title', formData?.title);
      fd.append('subtitle', formData?.subtitle);
      fd.append('description', formData?.description);
      fd.append('badge', formData?.badge);
      fd.append('link', formData?.link);
      fd.append('buttonText', formData?.buttonText);
      fd.append('order', formData?.order);
      fd.append('isActive', formData?.isActive ? 'true' : 'false');
      if (formData?.startDate) fd.append('startDate', formData?.startDate);
      if (formData?.endDate) fd.append('endDate', formData?.endDate);
      

      
      if (formData?.imageFile) {
        fd.append('image', formData?.imageFile);
      }

      console.log('fd',fd)
      await createBanner(fd); 

      alert('Banner created successfully!');
      router.push('/admin/banners');
    } catch (error) {
      console.error('Error creating banner:', error);
      alert('Error creating banner.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (confirm('Cancel changes?')) {
      router.push('/admin/banners');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/banners">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>

          <div>
            <h1 className="text-3xl font-bold">Create New Banner</h1>
            <p className="text-muted-foreground mt-1">
              Add a new banner to the homepage carousel
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Title <span className="text-red-500">*</span>
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Coca Cola Deal"
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && <p className="text-red-500 text-sm">{errors?.title}</p>}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Subtitle</label>
                <Input name="subtitle" value={formData.subtitle} onChange={handleChange} />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="flex min-h-[80px] w-full rounded-md border p-2 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Badge</label>
                <Input name="badge" value={formData.badge} onChange={handleChange} />
              </div>
            </CardContent>
          </Card>

          {/* Image Upload ONLY */}
<Card>
  <CardHeader>
    <CardTitle>Upload Image</CardTitle>
  </CardHeader>

  <CardContent className="space-y-4">
    <div>
      <label className="text-sm font-medium mb-2 block">
        Select Image <span className="text-red-500">*</span>
      </label>

      <Input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          const img = new Image();
          img.src = URL.createObjectURL(file);

          img.onload = () => {
            // Always allow image (NO ERROR)
            setFormData((prev) => ({
              ...prev,
              imageFile: file,
            }));
            setPreview(URL.createObjectURL(file));
          };
        }}
      />

      {/* BASE SIZE TEXT (NO ERROR) */}
      <p className="text-gray-500 text-sm mt-1">
        Required Size: <span className="font-semibold">1200 × 400 px</span>
      </p>

      {/* IMAGE PREVIEW */}
      {preview && (
        <img
          src={preview}
          className="mt-3 w-full h-40 object-cover rounded-md border"
        />
      )}
    </div>

    <div>
      <label className="text-sm font-medium mb-2 block">Link URL</label>
      <Input name="link" value={formData.link} onChange={handleChange} />
    </div>

    <div>
      <label className="text-sm font-medium mb-2 block">Button Text</label>
      <Input name="buttonText" value={formData.buttonText} onChange={handleChange} />
    </div>
  </CardContent>
</Card>



          {/* Display Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-2 block">Order</label>
                  <Input name="order" type="number" value={formData.order} onChange={handleChange} />
                </div>

                <div className="flex items-center gap-2 pt-7">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />
                  <label>Active</label>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-2 block">Start Date</label>
                  <Input name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">End Date</label>
                  <Input
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    className={errors.endDate ? 'border-red-500' : ''}
                  />
                  {errors.endDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
                  <X className="h-4 w-4" />
                  Cancel
                </Button>

                <Button type="submit" className="bg-[#006e9d] text-white" disabled={loading}>
                  <Save className="h-4 w-4" />
                  {loading ? 'Creating...' : 'Create Banner'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
