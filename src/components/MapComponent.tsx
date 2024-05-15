import React, {useState, useEffect} from 'react';
import {Vehicle} from "../api/Vehicle.ts";
import {LatLngExpression} from "leaflet";
import ChangeView from "./ChangeView.tsx";
import {Circle, MapContainer, TileLayer, Tooltip} from "react-leaflet";
import './style/MapComponent.css'
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
    onRowClick: (itemId: number) => void;
    itemId: number;
}

const MapComponent: React.FC<MapComponentProps> = ({itemId, onRowClick}) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [vehicle, setVehicle] = useState<Vehicle>({latitude: 0, longitude: 0, id: 0})
    const [, setSocket] = useState<WebSocket | null>(null);
    const [central, setCentral] = useState<LatLngExpression>({lat: 0, lng: 0});
    useEffect(() => {
        const newSocket = new WebSocket(`ws://localhost:8080/websocket/${itemId}`);
        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setVehicles(data.vehicles);
            const centralVehicle = data.central;
            setVehicle(vehicle)
            const lat = centralVehicle ? centralVehicle.latitude : 47.4;
            const lng = centralVehicle ? centralVehicle.longitude : 19;
            setCentral({lat, lng})
            setVehicle(centralVehicle);
        };
        newSocket.onopen = () => {
            console.log('WebSocket connected');
            setSocket(newSocket);
        };

        return () => {
            newSocket.close();
        };
    }, [itemId]);

    return (
        <div>
            <MapContainer className="map-container" center={central} zoom={13} zoomControl={false}
                          style={{height: '400px', width: '400px'}}
                          dragging={false} doubleClickZoom={false}>
                <ChangeView center={central}/>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Circle
                    center={central}
                    pathOptions={{fillColor: 'blue', color: 'blue'}}
                    radius={200}>
                </Circle>
                <Circle
                    center={central}
                    pathOptions={{fillColor: 'blue', color: 'blue'}}
                    radius={3}>
                    <Tooltip>My id is: {vehicle.id}<br/> My message is: {vehicle.message}</Tooltip>
                </Circle>
                {vehicles.map((marker: Vehicle) =>
                    <Circle
                        eventHandlers={{click: ()=> onRowClick(marker.id)}}
                        center={[marker.latitude, marker.longitude]}
                        pathOptions={{fillColor: 'red', color: 'red'}}
                        radius={3}>
                        <Tooltip>My id is: {marker.id}<br/> My message is: {marker.message}</Tooltip>
                    </Circle>
                )}
            </MapContainer>
        </div>
    );

};

export default MapComponent;
