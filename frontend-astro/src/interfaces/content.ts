export interface Content {
  _id: string;
  title: string;
  body: string;
  author?: string;
  tags?: string[];
}

export interface CreateContent {
  title: string;
  body: string;
  author?: string;
  tags?: string[];
}
