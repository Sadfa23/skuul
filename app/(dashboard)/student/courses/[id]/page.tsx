import { prisma } from "@/app/lib/prisma"
import Header from "@/components/header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  Clock,
  FileText,
  Globe,
  GraduationCap,
  Heart,
  Layers,
  MonitorPlay,
  Play,
  Share2,
  ShieldCheck,
  Star,
  Trophy,
  Users,
  Video,
} from "lucide-react"
import Image from "next/image"
import EnrollButton from "../../components/EnrollButton"

export default async function CourseDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params

  const courseDetails = await prisma.course.findUnique({
    where: { id },
    include: {
      tutor: {
        select: {
          first_name: true,
          last_name: true,
          avatar_url: true,
          bio: true,
        },
      },
      modules: {
        include: {
          lessons: true,
        },
      },
      _count: {
        select: { enrolledStudents: true },
      },
    },
  })

  console.log("COURSE DETAILS",courseDetails)

  if (!courseDetails) {
    return (
      <div className="min-h-screen bg-[#0f0f13] flex items-center justify-center">
        <Header />
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Course not found</h1>
          <p className="text-slate-400 mt-2">
            The course you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    )
  }

  const tutorName = `${courseDetails.tutor.first_name ?? ""} ${courseDetails.tutor.last_name ?? ""}`.trim()
  const totalLessons = courseDetails.modules.reduce(
    (acc, mod) => acc + mod.lessons.length,
    0
  )

  const levelColorMap: Record<string, string> = {
    beginner: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    intermediate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    advanced: "bg-red-500/20 text-red-400 border-red-500/30",
  }
  const levelColor =
    levelColorMap[courseDetails.course_level?.toLowerCase() ?? ""] ??
    "bg-violet-500/20 text-violet-400 border-violet-500/30"

  return (
    <div className="min-h-screen bg-[#0d0d12] text-white font-sans">
      <Header />

      {/* Hero / Banner */}
      <section className="relative bg-gradient-to-b from-[#14141e] to-[#0d0d12] border-b border-white/5">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_left,_#6c47ff_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Course Info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500">
              <span>Development</span>
              <span>/</span>
              <span>Web Development</span>
              <span>/</span>
              <span className="text-violet-400">{courseDetails.course_name}</span>
            </nav>

            <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-white">
              {courseDetails.course_name}
            </h1>

            <p className="text-slate-300 text-base leading-relaxed max-w-2xl">
              {courseDetails.description}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30">
                <Trophy className="h-3.5 w-3.5" />
                Bestseller
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                <Star className="h-3.5 w-3.5 fill-current" />
                Highest Rated
              </span>
              {courseDetails.course_level && (
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${levelColor}`}
                >
                  <GraduationCap className="h-3.5 w-3.5" />
                  {courseDetails.course_level}
                </span>
              )}
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-amber-400 font-semibold">4.7</span>
                <span className="underline underline-offset-2 text-slate-500">
                  (455,237 ratings)
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-violet-400" />
                <span>{courseDetails._count.enrolledStudents.toLocaleString()} learners</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-blue-400" />
                <span>{courseDetails.modules.length} modules</span>
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-pink-400" />
                <span>{totalLessons} lessons</span>
              </span>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-3 pt-1">
              <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-violet-500/40">
                {courseDetails.tutor.avatar_url ? (
                  <Image
                    src={courseDetails.tutor.avatar_url}
                    alt={tutorName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-violet-700 flex items-center justify-center text-white font-bold text-sm">
                    {tutorName.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs text-slate-500">Created by</p>
                <p className="text-sm font-semibold text-violet-400 hover:underline cursor-pointer">
                  {tutorName}
                </p>
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                Last updated 11/2025
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" />
                English
              </span>
            </div>
          </div>

          {/* Right: Purchase Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 bg-[#18181f] border border-white/10 shadow-2xl shadow-black/60 overflow-hidden">
              {/* Preview Thumbnail */}
              <div className="relative aspect-video bg-[#0d0d12] overflow-hidden group cursor-pointer">
                {courseDetails.banner_image ? (
                  <Image
                    src={courseDetails.banner_image}
                    alt="Course preview"
                    fill
                    className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-violet-900/40 to-blue-900/40">
                    <MonitorPlay className="h-16 w-16 text-white/20" />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 text-violet-700 fill-violet-700 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-0 right-0 text-center text-xs text-white/80 font-medium">
                  Preview this course
                </div>
              </div>

              <CardContent className="p-5 space-y-4">
                {/* Price */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white">
                      ${courseDetails.price.toFixed(2)}
                    </span>
                    <span className="text-slate-500 line-through text-sm">
                      ${(courseDetails.price * 6.5).toFixed(2)}
                    </span>
                    <span className="text-emerald-400 text-sm font-semibold">85% off</span>
                  </div>
                  <p className="text-amber-400 text-xs flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    2 days left at this price!
                  </p>
                </div>

                {/* CTAs */}
                <div className="space-y-2">
                  <Button className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold h-11 text-sm shadow-lg shadow-violet-900/40 transition-all">
                    Add to cart
                  </Button>
                  <EnrollButton courseId={id}/>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/5 h-11 text-sm"
                  >
                    Enroll Now
                  </Button>
                </div>

                {/* Guarantees */}
                <div className="text-center space-y-1">
                  <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                    30-Day Money-Back Guarantee
                  </p>
                  <p className="text-xs text-slate-500">Full Lifetime Access</p>
                </div>

                <Separator className="bg-white/5" />

                {/* Includes */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    This course includes:
                  </p>
                  <ul className="space-y-1.5 text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <Video className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                      61 hours on-demand video
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                      65 articles &amp; resources
                    </li>
                    <li className="flex items-center gap-2">
                      <MonitorPlay className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                      Access on mobile and TV
                    </li>
                    <li className="flex items-center gap-2">
                      <Trophy className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                      Certificate of completion
                    </li>
                  </ul>
                </div>

                <Separator className="bg-white/5" />

                {/* Action links */}
                <div className="flex justify-center gap-5 text-xs text-slate-400">
                  <button className="flex items-center gap-1 hover:text-white transition-colors">
                    <Share2 className="h-3.5 w-3.5" /> Share
                  </button>
                  <button className="flex items-center gap-1 hover:text-white transition-colors">
                    <Heart className="h-3.5 w-3.5" /> Wishlist
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">

          {/* What you'll learn */}
          <section>
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-violet-400" />
              What you&apos;ll learn
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-5 rounded-xl bg-[#14141e] border border-white/5">
              {[
                "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
                "After the course you will be able to build ANY website you want.",
                "Work as a freelance web developer.",
                "Master backend development with Node.",
                "Learn the latest technologies, including JavaScript, React, Node and even Web3 development.",
                "Build fully-fledged websites and web apps for your startup or business.",
                "Master frontend development with React.",
                "Learn professional developer best practices.",
              ].map((item, i) => (
                <div key={i} className="flex gap-3 text-sm text-slate-300">
                  <div className="mt-0.5 h-4 w-4 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center shrink-0">
                    <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Prerequisites */}
          {courseDetails.prerequisites && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-amber-400" />
                Prerequisites
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed bg-[#14141e] border border-white/5 rounded-xl p-5">
                {courseDetails.prerequisites}
              </p>
            </section>
          )}

          {/* Course Curriculum */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="h-5 w-5 text-blue-400" />
                Course Curriculum
              </h2>
              <span className="text-xs text-slate-500">
                {courseDetails.modules.length} modules · {totalLessons} lessons
              </span>
            </div>

            {courseDetails.modules.length === 0 ? (
              <div className="rounded-xl bg-[#14141e] border border-white/5 p-8 text-center text-slate-500 text-sm">
                Curriculum coming soon.
              </div>
            ) : (
              <div className="space-y-3">
                {courseDetails.modules.map((mod, idx) => (
                  <details
                    key={mod.id}
                    className="group rounded-xl bg-[#14141e] border border-white/5 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none hover:bg-white/3 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-violet-400 w-6 shrink-0">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="font-semibold text-white text-sm">
                          {mod.module_title}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
                        <span>{mod.lessons.length} lessons</span>
                        <span className="group-open:rotate-180 transition-transform text-slate-400">▾</span>
                      </div>
                    </summary>
                    {mod.lessons.length > 0 && (
                      <ul className="border-t border-white/5 divide-y divide-white/5">
                        {mod.lessons.map((lesson) => (
                          <li
                            key={lesson.id}
                            className="flex items-center gap-3 px-5 py-3 text-sm text-slate-400 hover:bg-white/3 transition-colors"
                          >
                            <Play className="h-3.5 w-3.5 text-violet-500 shrink-0" />
                            <span>{lesson.lesson_title}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </details>
                ))}
              </div>
            )}
          </section>

          {/* Instructor */}
          <section>
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <Users className="h-5 w-5 text-pink-400" />
              Your Instructor
            </h2>
            <div className="flex gap-5 p-5 rounded-xl bg-[#14141e] border border-white/5">
              <div className="relative h-20 w-20 rounded-full overflow-hidden ring-2 ring-violet-500/40 shrink-0">
                {courseDetails.tutor.avatar_url ? (
                  <Image
                    src={courseDetails.tutor.avatar_url}
                    alt={tutorName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-violet-700 flex items-center justify-center text-white font-bold text-2xl">
                    {tutorName.charAt(0)}
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-white text-lg">{tutorName}</h3>
                <p className="text-slate-400 text-sm line-clamp-4">
                  {courseDetails.tutor.bio ?? "No bio available."}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right sidebar - sticky on desktop for related topics */}
        <div className="hidden lg:block space-y-6">
          <Card className="bg-[#14141e] border border-white/5">
            <CardHeader className="pb-3">
              <h3 className="text-sm font-semibold text-white">Explore related topics</h3>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {["Web Development", "Node.js", "MongoDB", "JavaScript", "React", "TypeScript"].map(
                (tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-white/5 text-slate-300 hover:bg-violet-500/20 hover:text-violet-300 border border-white/10 cursor-pointer text-xs transition-colors"
                  >
                    {tag}
                  </Badge>
                )
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#14141e] border border-white/5">
            <CardHeader className="pb-3">
              <h3 className="text-sm font-semibold text-white">Course Stats</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: Users, label: "Enrolled Students", value: courseDetails._count.enrolledStudents.toLocaleString(), color: "text-violet-400" },
                { icon: Layers, label: "Modules", value: courseDetails.modules.length, color: "text-blue-400" },
                { icon: BookOpen, label: "Lessons", value: totalLessons, color: "text-pink-400" },
                { icon: GraduationCap, label: "Level", value: courseDetails.course_level ?? "All Levels", color: "text-emerald-400" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Icon className={`h-4 w-4 ${color}`} />
                    {label}
                  </span>
                  <span className="font-semibold text-white">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}