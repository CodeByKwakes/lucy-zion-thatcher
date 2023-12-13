import { createDirectus, rest, readItems, createItem } from '@directus/sdk';
import { environment } from '@lzt/shared/utils';

export const DIRECTUS_URL = environment.directus.url;
export const DIRECTUS_IMAGE_PATH = `${environment.directus.imagePath}/`;

export const directus = createDirectus(DIRECTUS_URL).with(rest());

export const getPage = async (pageId: string) =>
  await directus.request(readItems(pageId));

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

export interface MessageData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const createMessage = async (data: MessageData) =>
  await directus.request(createItem('messages', data));
