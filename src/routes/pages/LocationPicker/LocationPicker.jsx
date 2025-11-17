import { useState, useCallback } from "react";
import {
    GoogleMap,
    Marker,
    useJsApiLoader,
    Autocomplete,
} from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "500px",
};

const defaultCenter = {
    lat: 25.2048,
    lng: 55.2708,
};

export default function LocationPicker({ onLocationSelect }) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });

    const [selectedPos, setSelectedPos] = useState(defaultCenter);
    const [map, setMap] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const [mapType, setMapType] = useState("roadmap");

    const onLoadAutocomplete = (auto) => setAutocomplete(auto);

    const onPlaceChanged = () => {
        if (!autocomplete) return;
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        const location = place.geometry.location;
        const pos = { lat: location.lat(), lng: location.lng() };

        setSelectedPos(pos);
        map?.panTo(pos);
        onLocationSelect?.(pos);
    };

    const handleMapClick = useCallback(
        (event) => {
            const pos = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };
            setSelectedPos(pos);
            onLocationSelect?.(pos);
        },
        [onLocationSelect]
    );

    const gotoMyLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            setSelectedPos(pos);
            map?.panTo(pos);
            onLocationSelect?.(pos);
        });
    };

    if (!isLoaded) return <div>Loading map…</div>;

    return (
        <div className="w-full relative space-y-3">

            {/* Search Input */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 w-11/12">
                <div className="shadow-lg p-2 bg-white rounded-xl">
                    <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
                        <input
                            type="text"
                            placeholder="Search for your address…"
                            className="w-full p-3 border rounded-xl focus:outline-none"
                        />
                    </Autocomplete>
                </div>
            </div>

            {/* Buttons (Zoom, My Location, Map Type Toggle) */}
            <div className="absolute top-50 right-3 z-20 flex flex-col space-y-2">

                {/* Zoom In */}
                <button
                    onClick={() => map?.setZoom(map.getZoom() + 1)}
                    className="bg-white shadow p-2 rounded-lg"
                >
                    ➕
                </button>

                {/* Zoom Out */}
                <button
                    onClick={() => map?.setZoom(map.getZoom() - 1)}
                    className="bg-white shadow p-2 rounded-lg"
                >
                    ➖
                </button>

                {/* GPS Location */}
                <button
                    onClick={gotoMyLocation}
                    className="bg-white shadow p-2 rounded-lg"
                >
                    📍
                </button>

                {/* Satellite Toggle */}
                <button
                    onClick={() =>
                        setMapType(mapType === "roadmap" ? "hybrid" : "roadmap")
                    }
                    className="bg-white shadow p-2 rounded-lg"
                >
                    🛰
                </button>
            </div>

            {/* Google Map */}
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={selectedPos}
                zoom={15}
                onLoad={setMap}
                onClick={handleMapClick}
                mapTypeId={mapType}
            >
                <Marker
                    position={selectedPos}
                    draggable={true}
                    onDragEnd={(e) => {
                        const pos = {
                            lat: e.latLng.lat(),
                            lng: e.latLng.lng(),
                        };
                        setSelectedPos(pos);
                        onLocationSelect?.(pos);
                    }}
                />
            </GoogleMap>
        </div>
    );
}