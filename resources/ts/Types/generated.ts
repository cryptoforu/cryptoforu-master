export type Nullable<T> = T | null;
export type AdminNavigation = {
  label: string;
  route: string;
  childs?: Array<AdminNavigation>;
  parents?: AdminNavigation;
};
export type CategoryData = {
  id: number;
  name: string;
  slug: string;
  description: string;
  category_image: string;
  category_thumb?: string;
  color: ColorScheme;
  posts?: Array<PostData>;
};
export type ColorScheme = 'emerald' | 'teal' | 'cyan' | 'blue' | 'red';
export type CryptoCategories = {
  id: Nullable<string>;
  name: Nullable<string>;
  market_cap: Nullable<number>;
  market_cap_change_24h: Nullable<number>;
  top_3_coins: Nullable<string[]>;
  volume_24h: Nullable<number>;
};
export type CryptoCoin = {
  id: string;
  name: string;
  image: string;
  current_price: string;
  market_cap: Nullable<number>;
  market_cap_rank: Nullable<number>;
  total_volume: Nullable<number>;
  high_24h: Nullable<number>;
  low_24h: Nullable<number>;
  price_change_24h: Nullable<number>;
  price_change_percentage_24h: string;
  price_change_percentage_1h_in_currency: Nullable<number>;
  price_change_percentage_24h_in_currency: Nullable<number>;
  price_change_percentage_7d_in_currency: Nullable<number>;
  symbol: string;
  color: string;
  current_color: string;
};
export type EarnCategory = {
  id: number;
  name: string;
  color: ColorScheme;
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
  status?: EarnStatus;
  image_name?: string;
  earn_category_id?: number;
  main_features?: string;
  earnCategory?: EarnCategory;
};
export type EarnStatus = 'DRAFT' | 'FEATURED' | 'PUBLISHED';
export type FeaturedEarn = '1' | '2';
export type FormData<T = object> = T & {
  label: Nullable<string>;
  name: Nullable<string>;
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
  imageable?: Array<object>;
  libraryCategory?: LibraryCategory;
};
export type MenuData = {
  id: number;
  label: string;
  position: Nullable<string>;
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
  id: 'page-meta';
  label: string;
  route?: string;
  meta_desc: string;
  meta_image?: Nullable<string>;
  tw_image?: Nullable<string>;
  og_image?: Nullable<string>;
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
export type ExchangesData = {
  id: string;
  name: string;
  year_established: string;
  url: string;
  image: string;
  trust_score: number;
  trust_rank: number;
  trade_volume_24h_btc: string;
};
