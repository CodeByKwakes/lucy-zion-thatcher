import { createDirectus, rest, readItems } from '@directus/sdk';

const directus = createDirectus('http://localhost:8055').with(rest());

export default directus;

export const getPage = async (pageId: string) =>
  await directus.request(readItems(pageId));
