"use client";

import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { cn } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TeacherAnalyticsProps {
  courses: any[];
}

export const TeacherAnalytics = ({ courses }: TeacherAnalyticsProps) => {
  // Get last 6 months
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return d.toLocaleString('default', { month: 'short' });
  }).reverse();

  // Calculate enrollments per month
  const enrollmentData = months.map(month => {
    return courses.reduce((acc, course) => {
      const monthEnrollments = course.enrollments.filter((enrollment: any) => {
        const enrollmentMonth = new Date(enrollment.createdAt)
          .toLocaleString('default', { month: 'short' });
        return enrollmentMonth === month;
      });
      return acc + monthEnrollments.length;
    }, 0);
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: 'New Enrollments',
        data: enrollmentData,
        fill: true,
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1e1e1e',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      intersect: false,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-xl p-6",
        "bg-white/50 dark:bg-gray-800/50",
        "border border-gray-200/50 dark:border-gray-700/50",
        "backdrop-blur-sm"
      )}
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Enrollment Trends
      </h2>

      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>
    </motion.div>
  );
}; 