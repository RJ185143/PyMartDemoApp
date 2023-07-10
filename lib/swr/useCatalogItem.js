import useSWR from 'swr';
import fetcher from './fetcher';
export default function useCatalogItem(id, site = null) {
  console.log('here ' + id + ' ' + site);
  if (id) {
    if (site !== null) {
      console.log('here called');
      let { data, error } = useSWR(`/api/catalog/${site}/${id}`, fetcher);
      return {
        data,
        isLoading: !error && !data,
        isError: error
      };
    } else {
      console.log('here called 2');
      let { data, error } = useSWR(`/api/catalog/${id}`, fetcher);
      return {
        data,
        isLoading: !error && !data,
        isError: error
      };
    }
  } else {
    console.log('here called 3');
    return {
      data: null,
      isLoading: false,
      isError: false
    };
  }
}
