import { createDirectus, rest, readItems } from '@directus/sdk';

export const directus = createDirectus('http://localhost:8055').with(rest());

export const getPage = async (pageId: string) =>
  await directus.request(readItems(pageId));
