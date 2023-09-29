export interface weatherType {
  main: {
    temp: number;
  };
  message: string;
  weather: Array<{
    icon: string;
    description: string;
  }>;
  name: string;
}
