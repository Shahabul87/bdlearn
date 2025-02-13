interface CoursesListProps {
  courses: any[];
}

export const CoursesList = ({ courses }: CoursesListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((enrollment) => (
        <div 
          key={enrollment.courseId}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
        >
          <h3 className="font-semibold text-lg">{enrollment.course.title}</h3>
          {/* Add more course details as needed */}
        </div>
      ))}
    </div>
  );
}; 