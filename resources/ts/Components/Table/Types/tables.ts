import type { CategoryData, TagsData } from '@/Types/generated';

type StatusProps = 'DRAFT' | 'PUBLISHED' | 'PREVIEW' | 'ARCHIVED';

export type PostsProps = {
  category: {
    id: number;
    name: string;
  };
  color: string;
  image_name: string;
  endpoints: {
    status: string;
    edit: string;
    delete: string;
  };
  status: string;
  statusValues: StatusProps[];
  tags: Array<TagsData>;
  title: string;
};

export type PaginationLinks = {
  active: boolean;
  label: string | null;
  url: string | null;
};
export type PaginationMeta = {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export interface PostsTable {
  post_table: {
    data: Array<PostsProps>;
    meta: PaginationMeta;
    links: Array<PaginationLinks>;
  };
}

export interface CategoryTable extends CategoryData {
  endpoints: {
    delete: string;
  };
}
