import { useCallback, useEffect } from 'react';
import { setFilterOptions } from '../redux/tickets/ticketsSlice'
import { useDispatch } from 'react-redux';
import useLoadJson from '../services/load-json';

function useGetFilterOptions() {  
  const dispatch = useDispatch();
  const fetchFilterOptions = useLoadJson('./filter-options.json');

  const getFilterOptions = useCallback(async () => {
    dispatch(setFilterOptions(await fetchFilterOptions()));
  }, [dispatch, fetchFilterOptions]);

  useEffect(() => {
    getFilterOptions();
  }, [getFilterOptions]);
}

const filterOptionsHooks = {
  useGetFilterOptions
}

export default filterOptionsHooks;