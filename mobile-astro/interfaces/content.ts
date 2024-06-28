// src/interfaces/content.ts
export interface Content {
  _id: string;
  title: string;
  body: string;
  author?: string;
  imatge?: string;
  tags?: string[];
}

export interface CreateContent {
  title: string;
  body: string;
  author?: string;
  tags?: string[];
}
