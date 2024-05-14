import React from "react";
import VehicleList from "./VehicleList.tsx";

const Home: React.FC = () => {
    return (
        <div>
            <h1>Registered Vehicles</h1>
            <VehicleList />
        </div>
    );
};

export default Home;
