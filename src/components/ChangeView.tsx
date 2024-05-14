import {useMap} from "react-leaflet";
import {LatLngExpression} from "leaflet";
import React from "react";

interface ChangeViewProps {
    center: LatLngExpression;
}

const ChangeView: React.FC<ChangeViewProps> = ({ center }) => {
    const map = useMap();
    map.setView(center, 16);
    return null;
}

export default ChangeView;