// ============================================
interface Course {
    id: string;
    title: string;
    price: number;
    modules: number;
    orders: number;
    certificates: number;
    reviews: number;
    addedToShelf: number;
    status: 'free' | 'paid';
  }
  
  interface Commission {
    orderId: string;
    customerName: string;
    type: 'Student' | 'Teacher';
    date: string;
    status: 'Received' | 'Pending';
    amount: number;
  }
  
  interface Review {
    id: string;
    rating: number;
    courseName: string;
    reviewerName: string;
    timeAgo: string;
    content: string;
  }
  
  // ============================================
  // MOCK DATA
  // ============================================
  const mockCourses: Course[] = [
    {
      id: "1",
      title: "Beginner's Guide to Design",
      price: 50.0,
      modules: 13,
      orders: 254,
      certificates: 25,
      reviews: 25,
      addedToShelf: 500,
      status: "free",
    },
    {
      id: "2",
      title: "Advanced React Patterns",
      price: 50.0,
      modules: 13,
      orders: 254,
      certificates: 25,
      reviews: 25,
      addedToShelf: 500,
      status: "free",
    },
    {
      id: "3",
      title: "Data Warehouse - Ultimate Guide",
      price: 50.0,
      modules: 13,
      orders: 254,
      certificates: 25,
      reviews: 25,
      addedToShelf: 500,
      status: "free",
    },
  ];
  
  const mockCommissions: Commission[] = [
    { orderId: "#234641", customerName: "Dianne Russell", type: "Student", date: "25 Jan 2022", status: "Received", amount: 95.0 },
    { orderId: "#234642", customerName: "Bessie Cooper", type: "Teacher", date: "25 Jan 2022", status: "Pending", amount: 95.0 },
    { orderId: "#234643", customerName: "Cameron Williamson", type: "Student", date: "25 Jan 2022", status: "Received", amount: 95.0 },
    { orderId: "#234644", customerName: "Kathryn Murphy", type: "Teacher", date: "25 Jan 2022", status: "Received", amount: 95.0 },
    { orderId: "#234645", customerName: "Theresa Webb", type: "Teacher", date: "25 Jan 2022", status: "Received", amount: 95.0 },
    { orderId: "#234646", customerName: "Guy Hawkins", type: "Student", date: "25 Jan 2022", status: "Received", amount: 95.0 },
    { orderId: "#234647", customerName: "Cody Fisher", type: "Student", date: "25 Jan 2022", status: "Received", amount: 95.0 },
    { orderId: "#234648", customerName: "Savannah Nguyen", type: "Student", date: "25 Jan 2022", status: "Pending", amount: 95.0 },
  ];
  
  const mockReviews: Review[] = [
    {
      id: "1",
      rating: 4,
      courseName: "Beginner's Guide to Design",
      reviewerName: "Chris Walter",
      timeAgo: "3 days ago",
      content: "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into digestible lessons.",
    },
    {
      id: "2",
      rating: 4,
      courseName: "Data Warehouse - The Ultimate Guide",
      reviewerName: "Michel Evans",
      timeAgo: "3 days ago",
      content: "I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into digestible lessons.",
    },
    {
      id: "3",
      rating: 5,
      courseName: "Beginners Guide to Design",
      reviewerName: "Alice Johnson",
      timeAgo: "1 week ago",
      content: "Excellent course! The hands-on projects were especially helpful in solidifying my understanding.",
    },
    {
      id: "4",
      rating: 5,
      courseName: "Advanced React Patterns",
      reviewerName: "Bob Smith",
      timeAgo: "2 weeks ago",
      content: "Great content and very well structured. I learned a lot from this course!",
    },
  ];
  
  const reviewStats = {
    totalReviews: 1000,
    oneStar: 100,
    twoStar: 100,
    threeStar: 100,
    fourStar: 100,
    fiveStar: 100,
    averageRating: 4.0,
  };
  
  import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    if (supabaseUrl && supabaseAnonKey) {
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    }
  }

  return supabaseInstance;
}

export const supabase = getSupabase();

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  created_at: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  type: string;
  created_at: string;
}

export interface Commission {
  id: string;
  order_id: string;
  course_id: string;
  student_id: string;
  amount: number;
  status: string;
  type: string;
  date: string;
  created_at: string;
  students?: Student;
}