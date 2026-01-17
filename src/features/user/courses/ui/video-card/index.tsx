import Image from "next/image";
import { CourseVideoItem } from "@/entities/user/courses/model/types";
import { getYoutubeThumb } from "../../lib/helpers";

interface Props {
  video: CourseVideoItem;
  onOpen: (video: CourseVideoItem) => void;
}

export const VideoCard = ({ video, onOpen }: Props) => {
  const thumb = getYoutubeThumb(video.url);

  return (
    <div onClick={() => onOpen(video)} className="bg-white p-5 min-w-87.5">
      <Image src={thumb ?? ""} alt={video.title} width={320} height={200} />

      <h3 className="mt-3 text-base md:text-xl">{video.title}</h3>
    </div>
  );
};
