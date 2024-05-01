export interface ITicket {
  id: string;
  price: number;
  route: string[];
  duration: string;
  dep_time: number;
  arrival_time: number;
  airline: string;
  return_flight_dep_time: number;
  return_flight_arrival_time: number;
  return_flight_duration: string;
}