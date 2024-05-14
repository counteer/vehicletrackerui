// VehicleList.tsx
import React, {useState, useEffect} from 'react';
import {Vehicle} from '../api/Vehicle.ts';


const VehicleList: React.FC = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    useEffect(() => {
        // Fetch data from REST API
        const loadData = () => fetch('http://localhost:8080/vehicles')
            .then(response => response.json())
            .then(data => setVehicles(data.vehicles))
            .catch(error => {
                setVehicles([]);
                console.error('Error fetching data:', error);
            })
        const myInterval = setInterval(loadData, 5000);
        return () => {
            clearInterval(myInterval);
        };
    }, []);
    const emptyList = vehicles.length === 0;
    console.log(vehicles);
    return (
        <div>
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
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.latitude}</td>
                            <td>{item.longitude}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                :<div>No data</div>}
                </div>
                );
            };

export default VehicleList;
