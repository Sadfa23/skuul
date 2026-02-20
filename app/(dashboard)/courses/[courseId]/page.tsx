// app/courses/[courseId]/page.tsx
'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  ChevronDown,
  ChevronRight,
  Video,
  FileText,
  Image as ImageIcon,
  Trash2,
  Edit2,
  GripVertical,
  Upload,
  X,
  Check,
  Clock,
  Play,
  MoreVertical,
  CheckCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCallback } from 'react';

interface Material {
  id: string;
  type: 'video' | 'pdf' | 'image';
  title: string;
  url: string;
  duration?: string;
  size?: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  materials: Material[];
  isPublished: boolean;
}

interface Module {
  id: string;
  title: string;
  courseId:string
  description: string;
  lessons: Lesson[];
  isExpanded: boolean;
}

interface MediaUploadState {
  file: File | null;
  preview: string | null;
  secure_url: string | null;
  publicId: string | null;
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.courseId as string;

  const [activeTab, setActiveTab] = useState('curriculum');
  const [course, setCourse] = useState(null)
  const [modules, setModules] = useState<Module[]>([]);

  const [isAddingModule, setIsAddingModule] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(false)

  // File upload stuff
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  useEffect(() => {
    if (!courseId) return;
    console.log(courseId)
    const fetchCourse = async () => {
      try {
        const {data} = await axios.get(`/api/courses/${courseId}`)
        console.log("Just createdCurse data",data)
        setCourse(data.course)
      } catch (error) {
        console.error('Failed to load course:', error);
      } finally {
        setIsloading(false)
      }
    };
    fetchCourse()
  }, [courseId])
  // Stats data
  const [stats] = useState({
    totalStudents: 1000,
    studentsIncrease: 15,
    rating: 4.5,
    totalReviews: 100,
    completionRate: 85,
    revenue: 100,
    revenueIncrease: 20,
    enrollments: 100,
    enrollmentsIncrease: 12,
  });

  // Add new module
  const handleAddModule = () => {
    if (newModuleTitle.trim()) {
      const newModule: Module = {
        id: Date.now().toString(),
        title: newModuleTitle,
        courseId,
        description: '',
        lessons: [],
        isExpanded: true,
      };
      setModules([...modules, newModule]);
      setNewModuleTitle('');
      setIsAddingModule(false);
    }
  };

