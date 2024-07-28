export interface GlobalPage {
  id: string;
  slug: string;
  title?: string;
  header_image?: string;
  logo: string;
  email: string;
  phone_number: string;
  social_media: SocialMedia[];
}

export interface SocialMedia {
  name: string;
  link: string;
}
