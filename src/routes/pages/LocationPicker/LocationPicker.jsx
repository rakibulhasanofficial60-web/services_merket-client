import { useState, useCallback, useEffect } from "react";
import { FaLocationCrosshairs, FaPlus, FaMinus } from "react-icons/fa6";
import { FaSatellite } from "react-icons/fa";
import { GoogleMap, useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import NextBtn from "../../../components/NextBtn/NextBtn";
import Summery from "../../../components/Summery/Summery";
import { useSummary } from "../../../provider/SummaryProvider";
import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import { useNavigate } from "react-router-dom";

const containerStyle = { width: "100%", height: "500px" };
const defaultCenter = { lat: 23.8103, lng: 90.4125 };

export default function LocationPicker() {
    const navigate = useNavigate();
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });

    const { itemSummary, vat, serviceCharge, showInput, setShowInput, address, serviceTitle, setMapLongitude, setMapLatitude, setAddressLocation, getAddresses, setLiveAddress } = useSummary();

    const addresses = getAddresses();
    const [hasAddresses,] = useState(addresses && addresses.length > 0);
    const [showMap, setShowMap] = useState(!hasAddresses);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isNextDisabled, setIsNextDisabled] = useState(true);
    const [mapAddressSelected, setMapAddressSelected] = useState(false);
    const [fromListSelection, setFromListSelection] = useState(false);
    const [selectedPos, setSelectedPos] = useState(defaultCenter);
    const [map, setMap] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null);
    const [mapType, setMapType] = useState("roadmap");

    useEffect(() => {
        if (hasAddresses && !showMap) {
            setIsNextDisabled(true);
        }
        else if (showMap) {
            setIsNextDisabled(true);
            setMapAddressSelected(false);
        }
    }, [hasAddresses, showMap]);

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

    const handleLocation = async (pos) => {
        setSelectedPos(pos);
        map?.panTo(pos);

        await getAddressFromLatLng(pos.lat, pos.lng);
        setMapLatitude(pos.lat);
        setMapLongitude(pos.lng);
    };

    const onLoadAutocomplete = (auto) => setAutocomplete(auto);

    const onPlaceChanged = async () => {
        if (!autocomplete) return;
        const place = autocomplete.getPlace();
        if (!place.geometry) return;
        const pos = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        };
        handleLocation(pos);

        const addressLocation = await getAddressFromLatLng(pos.lat, pos.lng);
        setAddressLocation(addressLocation);
        setIsNextDisabled(false);
        setMapAddressSelected(true);
        setFromListSelection(false);
    };

    const handleMapClick = useCallback(
        async (event) => {
            const pos = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            };
            handleLocation(pos);

            const addressLocation = await getAddressFromLatLng(pos.lat, pos.lng);
            setAddressLocation(addressLocation);
            setIsNextDisabled(false);
            setMapAddressSelected(true);
            setFromListSelection(false);
        },
        [map]
    );

    // GPS Button
    const gotoMyLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            handleLocation(pos);
            setIsNextDisabled(false);
            setMapAddressSelected(true);
            setFromListSelection(false);
        });
    };

    // Handle address selection from list
    const handleAddressSelect = (address) => {
        setSelectedAddressId(address.id);
        setSelectedAddress(address);

        if (setLiveAddress) {
            setLiveAddress(address);
        }

        setIsNextDisabled(false);
        setFromListSelection(true);

        console.log("Selected address:", address);
    };

    // Handle add new address - switch to map
    const handleAddNewAddress = () => {
        setShowMap(true);
        setSelectedAddressId(null);
        setSelectedAddress(null);
        setIsNextDisabled(true);
        setMapAddressSelected(false);
        setFromListSelection(false);
    };

    const handleBackToAddressList = () => {
        setShowMap(false);
        if (selectedAddress) {
            setIsNextDisabled(false);
            setFromListSelection(true);
        } else {
            setIsNextDisabled(true);
        }
    };

    // ✅ Next button custom handler
    const handleNextClick = async () => {
        if (fromListSelection) {
            navigate('/date-time');
            return false;
        } else if (mapAddressSelected) {
            navigate('/address');
            return false;
        }
        return true;
    };

    if (!isLoaded) return <div>Loading map…</div>;
    return (
        <div>
            <ServiceDetails title="Address" currentStep={2} />
            <div className="flex gap-8 mt-5">
                <div className="md:w-[60%] mb-4 space-y-4 relative shadow-md">
                    <h2 className="text-[27px] font-semibold ml-12">Where do you need the service?</h2>

                    {/* Conditional Rendering */}
                    {hasAddresses && !showMap ? (
                        // Display addresses list
                        <div className="space-y-4 p-6">
                            <h3 className="text-xl font-semibold mb-4">Select your address</h3>
                            {addresses.map((addr) => (
                                <div
                                    key={addr.id}
                                    onClick={() => handleAddressSelect(addr)}
                                    className={`border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedAddressId === addr.id ? 'border-blue-500 bg-blue-50' : ''
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <div className={`w-4 h-4 rounded-full border-2 ${selectedAddressId === addr.id
                                                ? 'border-blue-500 bg-blue-500'
                                                : 'border-gray-400'
                                                }`}></div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium">{addr.displayAddress}</div>
                                            <div className="text-sm text-gray-600 mt-1">
                                                {addr.type} • {addr.area}, {addr.city}
                                            </div>
                                            {addr.buildingName && (
                                                <div className="text-sm text-gray-500 mt-1">
                                                    Building: {addr.buildingName}
                                                </div>
                                            )}
                                        </div>
                                        {selectedAddressId === addr.id && (
                                            <div className="text-blue-500 font-medium">
                                                ✓ Selected
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <div className="mt-6">
                                <button
                                    onClick={handleAddNewAddress}
                                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                                >
                                    <FaPlus /> Add New Address
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Display map
                        <>
                            {/* Back button if coming from address list */}
                            {/* {hasAddresses && showMap && (
                                <div className="px-6 pt-4">
                                    <button
                                        onClick={handleBackToAddressList}
                                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 mb-4"
                                    >
                                        ← Back to Address List
                                    </button>
                                </div>
                            )} */}

                            {/* Search Input */}
                            <div className="absolute md:top-18 left-1/2 -translate-x-1/2 z-20 w-11/12">
                                <div className="shadow-lg bg-white rounded-md">
                                    <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
                                        <input
                                            type="text"
                                            placeholder="Search for your address…"
                                            className="w-full p-3 border rounded-md focus:outline-none"
                                        />
                                    </Autocomplete>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="absolute top-80 right-3 z-20 flex flex-col space-y-2">
                                <button onClick={() => map?.setZoom(map.getZoom() + 1)} className="bg-white shadow p-2 rounded-lg">
                                    <FaPlus />
                                </button>
                                <button onClick={() => map?.setZoom(map.getZoom() - 1)} className="bg-white shadow p-2 rounded-lg">
                                    <FaMinus className="font-bold" />
                                </button>
                                <button onClick={gotoMyLocation} className="bg-white shadow p-2 rounded-lg flex items-center justify-center">
                                    <FaLocationCrosshairs />
                                </button>
                                <button onClick={() => setMapType(mapType === "roadmap" ? "hybrid" : "roadmap")} className="bg-white shadow p-2 rounded-lg">
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
                                    gestureHandling: "greedy",
                                    scrollwheel: false,
                                }}
                            >
                                <img
                                    src="https://servicemarket.com/dist/images/map-marker.svg"
                                    alt="center marker"
                                    className="pointer-events-none"
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -100%)",
                                        width: "80px",
                                        height: "80px",
                                        zIndex: 20,
                                    }}
                                />
                            </GoogleMap>
                        </>
                    )}
                </div>

                <Summery
                    serviceTitle={serviceTitle}
                    address={address}
                    itemSummary={itemSummary}
                    total={serviceCharge + (serviceCharge * 0.05)}
                    subTotal={serviceCharge}
                    showInput={showInput}
                    setShowInput={setShowInput}
                    vat={vat}
                    serviceCharge={serviceCharge}
                    liveAddress={selectedAddress}
                />
            </div>
            <div className="hidden md:block">
                {/* ✅ handleNextClick function pass করো */}
                <NextBtn
                    disabled={isNextDisabled}
                    onClick={handleNextClick}
                />
            </div>
        </div>
    );
};








// main
// import { useState, useCallback } from "react";
// import { FaLocationCrosshairs, FaPlus, FaMinus } from "react-icons/fa6";
// import { FaSatellite } from "react-icons/fa";
// import { GoogleMap, useJsApiLoader, Autocomplete } from "@react-google-maps/api";
// import NextBtn from "../../../components/NextBtn/NextBtn";
// import Summery from "../../../components/Summery/Summery";
// import { useSummary } from "../../../provider/SummaryProvider";
// import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";

// const containerStyle = { width: "100%", height: "500px" };
// const defaultCenter = { lat: 23.8103, lng: 90.4125 };

// export default function LocationPicker() {
//     const { isLoaded } = useJsApiLoader({
//         googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
//         libraries: ["places"],
//     });

//     const { itemSummary, vat, serviceCharge, showInput, setShowInput, address, serviceTitle, setMapLongitude, setMapLatitude, setAddressLocation, getAddresses } = useSummary();

//     console.log(getAddresses());

//     const [selectedPos, setSelectedPos] = useState(defaultCenter);
//     const [map, setMap] = useState(null);
//     const [autocomplete, setAutocomplete] = useState(null);
//     const [mapType, setMapType] = useState("roadmap");

//     const getAddressFromLatLng = (lat, lng) => {
//         const geocoder = new window.google.maps.Geocoder();
//         return new Promise((resolve, reject) => {
//             geocoder.geocode({ location: { lat, lng } }, (results, status) => {
//                 if (status === "OK" && results[0]) {
//                     resolve(results[0].formatted_address);
//                 } else {
//                     reject("Address not found");
//                 }
//             });
//         });
//     };

//     const handleLocation = async (pos) => {
//         setSelectedPos(pos);
//         map?.panTo(pos);

//         await getAddressFromLatLng(pos.lat, pos.lng);
//         setMapLatitude(pos.lat)
//         setMapLongitude(pos.lng);

//         console.log("Latitude:", pos.lat, "Longitude:", pos.lng);
//     };

//     const onLoadAutocomplete = (auto) => setAutocomplete(auto);

//     const onPlaceChanged = async () => {
//         if (!autocomplete) return;
//         const place = autocomplete.getPlace();
//         if (!place.geometry) return;

//         const pos = {
//             lat: place.geometry.location.lat(),
//             lng: place.geometry.location.lng(),
//         };
//         handleLocation(pos);

//         const addressLocation = await getAddressFromLatLng(pos.lat, pos.lng);
//         setAddressLocation(addressLocation);
//     };

//     const handleMapClick = useCallback(
//         async (event) => {
//             const pos = {
//                 lat: event.latLng.lat(),
//                 lng: event.latLng.lng(),
//             };
//             handleLocation(pos);

//             const addressLocation = await getAddressFromLatLng(pos.lat, pos.lng);
//             setAddressLocation(addressLocation);
//         },
//         [map]
//     );

//     // GPS Button
//     const gotoMyLocation = () => {
//         navigator.geolocation.getCurrentPosition((position) => {
//             const pos = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude,
//             };
//             handleLocation(pos);
//         });
//     };

//     if (!isLoaded) return <div>Loading map…</div>;
//     return (
//         <div>
//             <ServiceDetails title="Address" currentStep={2} />
//             <div className="flex gap-8 mt-5">
//                 <div className="md:w-[60%] mb-4 space-y-4 relative shadow-md">
//                     <h2 className="text-[27px] font-semibold ml-12">Where do you need the service?</h2>

//                     {/* Search Input */}
//                     <div className="absolute md:top-18 left-1/2 -translate-x-1/2 z-20 w-11/12">
//                         <div className="shadow-lg bg-white rounded-md">
//                             <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
//                                 <input
//                                     type="text"
//                                     placeholder="Search for your address…"
//                                     className="w-full p-3 border rounded-md focus:outline-none"
//                                 />
//                             </Autocomplete>
//                         </div>
//                     </div>

//                     {/* Buttons */}
//                     <div className="absolute top-80 right-3 z-20 flex flex-col space-y-2">
//                         <button onClick={() => map?.setZoom(map.getZoom() + 1)} className="bg-white shadow p-2 rounded-lg">
//                             <FaPlus />
//                         </button>
//                         <button onClick={() => map?.setZoom(map.getZoom() - 1)} className="bg-white shadow p-2 rounded-lg">
//                             <FaMinus className="font-bold" />
//                         </button>
//                         <button onClick={gotoMyLocation} className="bg-white shadow p-2 rounded-lg flex items-center justify-center">
//                             <FaLocationCrosshairs />
//                         </button>
//                         <button onClick={() => setMapType(mapType === "roadmap" ? "hybrid" : "roadmap")} className="bg-white shadow p-2 rounded-lg">
//                             <FaSatellite />
//                         </button>
//                     </div>

//                     {/* Google Map */}
//                     <GoogleMap
//                         mapContainerStyle={containerStyle}
//                         center={selectedPos}
//                         zoom={15}
//                         onLoad={setMap}
//                         onClick={handleMapClick}
//                         mapTypeId={mapType}
//                         options={{
//                             disableDefaultUI: true,
//                             zoomControl: false,
//                             mapTypeControl: false,
//                             fullscreenControl: false,
//                             streetViewControl: false,
//                             keyboardShortcuts: false,
//                             gestureHandling: "greedy",
//                             scrollwheel: false,
//                         }}
//                     >
//                         <img
//                             src="https://servicemarket.com/dist/images/map-marker.svg"
//                             alt="center marker"
//                             className="pointer-events-none"
//                             style={{
//                                 position: "absolute",
//                                 top: "50%",
//                                 left: "50%",
//                                 transform: "translate(-50%, -100%)",
//                                 width: "80px",
//                                 height: "80px",
//                                 zIndex: 20,
//                             }}
//                         />
//                     </GoogleMap>
//                 </div>

//                 <Summery
//                     serviceTitle={serviceTitle}
//                     address={address}
//                     itemSummary={itemSummary}
//                     total={serviceCharge + (serviceCharge * 0.05)}
//                     subTotal={serviceCharge}
//                     showInput={showInput}
//                     setShowInput={setShowInput}
//                     vat={vat}
//                     serviceCharge={serviceCharge}
//                 />
//             </div>
//             <div className="hidden md:block">
//                 <NextBtn />
//             </div>
//         </div>
//     );
// };