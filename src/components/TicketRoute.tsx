import React from "react";

interface IProps {
  route: string[];
}

const formRoute = (route: string[]): string => {  
  return `${route[0]} - ${route[route.length - 1]}`;
}

const TicketRoute = ({ route } : IProps ): JSX.Element => {
  return (
    <div className="flight-route">{formRoute(route)}</div>
  );
};

export default TicketRoute;
