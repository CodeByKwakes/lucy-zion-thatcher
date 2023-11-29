import { createDirectus, rest, readItems, createItem } from '@directus/sdk';

export const DIRECTUS_URL = 'http://localhost:8055';
export const DIRECTUS_IMAGE_PATH = `${DIRECTUS_URL}/assets/`;

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
