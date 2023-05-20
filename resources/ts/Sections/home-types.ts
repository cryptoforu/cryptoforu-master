export type Hero = {
  title: string;
  description: string;
};

export type Features = {
  name: string;
  link: string;
  image: string;
  description: string;
};

export type SocialLinks = {
  name: string;
  href: string;
  image: string;
};

export interface IHomeData {
  data: {
    hero: Hero;
    features: Array<Features>;
    social_links: Array<SocialLinks>;
  };
}