  // Add new lesson to module
  const handleAddLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: `${moduleId}-${Date.now()}`,
      title: 'New Lesson',
      description: '',
      duration: '0:00',
      materials: [],
      isPublished: false,
    };

    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? { ...module, lessons: [...module.lessons, newLesson] }
          : module
      )
    );
  };

  // Toggle module expansion
  const toggleModule = (moduleId: string) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? { ...module, isExpanded: !module.isExpanded }
          : module
      )
    );
  };

  // Delete module
  const handleDeleteModule = (moduleId: string) => {
    if (confirm('Are you sure you want to delete this module?')) {
      setModules(modules.filter((module) => module.id !== moduleId));
    }
  };

  // Delete lesson
  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    if (confirm('Are you sure you want to delete this lesson?')) {
      setModules(
        modules.map((module) =>
          module.id === moduleId
            ? {
                ...module,
                lessons: module.lessons.filter(
                  (lesson) => lesson.id !== lessonId
                ),
              }
            : module
        )
      );
    }
  };

  // Update lesson title
  const handleUpdateLessonTitle = (
    moduleId: string,
    lessonId: string,
    newTitle: string
  ) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? { ...lesson, title: newTitle }
                  : lesson
              ),
            }
          : module
      )
    );
    setEditingLessonId(null);
  };

  // Add material to lesson
  const handleAddMaterial = (
    moduleId: string,
    lessonId: string,
    type: 'video' | 'pdf' | 'image'
  ) => {
    // In real implementation, this would open a file upload dialog
    const newMaterial: Material = {
      id: Date.now().toString(),
      type,
      title: `New ${type}`,
      url: '',
      duration: type === 'video' ? '0:00' : undefined,
      size: type !== 'video' ? '0 MB' : undefined,
    };

    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? {
                      ...lesson,
                      materials: [...lesson.materials, newMaterial],
                    }
                  : lesson
              ),
            }
          : module
      )
    );
  };

  // Delete material
  const handleDeleteMaterial = (
    moduleId: string,
    lessonId: string,
    materialId: string
  ) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? {
                      ...lesson,
                      materials: lesson.materials.filter(
                        (m) => m.id !== materialId
                      ),
                    }
                  : lesson
              ),
            }
          : module
      )
    );
  };

  
  const handlePublish = async() => {
    try {
      console.log(modules)
      const response = await axios.post("/api/modules",{modules} )
      console.log(response)
    } catch (error) {
      console.log("Error uploading the modules and modules",error)
    }
    //const response = await axios.post("/api/modules", modules)
    
  }
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-200 rounded-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              {course?.course_name || "Loading"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Draft</span>
            <Button variant="outline" className="bg-white">
              Save
            </Button>
            <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handlePublish}>
              Publish
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 h-auto mb-6">
            <TabsTrigger
              value="commission"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6"
            >
              Commission
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="customer"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6"
            >
              Customer
            </TabsTrigger>
            <TabsTrigger
              value="curriculum"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6"
            >
              Chapters
            </TabsTrigger>
            <TabsTrigger
              value="promotion"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6"
            >
              Promotion
            </TabsTrigger>
            <TabsTrigger
              value="detail"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6"
            >
              Detail
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Commission Tab */}
          <TabsContent value="commission">
            <Card>
              <CardContent className="pt-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                  {/* Total Students */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">
                      Total Students
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.totalStudents}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-xs text-green-600 font-medium">
                        +{stats.studentsIncrease}%
                      </span>
                      <span className="text-xs text-gray-500">
                        5 star reviews
                      </span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Rating</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.totalReviews}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded">
                        -{stats.studentsIncrease}%
                      </span>
                    </div>
                  </div>

                  {/* Completion Rate */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">
                      Completion Rate
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.completionRate}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-medium rounded">
                        +{stats.studentsIncrease}%
                      </span>
                    </div>
                  </div>

                  {/* Revenue */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Revenue</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.revenue}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-medium rounded">
                        +{stats.revenueIncrease}%
                      </span>
                    </div>
                  </div>

                  {/* Enrollments */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">
                      Enrollments
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.enrollments}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs font-medium rounded">
                        +{stats.enrollmentsIncrease}%
                      </span>
                    </div>
                  </div>

                  {/* Active Students */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">
                      Active Students
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.enrollments}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs font-medium rounded">
                        +{stats.enrollmentsIncrease}%
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600">
                  Commission details and analytics will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {/* Review Item */}
                  {[1, 2, 3].map((review) => (
                    <div
                      key={review}
                      className="border-b border-gray-200 pb-6 last:border-0"
                    >
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900">
                              Chris Walter
                            </span>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className="w-4 h-4 text-yellow-400 fill-current"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm font-medium text-gray-900 mb-2">
                            Course Name: Beginners Guide to Design
                          </p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            I was initially apprehensive, having no prior design
                            experience. But the instructor, John Doe, did an
                            amazing job of breaking down complex concepts into
                            easily digestible modules. The video lectures were
                            engaging, and the real-world examples really helped
                            solidify my understanding.
                          </p>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customer Tab */}
          <TabsContent value="customer">
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600">
                  Customer analytics and details will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Curriculum/Chapters Tab */}
          <TabsContent value="curriculum">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Modules List */}
                  {modules.map((module, moduleIndex) => (
                    <div
                      key={module.id}
                      className="border border-gray-200 rounded-lg bg-white"
                    >
                      {/* Module Header */}
                      <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                        <button className="cursor-move text-gray-400 hover:text-gray-600">
                          <GripVertical className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => toggleModule(module.id)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          {module.isExpanded ? (
                            <ChevronDown className="w-5 h-5" />
                          ) : (
                            <ChevronRight className="w-5 h-5" />
                          )}
                        </button>
                        <div className="flex-1">
                          {editingModuleId === module.id ? (
                            <Input
                              value={module.title}
                              onChange={(e) => {
                                const newModules = [...modules];
                                newModules[moduleIndex].title = e.target.value;
                                setModules(newModules);
                              }}
                              onBlur={() => setEditingModuleId(null)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  setEditingModuleId(null);
                                }
                              }}
                              autoFocus
                              className="font-semibold"
                            />
                          ) : (
                            <h3 className="font-semibold text-gray-900">
                              Module {moduleIndex + 1}: {module.title}
                            </h3>
                          )}
                          <p className="text-sm text-gray-500">
                            {module.lessons.length} lessons
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingModuleId(module.id)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteModule(module.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                          <Button
                            className='bg-green-600 hover:bg-green-700 text-white'
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteModule(module.id)}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                             Confirm Module
                          </Button>
                        </div>
                      </div>

                      {/* Lessons List */}
                      {module.isExpanded && (
                        <div className="p-4 space-y-3">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="border border-gray-200 rounded-lg p-4"
                            >
                              {/* Lesson Header */}
                              <div className="flex items-start gap-3 mb-3">
                                <button className="cursor-move text-gray-400 hover:text-gray-600 mt-1">
                                  <GripVertical className="w-4 h-4" />
                                </button>
                                <Play className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div className="flex-1">
                                  {editingLessonId === lesson.id ? (
                                    <Input
                                      value={lesson.title}
                                      onChange={(e) => {
                                        const newModules = modules.map((m) =>
                                          m.id === module.id
                                            ? {
                                                ...m,
                                                lessons: m.lessons.map((l) =>
                                                  l.id === lesson.id
                                                    ? {
                                                        ...l,
                                                        title: e.target.value,
                                                      }
                                                    : l
                                                ),
                                              }
                                            : m
                                        );
                                        setModules(newModules);
                                      }}
                                      onBlur={() =>
                                        handleUpdateLessonTitle(
                                          module.id,
                                          lesson.id,
                                          lesson.title
                                        )
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          handleUpdateLessonTitle(
                                            module.id,
                                            lesson.id,
                                            lesson.title
                                          );
                                        }
                                      }}
                                      autoFocus
                                      className="font-medium"
                                    />
                                  ) : (
                                    <h4 className="font-medium text-gray-900">
                                      {lesson.title}
                                    </h4>
                                  )}
                                  {lesson.description && (
                                    <p className="text-sm text-gray-500 mt-1">
                                      {lesson.description}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="flex items-center gap-1 text-sm text-gray-500">
                                    <Clock className="w-4 h-4" />
                                    {lesson.duration}
                                  </span>
                                  {lesson.isPublished ? (
                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                                      Published
                                    </span>
                                  ) : (
                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                                      Draft
                                    </span>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      setEditingLessonId(lesson.id)
                                    }
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteLesson(module.id, lesson.id)
                                    }
                                  >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                  </Button>
                                </div>
                              </div>

                              {/* Materials */}
                              {lesson.materials.length > 0 && (
                                <div className="ml-8 space-y-2 mb-3">
                                  {lesson.materials.map((material) => (
                                    <div
                                      key={material.id}
                                      className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                                    >
                                      {material.type === 'video' && (
                                        <Video className="w-4 h-4 text-blue-500" />
                                      )}
                                      {material.type === 'pdf' && (
                                        <FileText className="w-4 h-4 text-red-500" />
                                      )}
                                      {material.type === 'image' && (
                                        <ImageIcon className="w-4 h-4 text-green-500" />
                                      )}
                                      <span className="flex-1 text-sm text-gray-700">
                                        {material.title}
                                      </span>
                                      {material.duration && (
                                        <span className="text-xs text-gray-500">
                                          {material.duration}
                                        </span>
                                      )}
                                      {material.size && (
                                        <span className="text-xs text-gray-500">
                                          {material.size}
                                        </span>
                                      )}
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          handleDeleteMaterial(
                                            module.id,
                                            lesson.id,
                                            material.id
                                          )
                                        }
                                      >
                                        <X className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Add Materials Buttons */}
                              <div className="ml-8 flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleAddMaterial(
                                      module.id,
                                      lesson.id,
                                      'video'
                                    )
                                  }
                                  className="text-xs"
                                >
                                  <Video className="w-3 h-3 mr-1" />
                                  Add Video
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleAddMaterial(
                                      module.id,
                                      lesson.id,
                                      'pdf'
                                    )
                                  }
                                  className="text-xs"
                                >
                                  <FileText className="w-3 h-3 mr-1" />
                                  Add PDF
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleAddMaterial(
                                      module.id,
                                      lesson.id,
                                      'image'
                                    )
                                  }
                                  className="text-xs"
                                >
                                  <ImageIcon className="w-3 h-3 mr-1" />
                                  Add Image
                                </Button>
                              </div>
                            </div>
                          ))}

                          {/* Add Lesson Button */}
                          <Button
                            variant="outline"
                            onClick={() => handleAddLesson(module.id)}
                            className="w-full border-dashed"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Lesson
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add Module Section */}
                  {isAddingModule ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Input
                          value={newModuleTitle}
                          onChange={(e) => setNewModuleTitle(e.target.value)}
                          placeholder="Module title..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleAddModule();
                            }
                            if (e.key === 'Escape') {
                              setIsAddingModule(false);
                              setNewModuleTitle('');
                            }
                          }}
                          autoFocus
                        />
                        <Button onClick={handleAddModule} size="sm">
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setIsAddingModule(false);
                            setNewModuleTitle('');
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingModule(true)}
                      className="w-full border-dashed"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Module
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Promotion Tab */}
          <TabsContent value="promotion">
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600">
                  Promotion settings will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Detail Tab */}
          <TabsContent value="detail">
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600">
                  Course details will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600">
                  Course settings will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}