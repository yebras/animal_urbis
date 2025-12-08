"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const containerStyle = {
    width: "100%",
    height: "600px",
    borderRadius: "0.75rem",
};

// Default center (Madrid)
const defaultCenter = {
    lat: 40.416775,
    lng: -3.703790,
};

// Libraries to load 
const libraries: ("places")[] = ["places"];

// Place types with icons
const placeTypes = [
    { id: "veterinary_care", label: "Veterinarios", icon: "🏥" },
    { id: "pet_store", label: "Tiendas", icon: "🏪" },
    { id: "park", label: "Parques", icon: "🌳" },
];

export default function LugaresInteresPage() {
    const [center, setCenter] = useState(defaultCenter);
    const [selectedType, setSelectedType] = useState("veterinary_care");
    const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [loadingLocation, setLoadingLocation] = useState(false);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries: libraries,
    });

    // Get current location
    const handleLocateMe = () => {
        setLoadingLocation(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCenter(pos);
                    map?.panTo(pos);
                    setLoadingLocation(false);
                    searchNearby(pos, selectedType);
                },
                () => {
                    toast.error("Error al obtener tu ubicación");
                    setLoadingLocation(false);
                }
            );
        } else {
            toast.error("Tu navegador no soporta geolocalización");
            setLoadingLocation(false);
        }
    };

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    const searchNearby = (location: google.maps.LatLngLiteral, type: string) => {
        if (!map || !window.google) return;

        const service = new window.google.maps.places.PlacesService(map);
        const request: google.maps.places.PlaceSearchRequest = {
            location: location,
            radius: 5000, // 5km radius
            type: type,
        };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                setPlaces(results);
            } else {
                setPlaces([]);
                toast.info("No se encontraron lugares cercanos de este tipo");
            }
        });
    };

    // Re-search when type changes or map loads
    useEffect(() => {
        if (isLoaded && map) {
            searchNearby(center, selectedType);
        }
    }, [isLoaded, map, selectedType, center]);

    if (!isLoaded) {
        return <div className="p-8 text-center">Cargando mapa...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">🗺️ Lugares de Interés</h1>
                    <p className="text-muted-foreground">
                        Encuentra veterinarios, tiendas y parques cerca de ti.
                    </p>
                </div>
                <Button onClick={handleLocateMe} disabled={loadingLocation}>
                    {loadingLocation ? "Localizando..." : "📍 Usar mi ubicación"}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    <Card>
                        <CardContent className="p-4">
                            <Tabs
                                defaultValue="veterinary_care"
                                value={selectedType}
                                onValueChange={setSelectedType}
                                orientation="vertical"
                                className="w-full"
                            >
                                <TabsList className="flex flex-col h-auto bg-muted">
                                    {placeTypes.map((t) => (
                                        <TabsTrigger
                                            key={t.id}
                                            value={t.id}
                                            className="w-full justify-start px-4 py-3"
                                        >
                                            <span className="mr-2">{t.icon}</span> {t.label}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>
                        </CardContent>
                    </Card>

                    {/* Minimalist Place Details Card */}
                    {selectedPlace && (
                        <Card className="animate-in fade-in slide-in-from-bottom-4">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg leading-tight">
                                    {selectedPlace.name}
                                </CardTitle>
                                <div className="flex items-center gap-1 text-xs text-amber-500">
                                    <span>★</span>
                                    <span>{selectedPlace.rating || "N/A"}</span>
                                    <span className="text-muted-foreground">
                                        ({selectedPlace.user_ratings_total})
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                                <p className="text-muted-foreground">
                                    {selectedPlace.vicinity}
                                </p>
                                {selectedPlace.opening_hours?.isOpen() ? (
                                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                        Abierto ahora
                                    </Badge>
                                ) : (
                                    <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                                        Cerrado
                                    </Badge>
                                )}
                                <Button
                                    variant="secondary"
                                    className="w-full mt-2"
                                    onClick={() => {
                                        window.open(
                                            `https://www.google.com/maps/place/?q=place_id:${selectedPlace.place_id}`,
                                            "_blank"
                                        );
                                    }}
                                >
                                    Cómo llegar ↗
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className="lg:col-span-3">
                    <Card className="overflow-hidden border-2">
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={14}
                            onLoad={onLoad}
                            onUnmount={onUnmount}
                            options={{
                                mapTypeControl: false,
                                streetViewControl: false,
                                fullscreenControl: false,
                                styles: [
                                    {
                                        featureType: "poi",
                                        elementType: "labels",
                                        stylers: [{ visibility: "off" }],
                                    },
                                ],
                            }}
                        >
                            {/* User Location Marker */}
                            <Marker
                                position={center}
                                icon={{
                                    path: window.google.maps.SymbolPath.CIRCLE,
                                    scale: 8,
                                    fillColor: "#4285F4",
                                    fillOpacity: 1,
                                    strokeColor: "white",
                                    strokeWeight: 2,
                                }}
                            />

                            {/* Place Markers */}
                            {places.map((place) => (
                                <Marker
                                    key={place.place_id}
                                    position={place.geometry?.location!}
                                    onClick={() => setSelectedPlace(place)}
                                    animation={window.google.maps.Animation.DROP}
                                    icon={{
                                        url:
                                            selectedType === "veterinary_care"
                                                ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                                                : selectedType === "park"
                                                    ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                                                    : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                                    }}
                                />
                            ))}

                            {selectedPlace && (
                                <InfoWindow
                                    position={selectedPlace.geometry?.location!}
                                    onCloseClick={() => setSelectedPlace(null)}
                                >
                                    <div className="p-1">
                                        <h3 className="font-bold text-sm mb-1">{selectedPlace.name}</h3>
                                        <p className="text-xs">{selectedPlace.vicinity}</p>
                                    </div>
                                </InfoWindow>
                            )}
                        </GoogleMap>
                    </Card>
                </div>
            </div>
        </div>
    );
}
