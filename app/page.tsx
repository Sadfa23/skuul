import Image from "next/image";
import Navbar from "./(components)/navbar";
import Footer from "@/components/footer";
import CTASections from "@/components/CTASections";
import Header from "@/components/header";
import HeroSection from "@/components/hero";
import StatsSection from "@/components/statsSection";
import TopCategories from "@/components/topCategories";
import TopCourses from "@/components/topCourses";
import TopInstructors from "@/components/topInstructors";
import Testimonials from "@/components/testimonials";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <StatsSection />
      <TopCategories />
      <TopCourses />
      <TopInstructors />
      <Testimonials />
      <CTASections />
      <Footer />
    </div>
  );
}
