export interface SessionDTO {
  token?: string,
  account?: string,
  method?: string,
  createdAt?: string,
  updtedAt?: string,
  authenticate: (username: string, password: string) => any
}

export interface PageDTO {
  _id?: string;
  group?: string;
  author?: string;
  order?: number;
  name?: string;
  link?: string;
  markdown?: string;
  icon?: string;
  domain?: string;
  createdAt?: Date,
  updatedAt?: Date,
}

export interface PostDTO {
  _id: string;
  group?: string;
  author?: string;
  header?: string;
  markdown?: string;
  read?: number;
  domain?: string;
  publish?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MarkdownDocument {
  header: string | undefined,
  markdown: string | undefined,
}

export interface MarkdownDocumentLabels {
  header: string,
  markdown: string,
}