export function randTimeChange(minutes: number): number {
  const randomFactor = Math.random() > 0.5 ? 1.10 : 0.90;
  let newTime = Math.round(minutes * randomFactor);

  if(newTime > 1440) {
    newTime -= 180;
  }

  return newTime;
}

export function convertTimeToMinutes(time: string): number {
  const [hoursStr, minutesStr] = time.split(':');
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  
  return hours * 60 + minutes;
}

export function formatTime(minutes: number): string {
  if(minutes < 0) {    
    minutes = 1440 - Math.abs(minutes);
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}