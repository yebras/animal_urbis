"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ExternalLink } from "lucide-react";

// --- SERVICE APPS DATA ---
const serviceApps = [
    {
        name: "Rover",
        category: "Paseadores y Cuidadores",
        description: "La red más grande del mundo de cuidadores de mascotas y paseadores de perros 5 estrellas.",
        url: "https://www.rover.com/es/",
        icon: "🐕"
    },
    {
        name: "Gudog",
        category: "Alojamiento",
        description: "La mejor alternativa a las residencias caninas. Encuentra un cuidador de confianza cerca de ti.",
        url: "https://gudog.com/",
        icon: "🏠"
    },
    {
        name: "Barkibu",
        category: "Veterinaria Online",
        description: "Asistencia veterinaria online y seguros de salud para mascotas.",
        url: "https://www.barkibu.com/es",
        icon: "⚕️"
    },
    {
        name: "SrPerro",
        category: "Guía Dog Friendly",
        description: "La guía para animales urbanos. Descubre bares, hoteles y playas donde sois bienvenidos.",
        url: "https://www.srperro.com/",
        icon: "🏙️"
    }
];

const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "0.75rem",
};

// Default center (Madrid)
const defaultCenter = {
    lat: 40.416775,
    lng: -3.703790,
};

// Libraries to load 
const libraries: ("places")[] = ["places"];

// Place types with icons and search keywords
const placeTypes = [
    { id: "veterinary_care", label: "Veterinarios", icon: "🏥", keyword: "veterinario" },
    { id: "pet_store", label: "Tiendas", icon: "🏪", keyword: "tienda de animales" },
    { id: "park", label: "Parques", icon: "🌳", keyword: "parque perros" },
    { id: "pet_grooming", label: "Peluquería", icon: "✂️", keyword: "peluquería canina" },
    { id: "pet_boarding", label: "Guardería", icon: "🏨", keyword: "guardería mascotas" }
];

export default function PuntosInteresPage() {
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

    const searchNearby = (location: google.maps.LatLngLiteral, typeId: string) => {
        if (!map || !window.google) return;

        const typeInfo = placeTypes.find(t => t.id === typeId);
        const keyword = typeInfo?.keyword || "veterinario";

        const service = new window.google.maps.places.PlacesService(map);
        const request: google.maps.places.PlaceSearchRequest = {
            location: location,
            radius: 5000, // 5km radius
            keyword: keyword,
        };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                setPlaces(results);
            } else {
                setPlaces([]);
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
        return <div className="p-8 text-center animate-pulse">Cargando mapa...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">🗺️ Puntos de interés</h1>
            <p className="text-muted-foreground mb-6">
                Encuentra todo lo que necesitas: desde veterinarios locales hasta las mejores apps de servicios.
            </p>

            <Tabs defaultValue="mapa" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8">
                    <TabsTrigger value="mapa">📍 Mapa Local</TabsTrigger>
                    <TabsTrigger value="apps">📱 Apps y Servicios</TabsTrigger>
                </TabsList>

                <TabsContent value="mapa" className="animate-in fade-in-50">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div className="text-sm text-muted-foreground">
                            Buscando cerca del centro del mapa
                        </div>
                        <Button onClick={handleLocateMe} disabled={loadingLocation} size="sm">
                            {loadingLocation ? "Localizando..." : "📍 Usar mi ubicación"}
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px] lg:h-[700px]">
                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-4 h-full flex flex-col">
                            <Card>
                                <CardContent className="p-2">
                                    <div className="flex flex-col gap-1">
                                        {placeTypes.map((t) => (
                                            <Button
                                                key={t.id}
                                                variant={selectedType === t.id ? "secondary" : "ghost"}
                                                className="justify-start w-full"
                                                onClick={() => setSelectedType(t.id)}
                                            >
                                                <span className="mr-2 text-xl">{t.icon}</span> {t.label}
                                            </Button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Minimalist Place Details Card */}
                            {selectedPlace && (
                                <Card className="shadow-lg border-primary/20 animate-in slide-in-from-bottom-2">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base leading-tight">
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
                                    <CardContent className="text-xs space-y-2">
                                        <p className="text-muted-foreground line-clamp-2">
                                            {selectedPlace.vicinity}
                                        </p>
                                        {selectedPlace.opening_hours?.isOpen() ? (
                                            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 text-[10px]">
                                                Abierto ahora
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 text-[10px]">
                                                Cerrado
                                            </Badge>
                                        )}
                                        <Button
                                            className="w-full mt-2 h-8 text-xs"
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

                        {/* Map */}
                        <div className="lg:col-span-3 h-full">
                            <Card className="overflow-hidden border-2 h-full w-full relative">
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
                                            }
                                        ]
                                    }}
                                >
                                    {/* User Marker */}
                                    <Marker
                                        position={center}
                                        zIndex={999}
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
                                        />
                                    ))}
                                </GoogleMap>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="apps" className="animate-in fade-in-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {serviceApps.map((app) => (
                            <Card key={app.name} className="hover:shadow-md transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl">
                                            {app.icon}
                                        </div>
                                        <Badge variant="secondary">{app.category}</Badge>
                                    </div>
                                    <CardTitle>{app.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-4 text-sm h-10">
                                        {app.description}
                                    </p>
                                    <Button className="w-full" asChild>
                                        <a href={app.url} target="_blank" rel="noopener noreferrer">
                                            Visitar Sitio <ExternalLink className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
