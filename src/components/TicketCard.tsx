import React, {useEffect} from "react";
import numeral from 'numeral';
import { useDispatch, useSelector } from "react-redux";
import { ITicket } from '../models/tickets'
import TicketRoute from './TicketRoute'
import RouteData from './RouteData'
import {formatTime} from '../utils/time'

const indigoLogo = require('../assets/images/indigo.png');
const jetAirwaysLogo = require('../assets/images/jet-airways.svg');
const airIndiaLogo = require('../assets/images/air-india.png');
const airAsiaLogo = require('../assets/images/air-asia.jpg');
interface IProps {
  ticket: ITicket
}

const airlinesLogos: { [key: string]: any } = {
  'indigo': indigoLogo,
  'jet-airways': jetAirwaysLogo,
  'air-india': airIndiaLogo,
  'air-asia': airAsiaLogo
};

const TicketCard = ({ ticket } : IProps ): JSX.Element => {
  const reversedRoute = [...ticket.route].reverse();
  const logo = airlinesLogos[ticket.airline];
  
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <div className="price">{numeral(ticket.price).format()}</div>
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="ticket-data">
        <RouteData route={ticket.route} duration={ticket.duration} dep_time={ticket.dep_time} arrival_time={ticket.arrival_time}></RouteData>
        <RouteData route={reversedRoute} duration={ticket.return_flight_duration} dep_time={ticket.return_flight_dep_time} arrival_time={ticket.return_flight_arrival_time}></RouteData>
      </div>
    </div>
  );
};

export default TicketCard;
