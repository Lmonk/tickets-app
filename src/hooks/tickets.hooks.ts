import { useCallback, useEffect } from 'react';
import { setTickets } from '../redux/tickets/ticketsSlice'
import { useDispatch } from 'react-redux';
import useLoadJson from '../services/load-json';

function useGetTickets() {  
  const dispatch = useDispatch();
  const fetchTickets = useLoadJson('./tickets.json');

  const getTickets = useCallback(async () => {
    dispatch(setTickets(await fetchTickets()));
  }, [dispatch, fetchTickets]);

  useEffect(() => {
    getTickets();
  }, [getTickets]);
}

const ticketsHooks = {
  useGetTickets
}

export default ticketsHooks;