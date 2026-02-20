// app/createCourse/page.tsx
// app/createCourse/page.tsx
'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, X, Image as ImageIcon, Video, Loader2 } from 'lucide-react';

interface MediaUploadState {
  file: File | null;
  preview: string | null;
  secure_url: string | null;
  publicId: string | null;
}

export default function CreateCoursePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Form state
  const [formData, setFormData] = useState({
    course_name: '',
    price: '',
    language: 'English',
    cc_languages: ['English'],
    level: 'Beginner',
    prerequisites: '',
    description: '',
  });

  const [introVideo, setIntroVideo] = useState<MediaUploadState>({
    file: null,
    preview: null,
    secure_url: null,
    publicId: null,
  });

  const [thumbnail, setThumbnail] = useState<MediaUploadState>({
    file: null,
    preview: null,
    secure_url: null,
    publicId: null,
  });

  const [bannerImage, setBannerImage] = useState<MediaUploadState>({
    file: null,
    preview: null,
    secure_url: null,
    publicId: null,
  });

  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    video?: number;
    thumbnail?: number;
    banner?: number;
  }>({});

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // Handle video upload
  const handleVideoUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (!file.type.startsWith('video/')) {
          setErrors((prev) => ({
            ...prev,
            video: 'Please select a valid video file',
          }));
          return;
        }

        if (file.size > 100 * 1024 * 1024) {
          // 100MB limit
          setErrors((prev) => ({
            ...prev,
            video: 'Video size should be less than 100MB',
          }));
          return;
        }

        // Create preview immediately
        const videoUrl = URL.createObjectURL(file);
        setIntroVideo((prev) => ({
          ...prev,
          file,
          preview: videoUrl,
        }));

        // Upload to Cloudinary
        setIsUploadingVideo(true);
        setUploadProgress((prev) => ({ ...prev, video: 0 }));

        try {
          const uploadFormData = new FormData();
          uploadFormData.append('file', file);

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: uploadFormData,
          });

          if (!response.ok) {
            console.log(response)
            throw new Error('Failed to upload video');
          }

          const data = await response.json();

          // Store the secure_url and public_id
          setIntroVideo((prev) => ({
            ...prev,
            secure_url: data.secure_url,
            publicId: data.public_id,
          }));

          setUploadProgress((prev) => ({ ...prev, video: 100 }));
          setErrors((prev) => ({ ...prev, video: '' }));
        } catch (error) {
          console.error('Error uploading video:', error);
          setErrors((prev) => ({
            ...prev,
            video: 'Failed to upload video. Please try again.',
          }));
          // Clear the preview on error
          setIntroVideo({
            file: null,
            preview: null,
            secure_url: null,
            publicId: null,
          });
        } finally {
          setIsUploadingVideo(false);
        }
      }
    },
    []
  );

  // Handle thumbnail upload
  const handleThumbnailUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          setErrors((prev) => ({
            ...prev,
            thumbnail: 'Please select a valid image file',
          }));
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          // 5MB limit
          setErrors((prev) => ({
            ...prev,
            thumbnail: 'Image size should be less than 5MB',
          }));
          return;
        }

        // Create preview immediately
        const reader = new FileReader();
        reader.onloadend = () => {
          setThumbnail((prev) => ({
            ...prev,
            file,
            preview: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);

        // Upload to Cloudinary
        setIsUploadingThumbnail(true);
        setUploadProgress((prev) => ({ ...prev, thumbnail: 0 }));

        try {
          const uploadFormData = new FormData();
          uploadFormData.append('file', file);

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: uploadFormData,
          });

          if (!response.ok) {
            throw new Error('Failed to upload thumbnail');
          }

          const data = await response.json();
          console.log(data)

          // Store the secure_url and public_id
          setThumbnail((prev) => ({
            ...prev,
            secure_url: data.secure_url,
            publicId: data.public_id,
          }));

          setUploadProgress((prev) => ({ ...prev, thumbnail: 100 }));
          setErrors((prev) => ({ ...prev, thumbnail: '' }));
        } catch (error) {
          console.error('Error uploading thumbnail:', error);
          setErrors((prev) => ({
            ...prev,
            thumbnail: 'Failed to upload thumbnail. Please try again.',
          }));
          // Clear the preview on error
          setThumbnail({
            file: null,
            preview: null,
            secure_url: null,
            publicId: null,
          });
        } finally {
          setIsUploadingThumbnail(false);
        }
      }
    },
    []
  );

  // Handle banner image upload
  const handleBannerImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          setErrors((prev) => ({
            ...prev,
            banner: 'Please select a valid image file',
          }));
          return;
        }

        if (file.size > 5 * 1024 * 1024) {
          // 5MB limit
          setErrors((prev) => ({
            ...prev,
            banner: 'Image size should be less than 5MB',
          }));
          return;
        }

        // Create preview immediately
        const reader = new FileReader();
        reader.onloadend = () => {
          setBannerImage((prev) => ({
            ...prev,
            file,
            preview: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);

        // Upload to Cloudinary
        setIsUploadingBanner(true);
        setUploadProgress((prev) => ({ ...prev, banner: 0 }));

        try {
          const uploadFormData = new FormData();
          uploadFormData.append('file', file);

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: uploadFormData,
          });

          if (!response.ok) {
            throw new Error('Failed to upload banner image');
          }

          const data = await response.json();

          // Store the secure_url and public_id
          setBannerImage((prev) => ({
            ...prev,
            secure_url: data.secure_url,
            publicId: data.public_id,
          }));

          setUploadProgress((prev) => ({ ...prev, banner: 100 }));
          setErrors((prev) => ({ ...prev, banner: '' }));
        } catch (error) {
          console.error('Error uploading banner:', error);
          setErrors((prev) => ({
            ...prev,
            banner: 'Failed to upload banner. Please try again.',
          }));
          // Clear the preview on error
          setBannerImage({
            file: null,
            preview: null,
            secure_url: null,
            publicId: null,
          });
        } finally {
          setIsUploadingBanner(false);
        }
      }
    },
    []
  );

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleVideoDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith('video/')) {
        const event = {
          target: { files: [file] },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        handleVideoUpload(event);
      }
    },
    [handleVideoUpload]
  );

  const handleThumbnailDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith('image/')) {
        const event = {
          target: { files: [file] },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        handleThumbnailUpload(event);
      }
    },
    [handleThumbnailUpload]
  );

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.course_name.trim()) {
      newErrors.course_name = 'Course name is required';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    // Check if uploads are complete
    if (introVideo.file && !introVideo.secure_url) {
      newErrors.video = 'Please wait for video upload to complete';
    }

    if (thumbnail.file && !thumbnail.secure_url) {
      newErrors.thumbnail = 'Please wait for thumbnail upload to complete';
    }

    if (bannerImage.file && !bannerImage.secure_url) {
      newErrors.banner = 'Please wait for banner upload to complete';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle draft save
  const handleSaveDraft = async () => {
    if (!formData.course_name.trim()) {
      alert('Please enter a course name before saving draft');
      return;
    }

    // Check if any uploads are in progress
    if (isUploadingVideo || isUploadingThumbnail || isUploadingBanner) {
      alert('Please wait for uploads to complete');
      return;
    }

    setIsSubmitting(true);
    try {
      const courseData = {
        course_name: formData.course_name,
        description: formData.description,
        prerequistes: formData.prerequisites,
        price: formData.price,
        language: formData.language,
        level: formData.level,
        cc_languages: formData.cc_languages,
        // Include the secure URLs from Cloudinary
        imageUrl: thumbnail.secure_url,
        imageId: thumbnail.publicId,
        banner_image: bannerImage.secure_url,
        intro_video_url: introVideo.secure_url,
        intro_video_id: introVideo.publicId,
        status: 'draft',
      };

      const response = await fetch('/api/courses/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) throw new Error('Failed to save draft');

      const data = await response.json();
      alert('Draft saved successfully!');
      router.push(`/courses/${data.id}`);
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Failed to save draft. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle publish
  const handlePublish = async () => {
    /*
    if (!validateForm()) {
      alert('Please fill in all required fields');
      return;
    }*/

    // Check if any uploads are in progress
    if (isUploadingVideo || isUploadingThumbnail || isUploadingBanner) {
      alert('Please wait for uploads to complete');
      return;
    }

    setIsSubmitting(true);
    try {
      const courseData = {
        course_name: formData.course_name,
        description: formData.description,
        prerequisites: formData.prerequisites,
        price: Number(formData.price),
        level: formData.level,
        // Include the secure URLs from Cloudinary
        image_secure_url: thumbnail.secure_url,   // ← matches API
        video_secure_url: introVideo.secure_url,    
      };

      console.log("This is the data sent to API",courseData)

      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) throw new Error('Failed to publish course');

      const data = await response.json();
      alert('Course published successfully!');
      console.log("Id of the course",data.newCourse.id)
      router.push(`/courses/${data.newCourse.id}`);
    } catch (error) {
      console.error('Error publishing course:', error);
      alert('Failed to publish course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {formData.course_name || 'New Course'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Draft</span>
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isSubmitting || isUploadingVideo || isUploadingThumbnail || isUploadingBanner}
            className="bg-white border-gray-300"
          >
            Save
          </Button>
          <Button
            onClick={handlePublish}
            disabled={isSubmitting || isUploadingVideo || isUploadingThumbnail || isUploadingBanner}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isSubmitting ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value="detail" className="w-full">
        <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto">
         <TabsTrigger
            value="detail"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
          >
            Detail
          </TabsTrigger>
          <TabsTrigger
            value="commission"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
          >
            Commission
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
          >
            Reviews
          </TabsTrigger>
          <TabsTrigger
            value="customer"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
          >
            Customer
          </TabsTrigger>
          <TabsTrigger
            value="chapters"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
          >
            Chapters
          </TabsTrigger>
          <TabsTrigger
            value="promotion"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
          >
            Promotion
          </TabsTrigger>
          
          <TabsTrigger
            value="settings"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="detail" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Main Form */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Course Details
                    </h2>

                    {/* Course Name */}
                    <div className="space-y-2 mb-4">
                      <Label htmlFor="course_name">Course Name</Label>
                      <Input
                        id="course_name"
                        name="course_name"
                        value={formData.course_name}
                        onChange={handleInputChange}
                        placeholder="New Course"
                        className={errors.course_name ? 'border-red-500' : ''}
                      />
                      {errors.course_name && (
                        <p className="text-sm text-red-500">
                          {errors.course_name}
                        </p>
                      )}
                    </div>

                    {/* Upload Intro Video */}
                    <div className="space-y-2 mb-4">
                      <Label>Upload Intro Video</Label>
                      {introVideo.preview ? (
                        <div className="relative border-2 border-gray-200 rounded-lg p-4">
                          <video
                            src={introVideo.preview}
                            controls
                            className="w-full rounded-lg"
                          />
                          {isUploadingVideo && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center rounded-lg">
                              <Loader2 className="w-8 h-8 text-white animate-spin mb-2" />
                              <div className="text-white text-sm">Uploading video...</div>
                              {uploadProgress.video !== undefined && (
                                <div className="mt-2 w-48 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress.video}%` }}
                                  ></div>
                                </div>
                              )}
                            </div>
                          )}
                          {introVideo.secure_url && !isUploadingVideo && (
                            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                              ✓ Uploaded
                            </div>
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white shadow-sm"
                            onClick={() =>
                              setIntroVideo({
                                file: null,
                                preview: null,
                                secure_url: null,
                                publicId: null,
                              })
                            }
                            disabled={isUploadingVideo}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div
                          onDragOver={handleDragOver}
                          onDrop={handleVideoDrop}
                          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer"
                        >
                          <input
                            type="file"
                            id="video-upload"
                            accept="video/*"
                            onChange={handleVideoUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="video-upload"
                            className="cursor-pointer"
                          >
                            <Video className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-600 mb-1">
                              Drag and drop files, or{' '}
                              <span className="text-blue-600 hover:underline">
                                Browse
                              </span>
                            </p>
                            <p className="text-sm text-gray-500">
                              Upload Video in Mov, MP4.
                            </p>
                          </label>
                        </div>
                      )}
                      {errors.video && (
                        <p className="text-sm text-red-500">{errors.video}</p>
                      )}
                    </div>

                    {/* Upload Intro Image (Thumbnail) */}
                    <div className="space-y-2 mb-6">
                      <Label>Upload Intro Image</Label>
                      {thumbnail.preview ? (
                        <div className="relative border-2 border-gray-200 rounded-lg p-4">
                          <img
                            src={thumbnail.preview}
                            alt="Thumbnail preview"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          {isUploadingThumbnail && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center rounded-lg">
                              <Loader2 className="w-8 h-8 text-white animate-spin mb-2" />
                              <div className="text-white text-sm">Uploading...</div>
                            </div>
                          )}
                          {thumbnail.secure_url && !isUploadingThumbnail && (
                            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                              ✓ Uploaded
                            </div>
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white shadow-sm"
                            onClick={() =>
                              setThumbnail({
                                file: null,
                                preview: null,
                                secure_url: null,
                                publicId: null,
                              })
                            }
                            disabled={isUploadingThumbnail}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div
                          onDragOver={handleDragOver}
                          onDrop={handleThumbnailDrop}
                          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer"
                        >
                          <input
                            type="file"
                            id="thumbnail-upload"
                            accept="image/*"
                            onChange={handleThumbnailUpload}
                            className="hidden"
                          />
                          <label
                            htmlFor="thumbnail-upload"
                            className="cursor-pointer"
                          >
                            <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                            <p className="text-gray-600 mb-1">
                              Drag and drop files, or{' '}
                              <span className="text-blue-600 hover:underline">
                                Browse
                              </span>
                            </p>
                            <p className="text-sm text-gray-500">
                              Upload Thumbnail in JPEG, PNG.
                            </p>
                          </label>
                        </div>
                      )}
                      {errors.thumbnail && (
                        <p className="text-sm text-red-500">{errors.thumbnail}</p>
                      )}
                    </div>
                  </div>

                  {/* Description Tabs */}
                  <div className="border border-gray-200 rounded-lg">
                    <div className="border-b border-gray-200">
                      <div className="flex items-center gap-1 px-4">
                        <button
                          type="button"
                          onClick={() => setActiveTab('description')}
                          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === 'description'
                              ? 'border-blue-600 text-blue-600'
                              : 'border-transparent text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          Description
                        </button>
                      
                        <div className="ml-auto">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            Add Section
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Editor Toolbar */}

                    {/* Editor Content Area */}
                    <div className="p-4">
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Start writing your course description..."
                        className="w-full min-h-[300px] resize-none focus:outline-none text-gray-700"
                      />
                      {errors.description && (
                        <p className="text-sm text-red-500 mt-2">
                          {errors.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-6">
                  {/* Course Price */}
                  <div className="space-y-2">
                    <Label htmlFor="price">Course Price</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="$ 199.00"
                      className={errors.price ? 'border-red-500' : ''}
                    />
                    {errors.price && (
                      <p className="text-sm text-red-500">{errors.price}</p>
                    )}
                  </div>


                  {/* Level */}
                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <Select
                      value={formData.level}
                      onValueChange={(value) =>
                        handleSelectChange('level', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="Expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Prerequisites */}
                  <div className="space-y-2">
                    <Label htmlFor="prerequisites">Prerequisites</Label>
                    <textarea
                      id="prerequisites"
                      name="prerequisites"
                      value={formData.prerequisites}
                      onChange={handleInputChange}
                      placeholder="Enter course prerequisites..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs (placeholder for now) */}
        <TabsContent value="commission">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600">Commission details appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600">Reviews appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600">Customer details appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chapters">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600">Chapters appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotion">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600">Promotion details appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600">Settings appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}