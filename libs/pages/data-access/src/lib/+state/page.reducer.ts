import { createFeature, createReducer, on } from '@ngrx/store';
import { PageActions } from './page.actions';
import {
  AboutPage,
  HomePage,
  PageDataModel,
  SpeakerPage
} from '@lzt/pages/models';

export const pageFeatureKey = 'page';

export interface State {
  home: Record<string, HomePage>[];
  about: Record<string, AboutPage>[];
  speaker: Record<string, SpeakerPage>[];
  isLoading: boolean;
  error: Error | null;
}

export const initialState: State = {
  home: [],
  about: [],
  speaker: [],
  isLoading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(PageActions.loadPages, (state) => ({ ...state, isLoading: true })),
  on(PageActions.loadPagesSuccess, (state, { home, about, speaker }) => ({
    ...state,
    home,
    about,
    speaker,
    isLoading: false
  })),
  on(PageActions.loadPagesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  }))
);

export const pageFeature = createFeature({
  name: pageFeatureKey,
  reducer
});
