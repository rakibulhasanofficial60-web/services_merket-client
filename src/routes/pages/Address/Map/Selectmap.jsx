import React, { useState, useRef, useEffect } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  ControlPosition,
  MapControl,
  useMap,
  useMapsLibrary,
  InfoWindow,
} from '@vis.gl/react-google-maps';

// আপনার Google Maps API Key এখানে বসান
const GOOGLE_MAPS_API_KEY = 'AIzaSyAqAIS2fXL9QBBER4VrtWG3z8RrSWvjj7g'; 
const DEFAULT_CENTER = { lat: 23.8103, lng: 90.4125 }; // ঢাকা

/**
 * ম্যাপ সার্চ/অটোকমপ্লিট হ্যান্ডেল করার জন্য একটি সাব-কম্পোনেন্ট।
 */
const PlaceAutocomplete = ({ onPlaceSelect }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    // Autocomplete অপশন সেট করা
    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
    };
    const autocomplete = new places.Autocomplete(inputRef.current, options);
    setPlaceAutocomplete(autocomplete);

    // যখন ইউজার কোনো জায়গা সিলেক্ট করবে
    const listener = autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      onPlaceSelect(place);
    });

    return () => {
      if (listener) places.event.removeListener(listener);
    };
  }, [places, onPlaceSelect]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search for your home address"
      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
    />
  );
};

/**
 * ম্যাপে পিন পজিশন আপডেট করার জন্য হুক।
 */
const MapHandler = ({ place, setMarkerPosition, setAddress }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !place.geometry) return;

    // সিলেক্টেড জায়গার ভিউপোর্ট অনুযায়ী ম্যাপটি জুম করা
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    
    // মার্কারের পজিশন আপডেট করা
    const newPosition = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
    };
    setMarkerPosition(newPosition);
    setAddress(place.formatted_address);
  }, [map, place, setMarkerPosition, setAddress]);

  return null;
};


const MapComponent = ({ onBack, onSelectLocation }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(DEFAULT_CENTER);
  const [currentAddress, setCurrentAddress] = useState("Loading address...");
  const geocoder = useMapsLibrary('geocoding'); // Geocoding API ব্যবহার করার জন্য

  // ম্যাপে ক্লিক করলে মার্কার পজিশন পরিবর্তন করার ফাংশন
  const handleMapClick = (e) => {
    const lat = e.detail.latLng.lat;
    const lng = e.detail.latLng.lng;
    setMarkerPosition({ lat, lng });
    
    // নতুন পজিশনের ঠিকানা খুঁজে বের করা (Reverse Geocoding)
    if (geocoder) {
        new geocoder.Geocoder().geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK' && results[0]) {
                setCurrentAddress(results[0].formatted_address);
            } else {
                setCurrentAddress("Address not found.");
            }
        });
    }
  };

  const handleConfirmLocation = () => {
    const newAddress = {
      id: Date.now(),
      name: "New Location",
      // মার্কারের পজিশন এবং প্রাপ্ত ঠিকানা সেভ করা
      details: currentAddress,
      coords: markerPosition
    };
    onSelectLocation(newAddress);
    onBack();
  };

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div>
        <div className="flex items-center mb-4">
          <button 
            onClick={onBack} 
            className="text-gray-500 hover:text-gray-700 mr-4"
          >
            {/* Back Arrow */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          
          {/* সার্চ ইনপুট */}
          <div className="flex-grow relative">
            <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
            {/* Search Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* ম্যাপ ডিসপ্লে এরিয়া */}
        <div className="relative w-full h-80 rounded-lg overflow-hidden border border-gray-300">
          <Map
            defaultCenter={DEFAULT_CENTER}
            defaultZoom={12}
            gestureHandling={'greedy'}
            disableDefaultUI={false} // Google's default UI elements থাকবে
            onClick={handleMapClick} // ম্যাপে ক্লিক করলে মার্কার সরাবে
            mapId="YOUR_CUSTOM_MAP_ID" // ম্যাপ স্টাইল কাস্টমাইজ করতে পারেন
            style={{ width: '100%', height: '100%' }}
          >
            {/* অ্যাডভান্সড মার্কার (পিন) */}
            <AdvancedMarker 
                position={markerPosition} 
                draggable={true} // পিন সরানোর সুবিধা
                onDragEnd={(e) => handleMapClick(e)} // পিন সরিয়ে ছেড়ে দিলে তার পজিশন আপডেট করা
            />
            {/* জুম কন্ট্রোল (ম্যাপের ডিফল্ট UI disable না করলে এটি দরকার নেই)
            <MapControl position={ControlPosition.TOP_RIGHT}>
                <div className="flex flex-col space-y-2 p-2">
                    <button className="bg-white p-1 rounded-full shadow-md text-gray-600 hover:bg-gray-100">+</button>
                    <button className="bg-white p-1 rounded-full shadow-md text-gray-600 hover:bg-gray-100">-</button>
                </div>
            </MapControl>
            */}
          </Map>

          {/* লোকেশন ডিসপ্লে */}
          <div className="absolute bottom-2 left-2 bg-white text-sm p-2 rounded shadow max-w-[90%] z-10">
              Your service will be delivered here: *{currentAddress}*
          </div>
        </div>

        {/* ম্যাপ হ্যান্ডলার */}
        <MapHandler place={selectedPlace} setMarkerPosition={setMarkerPosition} setAddress={setCurrentAddress} />

        <button 
          onClick={handleConfirmLocation} 
          className="mt-6 w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition duration-200"
        >
          Confirm Location
        </button>
      </div>
    </APIProvider>
  );
};

export default MapComponent;