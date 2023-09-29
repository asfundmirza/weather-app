export interface weatherType {
  main: Main;
  message: string;
  weather: Weather[];
  name: string;
}

interface Main {
  temp: number;
}

interface Weather {
  icon: string;
  description: string;
}
