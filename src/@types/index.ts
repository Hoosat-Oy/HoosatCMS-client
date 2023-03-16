export interface SessionDTO {
  token?: string,
  account?: string,
  method?: string,
  createdAt?: string,
  updtedAt?: string,
  authenticate: (username: string, password: string) => any
}

export interface PagesDTO {
  _id?: string;
  group?: string;
  author?: string;
  name?: string;
  link?: string;
  markdown?: string;
  icon?: string;
  domain?: string;
  createdAt?: Date,
  updatedAt?: Date,
}