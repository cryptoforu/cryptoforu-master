import type { CategoryData, TagsData } from '@/Types/generated';
type StatusProps = 'DRAFT' | 'PUBLISHED' | 'PREVIEW' | 'ARCHIVED';
export interface PostsTable {
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
}

export interface CategoryTable extends CategoryData {
  endpoints: {
    delete: string;
  };
}
