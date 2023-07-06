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

export interface UploadsDTO {
  domain?: string;
  files: File[]; // Add a 'file' property of type 'File' to represent the uploaded file
}

export interface FilesDTO {
  _id?: string;
  group?: string;
  author?: string;
  filepath?: string | null;
  originalFilename?: string | null;
  newFilename?: string | null;
  domain?: string;
  uploadedAt?: Date;
}

export interface ArticleDTO {
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
  publishedAt?: Date;
}

export interface MarkdownDocument {
  header: string | undefined,
  markdown: string | undefined,
}

export interface MarkdownDocumentLabels {
  header: string,
  markdown: string,
}