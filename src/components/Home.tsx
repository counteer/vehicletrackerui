import React, {useState} from "react";
import VehicleList from "./VehicleList.tsx";
import MapComponent from "./MapComponent.tsx";
import './style.css'

const Home: React.FC = () => {

    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    const handleRowClick = (itemId: number) => {
        setSelectedItemId(itemId);
    };

    return (
        <div>
            <h1>Vehicle Tracker</h1>
            <div className="container">
                <VehicleList onRowClick={handleRowClick} selectedItemId={selectedItemId}/>
                {selectedItemId && <MapComponent itemId={selectedItemId} onRowClick={handleRowClick}/>}
            </div>
        </div>
    );
};

export default Home;
