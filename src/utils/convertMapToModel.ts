import type { SearchResult, Thumbnail } from "../api/youtubeApi";

import { formatRelativeTime } from "./formatRelativeTime";

export type VideoModel = {
  id: string;
  title: string;
  channelTitle: string;
  src: string;
  description: string;
  publishedAt: string;
  thumbnails?: Thumbnail;
};

export const convertMapToModel = (data: SearchResult[]): VideoModel[] => {
  return data.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    src: `https://www.youtube.com/embed/${item.id.videoId}`,
    channelTitle: item.snippet.channelTitle,
    description: item.snippet.description,
    publishedAt: formatRelativeTime(item.snippet.publishedAt),
    thumbnails: item.snippet.thumbnails.medium,
  }));
};
