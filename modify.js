const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function randTimeChange(minutes) {
  const randomFactor = Math.random() > 0.5 ? 1.10 : 0.90;
  let newTime = Math.round(minutes * randomFactor);

  if(newTime > 1440) {
    newTime -= 180;
  }
  
  return newTime;
}

function formatTime(minutes) {
  if(minutes < 0) {    
    minutes = 1440 - Math.abs(minutes);
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

// Завантаження JSON-файлу
fs.readFile('tickets.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const flights = JSON.parse(data);
  // Редагування полів
  console.log(flights.length);
  const filtered = flights.filter((flight) => {
    const arrivalTimeParts = flight.Arrival_Time.match(/^(\d{1,2}:\d{2}) \d{2} [a-zA-Z]{3}$/);
    const durationParts = flight.Duration.match(/(\d+)h (\d+)m/);
    return !!arrivalTimeParts && !!durationParts
  }
    );

  filtered.forEach((flight) => {
    const durationParts = flight.Duration.match(/(\d+)h (\d+)m/);
    const arrivalTimeParts = flight.Arrival_Time.match(/^(\d{1,2}:\d{2}) \d{2} [a-zA-Z]{3}$/);
    if (durationParts && arrivalTimeParts) {
      const hours = parseInt(durationParts[1], 10);
      const minutes = parseInt(durationParts[2] || '0', 10);
      const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      flight.Duration = formattedDuration;

      const formattedArrivalTime = arrivalTimeParts[1];
      flight.Arrival_Time = formattedArrivalTime;

      delete flight.Total_Stops;
      delete flight.Additional_Info;
      delete flight.Total_Stops;
      delete flight.Date_of_Journey;

      flight.Airline = flight.Airline.toLowerCase().replace(/\s+/g, '-');
    }
  });

  const editedFlights = flights.map((flight) => {
    const editedFlight = {};
    Object.keys(flight).forEach((key) => {
      const editedKey = key.toLowerCase();
      editedFlight[editedKey] = flight[key];
      editedFlight.id = uuidv4();
    });
    return editedFlight;
  });

  const result = editedFlights.filter((flight) => {
    const shouldSkip = flight.airline === 'multiple-carriers' 
    || flight.airline === 'vistara' 
    || flight.airline === 'goair'
    || flight.airline === 'spicejet'
    || flight.airline === 'jet-airways-business'
    || flight.airline === 'multiple-carriers-premium-economy';

    return !shouldSkip
  });
  
  const uniqueAirlines = {};

  result.forEach((flight) => {
    uniqueAirlines[flight.airline] = (uniqueAirlines[flight.airline] || 0) + 1;
    const depTimeParts = flight.dep_time.split(':').map((part) => parseInt(part, 10));
    const arrivalTimeParts = flight.arrival_time.split(':').map((part) => parseInt(part, 10));
    
    const depTimeInMinutes = depTimeParts[0] * 60 + depTimeParts[1];
    const arrivalTimeInMinutes = arrivalTimeParts[0] * 60 + arrivalTimeParts[1];

    flight.dep_time = depTimeInMinutes;
    flight.arrival_time = arrivalTimeInMinutes;
  });

  result.forEach((flight) => {
    // Розділяємо рядок на окремі стрічки за комами і видаляємо зайві пробіли
    flight.route = flight.route[0].split(',').map((item) => item.trim());
    flight.return_flight_dep_time = randTimeChange(flight.dep_time);
    flight.return_flight_arrival_time = randTimeChange(flight.arrival_time);
    flight.return_flight_duration = formatTime(flight.return_flight_arrival_time - flight.return_flight_dep_time);
  });

  console.log('result ', uniqueAirlines);

  console.log(result.length);
  // Збереження JSON-файлу
  fs.writeFile('file.json', JSON.stringify(result, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Файл успішно збережено.');
  });
});