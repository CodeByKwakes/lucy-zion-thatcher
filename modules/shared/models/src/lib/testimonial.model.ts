export interface Testimonial {
  id: string;
  status: Status;
  date_created: Date;
  name: null;
  quote: string;
}

export enum Status {
  Draft = 'draft',
  Published = 'published'
}
