export interface University {
  id: number;
  name: string;
}

export interface Faculty {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  title: string;
  university: string;
  faculty: string;
  duration: string;
  totalSeats: string;
  rating: number;
  image: string;
  description: string;
  featured?: boolean;
  popular?: boolean;
  admissionStatus: string;
}

export const universities: University[] = [
  { id: 1, name: "ঢাকা বিশ্ববিদ্যালয়" },
  { id: 2, name: "বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয় (বুয়েট)" },
  { id: 3, name: "জাহাঙ্গীরনগর বিশ্ববিদ্যালয়" },
  { id: 4, name: "রাজশাহী বিশ্ববিদ্যালয়" },
  { id: 5, name: "চট্টগ্রাম বিশ্ববিদ্যালয়" },
  { id: 6, name: "খুলনা বিশ্ববিদ্যালয়" },
  { id: 7, name: "বাংলাদেশ কৃষি বিশ্ববিদ্যালয়" },
  { id: 8, name: "জগন্নাথ বিশ্ববিদ্যালয়" },
  { id: 9, name: "নর্থ সাউথ ইউনিভার্সিটি" },
  { id: 10, name: "ব্র্যাক ইউনিভার্সিটি" },
];

export const faculties: Faculty[] = [
  { id: 1, name: "আর্টস এন্ড হিউম্যানিটিজ" },
  { id: 2, name: "বিজনেস স্টাডিজ" },
  { id: 3, name: "সোশ্যাল সায়েন্সেস" },
  { id: 4, name: "সায়েন্স" },
  { id: 5, name: "ইঞ্জিনিয়ারিং" },
  { id: 6, name: "কম্পিউটার সায়েন্স" },
  { id: 7, name: "মেডিসিন" },
  { id: 8, name: "ল" },
];

