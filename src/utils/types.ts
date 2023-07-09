export type SnippetType = {
  uuid: string;
  title: string;
  language: string;
  sourceCode: string;
  owner: string;
  tags?: string[];
  createdAt?: string;
};

export type searchParamsType = {
  q?: string;
  language?: string;
  page?: number;
  limit?: number;
};
