const DEFAULT_PAGE_SIZE = 20;
const ROOT_GENRE = 67;

export default () => ({
  accessToken: process.env.ACCESS_TOKEN,
  pageSize: process.env.DEFAULT_PAGE_SIZE || DEFAULT_PAGE_SIZE,
  defaultGenreId: process.env.ROOT_GENRE || ROOT_GENRE,
  listennotesUrl: 'https://www.listennotes.com/best-podcasts/',
});
