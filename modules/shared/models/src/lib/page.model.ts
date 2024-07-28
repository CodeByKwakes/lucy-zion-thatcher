import { AboutPage } from './about-page.model';
import { ContactPage } from './contact-page.model';
import { GlobalPage } from './global-page.model';
import { HomePage } from './home-page.model';
import { SpeakerPage } from './speaker-page.model';

export type PageTypeOptions =
  | GlobalPage
  | HomePage
  | AboutPage
  | SpeakerPage
  | ContactPage;

export type PageArray = PageTypeOptions[];
