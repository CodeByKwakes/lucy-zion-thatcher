export interface Testimonial {
  id: string;
  status: Status;
  date_created: Date;
  name: null;
  quote: string;
  page: Page;
}

export enum Status {
  Draft = 'draft',
  Published = 'published'
}

export enum Page {
  Home = 'home',
  Speaker = 'speaker'
}
