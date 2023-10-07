import { AboutPage } from './about-page';
import { HomePage } from './home-page';
import { SpeakerPage } from './speaker-page';

export type PageArray = (HomePage | AboutPage | SpeakerPage)[];
