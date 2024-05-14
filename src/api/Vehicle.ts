export interface Vehicle {
    id: number;
    latitude: number;
    longitude: number;
    message?: string;
}

export interface VehiclesData {
    central?: Vehicle;
    vehicles: Vehicle[];
}