import axios, { type AxiosResponse } from "axios";

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";

export type SearchParams = {
  q: string;
  maxResults?: number;
  order?: "date" | "rating" | "relevance" | "title" | "viewCount";
};

export type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export type SearchResult = {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default?: Thumbnail;
      medium?: Thumbnail;
      high?: Thumbnail;
    };
    channelTitle: string;
    liveBroadcastContent: string;
  };
};

export type SearchListResponse = {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: SearchResult[];
};

export const youtubeClient = axios.create({
  baseURL: YOUTUBE_API_URL,
  headers: {
    Accept: "application/json",
  },
  params: {
    part: "snippet",
    type: "video",
    key: import.meta.env.VITE_API_KEY,
  },
});



export const youtubeApi = {
  searchVideos: (
    params: SearchParams,
  ): Promise<AxiosResponse<SearchListResponse>> =>
    youtubeClient.get<SearchListResponse>("/search", { params }),
};
