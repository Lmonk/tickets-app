import React from 'react';
import TicketsSort from '../components/TicketsSort';
import TicketsFilter from '../components/TicketsFilter';
import TicketsList from '../components/TicketsList';

const TicketsPage = (): JSX.Element => {
  return (
    <div className="page">
      <div className="left-column">
        <TicketsFilter></TicketsFilter>
      </div>
      <div className="right-column">
        <TicketsSort></TicketsSort>
        <TicketsList></TicketsList>
      </div>
    </div>
  );
};

export default TicketsPage;
