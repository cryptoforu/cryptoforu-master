import type { InputProps } from '@chakra-ui/react';
import type {
  FormData,
  MenuItems,
  PageMeta,
  MenuData,
  EarnCategory,
} from './Types/generated';

export type SettingsForms<T = object> = T & {
  [key: string]: {
    initialValues: MenuItems | PageMeta;
    form_schema: {
      [key: string]: FormData<[]>;
    };
    form_url: string;
    maxLength?: number;
  };
};

type DateTime = string;

export type Nullable<T> = T | null;

export interface User {
  id: number;
  name: string;
  email: string;
  profile_photo_path: Nullable<string>;
  profile_photo_url: string;
  two_factor_enabled: boolean;
  email_verified_at: Nullable<DateTime>;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface Auth {
  user: Nullable<User>;
}

export interface Flash {
  success?: string;
  warning?: string;
}

export type InertiaSharedProps<T = object> = T & {
  auth: Auth;
  flash: Flash;
  errorBags: unknown;
  errors?: undefined;
  ziggy: unknown;
  admin_sidebar: unknown;
  form?: unknown;
};

export interface Session {
  id: number;
  ip_address: string;
  is_current_device: boolean;
  agent: {
    is_desktop: boolean;
    platform: string;
    browser: string;
  };
  last_active: DateTime;
}

export interface ApiToken {
  id: number;
  name: string;
  abilities: string[];
  last_used_ago: Nullable<DateTime>;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface JetstreamTeamPermissions {
  canAddTeamMembers: boolean;
  canDeleteTeam: boolean;
  canRemoveTeamMembers: boolean;
  canUpdateTeam: boolean;
}

export interface Role {
  key: string;
  name: string;
  permissions: string[];
  description: string;
}

export interface TeamInvitation {
  id: number;
  team_id: number;
  email: string;
  role: Nullable<string>;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface AppHeadProps {
  title: string;
  description?: string;
  url?: string;
  image?: Nullable<string>;
}

export type SelectOptions = {
  id: number | string;
  label: string;
  page_name: string;
};

export interface Settings {
  menus: MenuData[];
  pages: {
    admin: PageMeta[];
    front: PageMeta[];
  };
  select: {
    admin: SelectOptions[];
    front: SelectOptions[];
    label?: string;
  };
}

export interface EditMenuProps extends InputProps {
  defaultValue?: string;
  url?: string;
  index: number | string;
}

export interface EarnPageProps {
  earn_data: EarnCategory[];
}

export type SelectProps = {
  select: [
    {
      id: string;
      label: string;
    }
  ];
};
