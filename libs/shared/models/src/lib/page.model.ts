import { AboutPage } from './about-page.model';
import { GlobalPage } from './global-page.model';
import { HomePage } from './home-page.model';
import { SpeakerPage } from './speaker-page.model';

export type PageEntity = GlobalPage | HomePage | AboutPage | SpeakerPage;

export type PageArray = PageEntity[];
