export interface BlogPost {
  id?: number;
  title: string;
  author?: string;
  tags: string[];
  createdDate?: Date;
  body: string;
  blurb?: string;
  kebabTitle?: string;
}
