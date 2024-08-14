import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  description:string|null;
  price: number;
  category: string;
};

export const CourseCardHome = ({
  id,
  title,
  imageUrl,
  description,
  price,
  category
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
        <div className="group hover:shadow-sm transition-all overflow-hidden border rounded-lg p-4 md:p-6 h-full block hover:scale-105 bg-gradient-to-b from-blue-400 to-blue-500">
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
              <Image
                fill
                className="object-cover"
                alt={title}
                src={imageUrl}
              />
            </div>
            <div className="flex flex-col pt-3 md:pt-4">
              <div className="text-xl md:text-xl text-white font-semibold group-hover:text-gray-700 transition line-clamp-2">
                {title}
              </div>
              <p className="text-xs text-muted-foreground text-white">
                {category}
              </p>
              <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                        <p className="text-md md:text-sm font-medium text-yellow-200">
                        {formatPrice(Number(price))}
                        </p>
              </div>  
            </div>
        </div>
    </Link>
  )
}