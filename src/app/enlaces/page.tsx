"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
    { id: "veterinarios", name: "Veterinarios", icon: "🏥" },
    { id: "peluquerias", name: "Peluquerías", icon: "✂️" },
    { id: "tiendas", name: "Tiendas", icon: "🛒" },
    { id: "guarderias", name: "Guarderías", icon: "🏠" },
    { id: "hoteles", name: "Hoteles Pet-Friendly", icon: "🏨" },
    { id: "parques", name: "Parques caninos", icon: "🌳" },
];

// Sample places data
const samplePlaces = [
    {
        id: "1",
        name: "Clínica Veterinaria San Antón",
        category: "veterinarios",
        address: "Calle Mayor 45, Madrid",
        rating: 4.8,
        reviews: 234,
        distance: 0.5,
        phone: "912 345 678",
        hours: "9:00 - 21:00",
        placeId: "ChIJ1234567890",
    },
    {
        id: "2",
        name: "Peluquería Canina Pelitos",
        category: "peluquerias",
        address: "Avenida de la Paz 12, Madrid",
        rating: 4.6,
        reviews: 156,
        distance: 0.8,
        phone: "912 456 789",
        hours: "10:00 - 19:00",
        placeId: "ChIJ2345678901",
    },
    {
        id: "3",
        name: "Tienda WOW Mascotas",
        category: "tiendas",
        address: "Calle del Commerce, 89, Madrid",
        rating: 4.5,
        reviews: 89,
        distance: 1.2,
        phone: "912 567 890",
        hours: "10:00 - 20:00",
        placeId: "ChIJ3456789012",
    },
    {
        id: "4",
        name: "Guardería Patitas Felices",
        category: "guarderias",
        address: "Polígono Industrial Norte, Madrid",
        rating: 4.9,
        reviews: 312,
        distance: 2.5,
        phone: "912 678 901",
        hours: "7:00 - 21:00",
        placeId: "ChIJ4567890123",
    },
    {
        id: "5",
        name: "Hotel Rural El Perro Viajero",
        category: "hoteles",
        address: "Carretera de la Sierra, km 5, Guadalajara",
        rating: 4.7,
        reviews: 178,
        distance: 45,
        phone: "912 789 012",
        hours: "24h",
        placeId: "ChIJ5678901234",
    },
    {
        id: "6",
        name: "Parque Canino Juan Carlos I",
        category: "parques",
        address: "Parque Juan Carlos I, Madrid",
        rating: 4.4,
        reviews: 567,
        distance: 5.3,
        phone: null,
        hours: "8:00 - 22:00",
        placeId: "ChIJ6789012345",
    },
];

export default function EnlacesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [locationLoading, setLocationLoading] = useState(false);

    const filteredPlaces = samplePlaces
        .filter((place) => {
            const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                place.address.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !selectedCategory || place.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => a.distance - b.distance);

    const requestLocation = () => {
        setLocationLoading(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setLocationLoading(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setLocationLoading(false);
                }
            );
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    🔗 Enlaces de Interés
                </h1>
                <p className="text-muted-foreground max-w-2xl">
                    Encuentra veterinarios, peluquerías, tiendas y más servicios para mascotas
                    cerca de ti.
                </p>
            </div>

            {/* Location Banner */}
            {!userLocation && (
                <Card className="mb-8 bg-pet-orange-light border-pet-orange/20">
                    <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">📍</span>
                            <div>
                                <p className="font-medium">Activa tu ubicación</p>
                                <p className="text-sm text-muted-foreground">
                                    Para ordenar los resultados por proximidad
                                </p>
                            </div>
                        </div>
                        <Button onClick={requestLocation} disabled={locationLoading}>
                            {locationLoading ? "Obteniendo..." : "Activar ubicación"}
                        </Button>
                    </CardContent>
                </Card>
            )}

            {userLocation && (
                <Card className="mb-8 bg-pet-green-light border-pet-green/20">
                    <CardContent className="p-4 flex items-center gap-3">
                        <span className="text-2xl">✅</span>
                        <p className="font-medium">
                            Ubicación activada - Mostrando resultados ordenados por proximidad
                        </p>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Search */}
                    <Card>
                        <CardContent className="p-4">
                            <Input
                                placeholder="Buscar lugar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </CardContent>
                    </Card>

                    {/* Categories */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Categorías</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`w-full flex items-center gap-2 p-2 rounded-lg transition-colors text-left ${!selectedCategory ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                                    }`}
                            >
                                <span>📍</span>
                                <span>Todos</span>
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`w-full flex items-center gap-2 p-2 rounded-lg transition-colors text-left ${selectedCategory === cat.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                                        }`}
                                >
                                    <span>{cat.icon}</span>
                                    <span>{cat.name}</span>
                                </button>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Ad Space */}
                    <div className="p-6 bg-muted/50 rounded-xl border-2 border-dashed border-border text-center">
                        <p className="text-muted-foreground text-sm">
                            📢 Espacio para Google Ads
                        </p>
                    </div>
                </div>

                {/* Places List */}
                <div className="lg:col-span-3">
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-sm text-muted-foreground">
                            {filteredPlaces.length} lugares encontrados
                        </p>
                        <Button variant="outline" size="sm">
                            🗺️ Ver en mapa
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {filteredPlaces.map((place) => (
                            <PlaceCard key={place.id} place={place} />
                        ))}
                    </div>

                    {filteredPlaces.length === 0 && (
                        <Card className="text-center py-12">
                            <CardContent>
                                <div className="text-4xl mb-4">🔍</div>
                                <p className="text-muted-foreground">
                                    No se encontraron lugares con esos criterios
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

function PlaceCard({ place }: { place: typeof samplePlaces[0] }) {
    const category = categories.find((c) => c.id === place.category);

    const openInMaps = () => {
        const mapsUrl = `https://www.google.com/maps/place/?q=place_id:${place.placeId}`;
        window.open(mapsUrl, "_blank");
    };

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-pet-orange-light rounded-xl flex items-center justify-center text-2xl shrink-0">
                        {category?.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                                <h3 className="font-semibold text-lg">{place.name}</h3>
                                <p className="text-sm text-muted-foreground">{place.address}</p>
                            </div>
                            <Badge variant="secondary">{category?.name}</Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
                            <span className="flex items-center gap-1">
                                ⭐ {place.rating} ({place.reviews} reseñas)
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                                📍 {place.distance < 1 ? `${(place.distance * 1000).toFixed(0)}m` : `${place.distance.toFixed(1)}km`}
                            </span>
                            {place.hours && (
                                <span className="flex items-center gap-1 text-muted-foreground">
                                    🕐 {place.hours}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {place.phone && (
                                <Button variant="outline" size="sm" asChild>
                                    <a href={`tel:${place.phone}`}>
                                        📞 Llamar
                                    </a>
                                </Button>
                            )}
                            <Button variant="outline" size="sm" onClick={openInMaps}>
                                🗺️ Ver en Google Maps
                            </Button>
                            <Button size="sm">
                                Más información
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
