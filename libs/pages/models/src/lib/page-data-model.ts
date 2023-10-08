import { AboutPage } from './about-page';
import { GlobalPage } from './global-page';
import { HomePage } from './home-page';
import { SpeakerPage } from './speaker-page';

export type PageEntity = GlobalPage | HomePage | AboutPage | SpeakerPage;

export type PageArray = PageEntity[];
