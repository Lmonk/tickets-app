import { useCallback, useEffect } from 'react';
import { setSortOptions } from '../redux/tickets/ticketsSlice'
import { useDispatch } from 'react-redux';
import useLoadJson from '../services/load-json';

function useGetSortOptions() {  
  const dispatch = useDispatch();
  const fetchSortOptions = useLoadJson('./sort-options.json');

  const getSortOptions = useCallback(async () => {
    dispatch(setSortOptions(await fetchSortOptions()));
  }, [dispatch, fetchSortOptions]);

  useEffect(() => {
    getSortOptions();
  }, [getSortOptions]);
}

const sortOptionsHooks = {
  useGetSortOptions
}

export default sortOptionsHooks;