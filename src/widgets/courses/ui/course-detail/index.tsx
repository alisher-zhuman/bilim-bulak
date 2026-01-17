"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Spinner } from "@heroui/react";
import { VideoCard } from "@/features/user/courses/ui/video-card";
import { useGetCourseDetail } from "@/entities/user/courses/model/api/queries";
import { CourseVideoItem } from "@/entities/user/courses/model/types";
import { BackButton } from "@/shared/ui/back-button";
import { ErrorBlock } from "@/shared/ui/error-block";
import { VideoModal } from "../video-modal";

export const CourseDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<CourseVideoItem | null>(null);

  const { courseId } = useParams<{ courseId: string }>();

  const {
    data: course,
    isPending,
    isError,
    refetch,
  } = useGetCourseDetail(courseId);

  const openVideo = (video: CourseVideoItem) => {
    setActiveVideo(video);
    setIsModalOpen(true);
  };

  const toggleModal = (open: boolean) => {
    setIsModalOpen(open);

    if (!open) {
      setActiveVideo(null);
    }
  };

  return (
    <>
      <BackButton />

      {isPending ? (
        <div className="mt-14 flex items-center justify-center">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorBlock refetch={refetch} className="mt-14" />
      ) : (
        <section className="animate-fade-in mt-6">
          <h1 className="font-bold text-2xl md:text-4xl text-center">
            {course?.title}
          </h1>

          <div className="mt-14 flex flex-col justify-center items-center md:flex-row md:flex-wrap lg:flex-nowrap md:items-stretch gap-8 w-full relative before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-indigo-100 before:blur-2xl before:opacity-80">
            {course.videos.map((video) => (
              <VideoCard key={video.id} video={video} onOpen={openVideo} />
            ))}
          </div>

          <VideoModal
            isOpen={isModalOpen}
            onOpenChange={toggleModal}
            video={activeVideo}
          />
        </section>
      )}
    </>
  );
};
