// VehicleList.tsx
import React, {useState, useEffect} from 'react';
import {Vehicle} from '../api/Vehicle.ts';
import './style.css'

interface VehicleListProps {
    onRowClick: (itemId: number) => void;
    selectedItemId: number|null;
}

const VehicleList: React.FC<VehicleListProps> = ({onRowClick, selectedItemId}) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    useEffect(() => {
        const loadData = () => fetch('http://localhost:8080/vehicles')
            .then(response => response.json())
            .then(data => setVehicles(data.vehicles))
            .catch(error => {
                setVehicles([]);
                console.error('Error fetching data:', error);
            });
        loadData();
        const myInterval = setInterval(loadData, 5000);
        return () => {
            clearInterval(myInterval);
        };
    }, []);
    const emptyList = vehicles.length === 0;
    return (
        <div className="table-container">
            {!emptyList ?
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>latitude</th>
                        <th>longitude</th>
                    </tr>
                    </thead>
                    <tbody>
                    {vehicles.map(item => (
                        <tr key={item.id} onClick={() => onRowClick(item.id)} style={{cursor: 'pointer'}} className={selectedItemId==item.id?"selected":""}>
                            <td>{item.id}</td>
                            <td>{item.latitude}</td>
                            <td>{item.longitude}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                : <div>No data</div>}
        </div>
    );
};

export default VehicleList;
