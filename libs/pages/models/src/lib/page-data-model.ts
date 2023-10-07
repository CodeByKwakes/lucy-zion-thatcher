import { AboutPage } from './about-page';
import { HomePage } from './home-page';
import { SpeakerPage } from './speaker-page';

export type PageDataModel = [
  Record<string, HomePage>[],
  Record<string, AboutPage>[],
  Record<string, SpeakerPage>[]
];