export const courses: Course[] = [
  {
    id: 1,
    title: "কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং (সিএসই)",
    university: "ঢাকা বিশ্ববিদ্যালয়",
    faculty: "কম্পিউটার সায়েন্স",
    duration: "৪ বছর",
    totalSeats: "১২০",
    rating: 4.9,
    image: "/assets/courses/cs.jpg",
    description: "কম্পিউটার সায়েন্স এন্ড ইঞ্জিনিয়ারিং একটি চারবছর মেয়াদী স্নাতক ডিগ্রি প্রোগ্রাম যেখানে কম্পিউটার সিস্টেম, সফটওয়্যার ডেভেলপমেন্ট, এবং কম্পিউটার নেটওয়ার্কিং সম্পর্কে শিক্ষা দেওয়া হয়।",
    featured: true,
    popular: true,
    admissionStatus: "আবেদন চলছে"
  },
  {
    id: 2,
    title: "ইলেকট্রিক্যাল এন্ড ইলেকট্রনিক ইঞ্জিনিয়ারিং (ইইই)",
    university: "বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয় (বুয়েট)",
    faculty: "ইঞ্জিনিয়ারিং",
    duration: "৪ বছর",
    totalSeats: "১৫০",
    rating: 4.8,
    image: "/assets/courses/ee.jpg",
    description: "ইলেকট্রিক্যাল এন্ড ইলেকট্রনিক ইঞ্জিনিয়ারিং হল একটি চারবছর মেয়াদী স্নাতক ডিগ্রি প্রোগ্রাম যেখানে বিদ্যুৎ সরবরাহ, ইলেকট্রনিক সার্কিট, এবং টেলিকমিউনিকেশন সম্পর্কে শিক্ষা দেওয়া হয়।",
    featured: true,
    popular: true,
    admissionStatus: "আবেদন চলছে"
  },
  {
    id: 3,
    title: "বিজনেস এডমিনিস্ট্রেশন (বিবিএ)",
    university: "নর্থ সাউথ ইউনিভার্সিটি",
    faculty: "বিজনেস স্টাডিজ",
    duration: "৪ বছর",
    totalSeats: "২০০",
    rating: 4.7,
    image: "/assets/courses/bba.jpg",
    description: "বিজনেস এডমিনিস্ট্রেশন স্নাতক প্রোগ্রামে বিজনেস ম্যানেজমেন্ট, মার্কেটিং, ফাইন্যান্স, এবং হিউম্যান রিসোর্স ম্যানেজমেন্ট সম্পর্কে বিস্তারিত শিক্ষা দেওয়া হয়।",
    featured: false,
    popular: true,
    admissionStatus: "আবেদন চলছে"
  },
  {
    id: 4,
    title: "মেডিসিন এন্ড সার্জারি (এমবিবিএস)",
    university: "ঢাকা মেডিকেল কলেজ",
    faculty: "মেডিসিন",
    duration: "৫ বছর",
    totalSeats: "১০০",
    rating: 4.9,
    image: "/assets/courses/mbbs.jpg",
    description: "এমবিবিএস ডিগ্রি প্রোগ্রামে মানব শরীর, রোগ নির্ণয়, ট্রিটমেন্ট এবং স্বাস্থ্য সম্পর্কে বিস্তারিত শিক্ষা দেওয়া হয়। এই ডিগ্রি প্রোগ্রাম সম্পন্ন করার পর ডাক্তার হিসেবে প্র্যাকটিস করা যায়।",
    featured: false,
    popular: false,
    admissionStatus: "আবেদন চলছে"
  },
  {
    id: 5,
    title: "ইংরেজি লিটারেচার",
    university: "জাহাঙ্গীরনগর বিশ্ববিদ্যালয়",
    faculty: "আর্টস এন্ড হিউম্যানিটিজ",
    duration: "৪ বছর",
    totalSeats: "৭০",
    rating: 4.6,
    image: "/assets/courses/english.jpg",
    description: "ইংরেজি লিটারেচার স্নাতক প্রোগ্রামে ইংরেজি সাহিত্য, ভাষা তত্ত্ব, সাহিত্য সমালোচনা, এবং সাংস্কৃতিক অধ্যয়ন সম্পর্কে শিক্ষা দেওয়া হয়।",
    featured: false,
    popular: false,
    admissionStatus: "আবেদন চলছে"
  },
  {
    id: 6,
    title: "ইকোনমিক্স",
    university: "রাজশাহী বিশ্ববিদ্যালয়",
    faculty: "সোশ্যাল সায়েন্সেস",
    duration: "৪ বছর",
    totalSeats: "১২০",
    rating: 4.7,
    image: "/assets/courses/economics.jpg",
    description: "ইকোনমিক্স স্নাতক প্রোগ্রামে অর্থনৈতিক তত্ত্ব, মাইক্রোইকোনমিক্স, ম্যাক্রোইকোনমিক্স, এবং অর্থনৈতিক নীতি সম্পর্কে শিক্ষা দেওয়া হয়।",
    featured: false,
    popular: false,
    admissionStatus: "আবেদন চলছে"
  },
  {
    id: 7,
    title: "ফার্মেসি",
    university: "ঢাকা বিশ্ববিদ্যালয়",
    faculty: "সায়েন্স",
    duration: "৪ বছর",
    totalSeats: "১০০",
    rating: 4.8,
    image: "/assets/courses/pharmacy.jpg",
    description: "ফার্মেসি স্নাতক প্রোগ্রামে ওষুধ তৈরি, ওষুধের প্রভাব, ফার্মাকোলজি, এবং ক্লিনিক্যাল ফার্মেসি সম্পর্কে শিক্ষা দেওয়া হয়।",
    featured: false,
    popular: false,
    admissionStatus: "আবেদন চলছে"
  },
  {
    id: 8,
    title: "আর্কিটেকচার",
    university: "বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয় (বুয়েট)",
    faculty: "ইঞ্জিনিয়ারিং",
    duration: "৫ বছর",
    totalSeats: "৮০",
    rating: 4.9,
    image: "/assets/courses/architecture.jpg",
    description: "আর্কিটেকচার ডিগ্রি প্রোগ্রামে ভবন নকশা, পরিকল্পনা, এবং নির্মাণকৌশল সম্পর্কে শিক্ষা দেওয়া হয়। এই প্রোগ্রাম সম্পন্ন করার পর স্থপতি হিসেবে কাজ করা যায়।",
    featured: false,
    popular: false,
    admissionStatus: "আবেদন চলছে"
  },
]; 