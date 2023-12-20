import {
  createDirectus,
  createItem,
  readItems,
  readSingleton,
  rest
} from '@directus/sdk';
import { MessageMeta } from '@lzt/shared/models';
import { environment } from '@lzt/shared/utils';

export const DIRECTUS_URL = environment.directus.url;
export const DIRECTUS_IMAGE_PATH = `${environment.directus.imagePath}/`;

export const directus = createDirectus(DIRECTUS_URL).with(rest());

export const getPage = async (pageId: string) =>
  await directus.request(readSingleton(pageId));

export const getBlogPosts = async () =>
  await directus.request(
    readItems('blog_posts', {
      filter: {
        status: {
          _eq: 'published'
        }
      }
    })
  );

export const createMessage = async (data: MessageMeta) =>
  await directus.request(createItem('messages', data));
