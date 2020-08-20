export interface IBlogPost {
  title: string;
  author?: string;
  tags: string[];
  createdDate?: Date;
}

export interface BlogPost extends IBlogPost {
  body: string;
}

export interface BlogPostSummary extends IBlogPost {
  blurb: string;
  kebabTitle: string;
}
