import { AboutPage } from './about-page';
import { HomePage } from './home-page';
import { SpeakerPage } from './speaker-page';

export type PageEntity = HomePage | AboutPage | SpeakerPage;

export type PageArray = PageEntity[];
