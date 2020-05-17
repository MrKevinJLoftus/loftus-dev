export interface IBlogPost {
  title: string;
  tags: string[];
}

export interface BlogPost extends IBlogPost {
  body: string;
}

export interface BlogPostSummary extends IBlogPost {
  blurb: string;
  kebabTitle: string;
}
