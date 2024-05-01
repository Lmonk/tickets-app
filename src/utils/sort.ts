import {ITicket} from '../models/tickets';
import {convertTimeToMinutes} from '../utils/time'

export const sortFastest = (tickets: ITicket[]): ITicket[] => {
  const result = [...tickets];

  result.sort((a: ITicket ,b: ITicket) : number => {
    const aDuration = convertTimeToMinutes(a.duration) + convertTimeToMinutes(a.return_flight_duration);
    const bDuration = convertTimeToMinutes(b.duration) + convertTimeToMinutes(b.return_flight_duration);

    if (aDuration < bDuration) {
      return -1;
    }
    if (aDuration > bDuration) {
      return 1;
    }
    return 0;
  })

  return result;
};

export const sortOptimal = (tickets: ITicket[]): ITicket[] => {
  const result = [...tickets];

  result.sort((a: ITicket ,b: ITicket) : number => {
    const aDuration = convertTimeToMinutes(a.duration) + convertTimeToMinutes(a.return_flight_duration);
    const bDuration = convertTimeToMinutes(b.duration) + convertTimeToMinutes(b.return_flight_duration);

    if (aDuration < bDuration) {
      return -1;
    }

    if (aDuration > bDuration) {
      return 1;
    }

    if (a.route.length < b.route.length) {
      return -1;
    }
    if (a.route.length > b.route.length) {
      return 1;
    }

    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }

    return 0;
  })

  return result;
}

export const sortCheapest = (tickets: ITicket[]): ITicket[] => {
  const result = [...tickets];

  result.sort((a: ITicket ,b: ITicket) : number => {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }
    return 0;
  })

  return result;
  
}