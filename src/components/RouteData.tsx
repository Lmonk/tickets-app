import React, {useEffect} from "react";
import i18n from 'i18next';
import numeral from 'numeral';
import { useDispatch, useSelector } from "react-redux";
import TicketRoute from './TicketRoute'
import {formatTime} from '../utils/time'

interface IProps {
  route: string[];
  duration: string;
  dep_time: number;
  arrival_time: number;
}

const getTransfers = (route: string[]): string => {
  const transfers = route.slice(1, -1);

  return transfers.join(', ');
}

const getTransfersText = (transferAmount: number): string => {
  if(transferAmount === 0) {
    return i18n.t('transfer.zero_transfer');
  } else if(transferAmount > 1) {
    i18n.t('transfer.transfers', {count: transferAmount});
  }

  return  i18n.t('transfer.transfer', {count: transferAmount});
}

const RouteData = ({ route, duration, dep_time, arrival_time } : IProps ): JSX.Element => {
  const transferAmount = route.length - 2;

  return (
    <div className="route-data">
      <div className="route">
        <TicketRoute route={route}></TicketRoute>
        <div>{formatTime(dep_time)} - {formatTime(arrival_time)}</div>
      </div>
      <div className="duration">
        <div>{i18n.t("duration")}</div>
        <div className="flight-duration">{duration}</div>
      </div>
      <div className="transfers">
        <div>{getTransfersText(transferAmount)}</div>
        <div>{getTransfers(route)}</div>
      </div>
    </div>
  );
};

export default RouteData;
