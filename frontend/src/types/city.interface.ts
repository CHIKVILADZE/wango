export interface ParkingArea {
  id: string;
  name: string;
}

export interface City {
  id: string;
  name: string;
  parkingAreas: ParkingArea[];
}
