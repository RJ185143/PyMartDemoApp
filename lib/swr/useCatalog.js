import useSWR from 'swr';
import fetcher from './fetcher';
export default function useCatalog(id, query = null, page = null) {
  let url = `/api/catalog?id=${id}`;
  if (query != null) {
    url = `${url}&query=${query}`;
  }
  if (page != null) {
    url = `${url}&page=${page}`;
  }
  console.log(url);
  let { data, error } = useSWR(url, fetcher);
  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}
