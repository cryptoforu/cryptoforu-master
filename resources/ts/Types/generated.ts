export type AdminNavigation = {
  label: string;
  route: string;
  childs?: Array<AdminNavigation>;
  parents?: AdminNavigation;
};

export type CategoryData = {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  category_image?: string;
  category_thumb?: string;
  headline?: string;
  posts?: Array<PostData>;
};
export type ColorScheme =
  | 'emerald'
  | 'teal'
  | 'slate'
  | 'cyan'
  | 'danger'
  | 'green';
export type CryptoCategories = {
  id: string | null;
  name: string | null;
  market_cap: number | null;
  market_cap_change_24h: number | null;
  top_3_coins: Array<any> | null;
  volume_24h: number | null;
};
export type CryptoCoin = {
  id: string;
  name: string;
  image: string;
  current_price: number | null;
  market_cap: number | null;
  market_cap_rank: number | null;
  total_volume: number | null;
  high_24h: number | null;
  low_24h: number | null;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
  price_change_percentage_1h_in_currency: number | null;
  price_change_percentage_24h_in_currency: number | null;
  price_change_percentage_7d_in_currency: number | null;
  symbol: string;
  color: number | null;
};
export type EarnCategory = {
  id: number;
  name: string;
  description?: string;
  category_image?: string;
  earn: Array<EarnData>;
};
export type EarnData = {
  id: number;
  title: string;
  content?: string;
  image?: string;
  thumb?: string;
  link: string;
  featured?: FeaturedEarn;
  status?: EarnStatus;
  image_name?: string;
  earn_category_id?: number;
  main_features?: string;
  earnCategory?: EarnCategory;
};
export type EarnStatus = 'DRAFT' | 'FEATURED' | 'PUBLISHED';
export type FeaturedEarn = '1' | '2';
export type FormData<T> = {
  id: string;
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
  [x: string]: string;
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
  imageable?: any;
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
  id: string;
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
  headline?: string;
  reading_time?: string;
  category_name?: string;
  category?: CategoryData;
  tags?: Array<TagsData>;
};
export type PostStatus =
  | 'DRAFT'
  | 'PREVIEW'
  | 'PUBLISHED'
  | 'ARCHIVED'
  | 'FEATURED';

export type TagsData = {
  id: number;
  name: string;
  posts?: Array<PostData>;
};
