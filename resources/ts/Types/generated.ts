export type AdminNavigation = {
  label: string;
  route: string;
  childs?: Array<AdminNavigation>;
  parents?: AdminNavigation;
};
export type CategoryData = {
  id: number;
  name: string;
  color: string;
  slug?: string;
  description?: string;
  category_image: string;
  category_thumb?: string;
  posts?: Array<PostData>;
};
export type EarnCategory = {
  id: number;
  name: string;
  color: string;
  description?: string;
  category_image?: string;
  earn?: Array<EarnData>;
};
export type EarnData = {
  id: number;
  title: string;
  content?: string;
  image?: string;
  thumb?: string;
  link?: string;
  featured?: FeaturedEarn;
  image_name?: string;
  earn_category_id?: number;
  main_features?: string;
  earnCategory?: EarnCategory;
};
export type FeaturedEarn = '1' | '2';
export type FormData<T extends object> = {
  label: string;
  name: string;
  type: FormType;
  options?: Array<T>;
};
export type FormType =
  | 'textfield'
  | 'textarea'
  | 'select'
  | 'file'
  | 'checkbox'
  | 'md'
  | 'switch'
  | 'tags';
export type LibraryCategory = {
  id: number;
  name: string;
  directory: string;
  media: Array<LibraryData>;
};
export type Conversions = {
  lg_name: string;
  md_name: string;
  sm_name: string;
};
export type LibraryData = {
  id: number;
  file_name: string;
  mime_type?: string;
  conversions: Conversions;
  size?: string;
  width?: number;
  height?: number;
  image_url?: string;
  imageable_id?: number;
  library_category_id?: number;
  imageable_type?: string;
  imageable?: unknown;
  libraryCategory?: LibraryCategory;
};
export type MenuData = {
  id: number;
  label: string;
  position: string;
  items?: Array<MenuItems>;
};
export type MenuItems = {
  id?: number;
  label?: string;
  route?: string;
  icon?: string;
  parent_id?: number;
  menu_id?: number;
  childs?: Array<MenuItems>;
  menu?: Array<MenuData>;
};
export type PageMeta = {
  id: 'form-meta';
  label: string;
  route?: string;
  meta_desc: string;
  meta_image?: string;
  tw_image?: string;
  og_image?: string;
  parent_id?: number;
  page_type?: string;
  page_name?: string;
  childs?: Array<PageMeta>;
  parents?: Array<PageMeta>;
};
export type PostCell = 'TITLE' | 'CATEGORY' | 'STATUS' | 'EDIT' | 'DELETE';
export type PostData = {
  id: number;
  title: string;
  slug?: string;
  introduction?: string;
  content?: string;
  featured_image?: string;
  thumb?: string;
  status?: PostStatus;
  category_id?: number;
  created_at?: string;
  updated_at?: string;
  image_name?: string;
  excerpt?: string;
  category?: CategoryData;
  tags?: Array<TagsData>;
};
export type PostStatus = 'DRAFT' | 'PREVIEW' | 'PUBLISHED' | 'ARCHIVED';
export type TagsData = {
  id: number;
  name: string;
  posts?: Array<PostData>;
};
export type SiteData<T extends object> = {
  data_name: string;
  data_values: T;
};

export type HeroData = {
  id: string | number;
  title: string;
  description: string;
};

export type FeaturesData = {
  id: string | number;
  name: string;
  image: string;
  description: string;
  link: string;
};
