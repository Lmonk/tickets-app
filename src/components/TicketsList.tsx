import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ticketsSelector, showAmountSelector, ticketsToShowSelector, addShowAmount } from "../redux/tickets/ticketsSlice";
import ticketsHooks from "../hooks/tickets.hooks";
import TicketCard from "./TicketCard";

const TicketsList = (): JSX.Element => {
  const loadAmout = 5;
  ticketsHooks.useGetTickets();

  const dispatch = useDispatch();
  const tickets = useSelector(ticketsSelector);
  const showAmount = useSelector(showAmountSelector);
  const showTickets = useSelector(ticketsToShowSelector);
  const itemsLeftToLoad =  tickets.length - 1 - showAmount;

  return (
    <div className="tickets-list">
      {showTickets.map((el) => {
        return <TicketCard key={el.id} ticket={el}></TicketCard>;
      })}
      {itemsLeftToLoad >= showAmount && itemsLeftToLoad !== 0
        ? <button className="show-more" onClick={() => dispatch(addShowAmount(loadAmout))}>показати ще {loadAmout} квитків</button>
        : itemsLeftToLoad !== 0
          ? <button className="show-more" onClick={() => dispatch(addShowAmount(tickets.length - 1 - showAmount))}>показати ще {tickets.length - 1 - showAmount} квитків</button>
          : null
      }
    </div>
  );
};

export default TicketsList;
