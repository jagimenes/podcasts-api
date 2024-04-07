import { BestPodcastsResult } from 'src/domain/interfaces/best-podcasts-result.interface';
import { PaginatorProps } from 'src/domain/interfaces/paginator-props.interface';

export const paginatorUtil = (params: PaginatorProps): BestPodcastsResult => {
  const { genre, podcasts, page = 1, pageSize, listennotesUrl } = params;

  const page_size = pageSize;
  const pages = Math.ceil(podcasts.length / page_size);
  const actualPage =
    Number(page) > pages || Number(page) < 0 ? pages : Number(page);
  const paginator = (actualPage - 1) * page_size;
  const itemsFromPage = podcasts.slice(paginator, paginator + page_size);

  return {
    ...genre,
    podcasts: itemsFromPage,
    total: podcasts.length,
    has_next: actualPage < pages,
    has_previous: actualPage > 1,
    page_number: actualPage,
    previous_page_number: actualPage - 1,
    next_page_number: actualPage + 1,
    listennotes_url: listennotesUrl,
  };
};
