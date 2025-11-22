import { useState, useCallback } from "react";
import { FaLocationCrosshairs, FaPlus, FaMinus } from "react-icons/fa6";
import { FaSatellite } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
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
    lat: 23.8103,
    lng: 90.4125, // Dhaka default
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

    // Reverse Geocoding Function
    const getAddressFromLatLng = (lat, lng) => {
        const geocoder = new window.google.maps.Geocoder();

        return new Promise((resolve, reject) => {
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status === "OK" && results[0]) {
                    resolve(results[0].formatted_address);
                } else {
                    reject("Address not found");
                }
            });
        });
    };

    // Autocomplete
    const onLoadAutocomplete = (auto) => setAutocomplete(auto);

    const onPlaceChanged = async () => {
        if (!autocomplete) return;

        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        const location = place.geometry.location;
        const pos = {
            lat: location.lat(),
            lng: location.lng(),
        };

        setSelectedPos(pos);
        map?.panTo(pos);

        const address = await getAddressFromLatLng(pos.lat, pos.lng);

        onLocationSelect?.({ ...pos, address });
    };

    // Click on Map
    const handleMapClick = useCallback(
        async (event) => {
            const pos = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };
            setSelectedPos(pos);
            const address = await getAddressFromLatLng(pos.lat, pos.lng);
            onLocationSelect?.({ ...pos, address });
        },
        [onLocationSelect]
    );

    // GPS Button
    const gotoMyLocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            setSelectedPos(pos);
            map?.panTo(pos);
            const address = await getAddressFromLatLng(pos.lat, pos.lng);
            onLocationSelect?.({ ...pos, address });
        });
    };
    if (!isLoaded) return <div>Loading map…</div>;

    return (
        <div className="w-full relative space-y-3">

            {/* Search Input */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 w-11/12">
                <div className="shadow-lg bg-white rounded-xl">
                    <Autocomplete
                        onLoad={onLoadAutocomplete}
                        onPlaceChanged={onPlaceChanged}
                    >
                        <input
                            type="text"
                            placeholder="Search for your address…"
                            className="w-full p-3 border rounded-xl focus:outline-none"
                        />
                    </Autocomplete>
                </div>
            </div>

            {/* Buttons */}
            <div className="absolute top-50 right-3 z-20 flex flex-col space-y-2">
                <button
                    onClick={() => map?.setZoom(map.getZoom() + 1)}
                    className="bg-white shadow p-2 rounded-lg"
                >
                    <FaPlus />
                </button>

                <button
                    onClick={() => map?.setZoom(map.getZoom() - 1)}
                    className="bg-white shadow p-2 rounded-lg"
                >
                    <FaMinus className="font-bold" />
                </button>

                <button
                    onClick={gotoMyLocation}
                    className="bg-white shadow p-2 rounded-lg flex items-center justify-center"
                >
                    <FaLocationCrosshairs />
                </button>

                <button
                    onClick={() =>
                        setMapType(mapType === "roadmap" ? "hybrid" : "roadmap")
                    }
                    className="bg-white shadow p-2 rounded-lg"
                >
                    <FaSatellite />
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
                options={{
                    disableDefaultUI: true,
                    zoomControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    streetViewControl: false,
                    keyboardShortcuts: false,
                    gestureHandling: "greedy",   // ← ম্যাপ ড্র্যাগ করা যাবে
                    scrollwheel: false            // ← স্ক্রল zoom হবে না (ইচ্ছা হলে true)
                }}
            >
                <Marker
                    position={selectedPos}
                    draggable={false}
                    icon={{
                        url: "https://i.postimg.cc/sgdZ7ZLp/location-picker-doodle-icon-vector-48907141.webp",
                        scaledSize: new window.google.maps.Size(40, 40)
                    }}
                />
            </GoogleMap>
        </div>
    );
}