export interface SpeakerPage {
  id: string;
  slug: string;
  title: string;
  header_image: null;
  content_image: string;
  content_text: string;
  services_caption: string;
  list: List[];
}

export interface List {
  label: string;
  text: string;
}
