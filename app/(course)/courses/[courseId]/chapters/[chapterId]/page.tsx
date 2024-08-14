import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { File } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";

const ChapterIdPage = async ({
  params
}: {
  params: { courseId: string; chapterId: string }
}) => {
  const user = await currentUser();

  if (!user?.id) {
    return redirect("/");
  }

  const userId = user?.id;

  const {
    chapter,
    course,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  // Function to extract video ID from YouTube URL
  const extractYouTubeID = (url:any) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
  };

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label="You already completed this chapter."
        />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-5xl mx-auto pb-20">
        <h2 className="text-2xl font-semibold mb-2 ml-4 mt-4">
          {chapter.title}
        </h2>
        <div className="p-4">
          {chapter.videoUrl && !isLocked && (
            <iframe
              width="880"
              height="500"
              src={`https://www.youtube.com/embed/${extractYouTubeID(chapter.videoUrl)}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <Separator />
          {/* Additional component content follows... */}
          <div className="text-xl font-semibold mb-2 mt-5 text-blue-500">
            Chapter Learning Outcomes
          </div>
          <Separator />
          <div className="bg-sky-100">
            <Preview value={chapter.learningOutcomes!} />
          </div>
          <Separator />
          <div className="text-xl font-semibold mb-2 mt-5 text-blue-500">
            Chapter Description
          </div>
          <Separator />
          <div className="bg-sky-100">
            <Preview value={chapter.description!} />
          </div>
          <Separator />
          <div className="text-xl font-semibold mb-2 mt-5 text-blue-500">
            Chapter Attachments
          </div>
          <Separator />
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a 
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">
                      {attachment.name}
                    </p>
                  </a>
                ))}
              </div>
            </>
          )}
           <Separator />
           <Separator />
          <div className="text-xl font-semibold mb-2 mt-5 text-blue-500">
            Question & Answers
          </div>
          <Separator />
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
