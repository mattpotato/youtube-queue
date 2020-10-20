export interface SearchResult {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Item[];
}

export interface Item {
  kind: string;
  etag: string;
  id: ID;
  snippet: Snippet;
}

export interface ID {
  kind: string;
  videoId: string;
}
export interface Snippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: ThumbnailOptions;
  channelTitle: string;
  publishTime: Date;
}

export interface ThumbnailOptions {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
}

export interface Thumbnail {
  url: string;
  height: number;
  width: number;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
