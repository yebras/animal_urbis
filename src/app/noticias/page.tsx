"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

interface NewsArticle {
    id: string;
    title: string;
    summary: string;
    source: string;
    category: string;
    date: string;
    imageUrl?: string;
}

const sampleNews: NewsArticle[] = [
    {
        id: "1",
        title: "Nueva Ley de Bienestar Animal: Claves para dueños de perros",
        summary: "Analizamos los puntos más importantes de la nueva legislación que entra en vigor este mes y cómo afecta a los paseos y seguros.",
        source: "Boletín Oficial",
        category: "Legislación",
        date: "Hace 2 horas",
    },
    {
        id: "2",
        title: "Campaña de vacunación contra la rabia 2024",
        summary: "Las clínicas veterinarias de Madrid inician la campaña anual con descuentos especiales para familias numerosas.",
        source: "Salud Vet",
        category: "Salud",
        date: "Hace 5 horas",
    },
    {
        id: "3",
        title: "Parques caninos: Nuevas zonas habilitadas en Barcelona",
        summary: "El ayuntamiento inaugura tres nuevas áreas de recreo para perros con zonas de agility y fuentes adaptadas.",
        source: "Mundo Perro",
        category: "Comunidad",
        date: "Hace 1 día",
    },
    {
        id: "4",
        title: "Alimentación natural vs Piensos: ¿Qué dicen los expertos?",
        summary: "Un estudio comparativo revela los beneficios y riesgos de la dieta BARF frente a la alimentación procesada tradicional.",
        source: "NutriPet",
        category: "Salud",
        date: "Hace 2 días",
    },
];

const categories = ["Todas", "Legislación", "Salud", "Comunidad", "Curiosidades", "Adopción"];

export default function NoticiasPage() {
    const [selectedCategory, setSelectedCategory] = useState("Todas");
    const [showFilters, setShowFilters] = useState(false);

    // Pollinations.ai URL generator
    const getAiImage = (title: string) => {
        const encodedTitle = encodeURIComponent(`Hyperrealistic photo of ${title}, pets, animals, 4k`);
        return `https://image.pollinations.ai/prompt/${encodedTitle}?width=800&height=450&nologo=true`;
    };

    const filteredNews = selectedCategory === "Todas"
        ? sampleNews
        : sampleNews.filter(n => n.category === selectedCategory);

    return (
        <div className="container py-8 px-4 md:px-6">
            <div className="flex flex-col items-center mb-10 text-center">
                <h1 className="text-4xl font-bold mb-4 tracking-tight">Noticias</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    Las últimas noticias animalescas actualizadas cada día para ti.
                </p>
            </div>

            <div className="mb-8">
                <div className="flex justify-center mb-4">
                    <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className="gap-2"
                    >
                        <Filter className="w-4 h-4" />
                        Filtros
                        {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                </div>

                {showFilters && (
                    <div className="flex flex-wrap gap-2 justify-center animate-in fade-in slide-in-from-top-2 duration-300">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                onClick={() => setSelectedCategory(category)}
                                className="rounded-full"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((news) => (
                    <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow border-border/50">
                        <div className="relative h-48 w-full bg-muted">
                            <Image
                                src={news.imageUrl || getAiImage(news.title)}
                                alt={news.title}
                                fill
                                className="object-cover transition-transform hover:scale-105 duration-500"
                                unoptimized
                            />
                            <Badge className="absolute top-2 right-2 bg-background/80 text-foreground backdrop-blur-sm hover:bg-background/90">
                                {news.category}
                            </Badge>
                        </div>
                        <CardHeader>
                            <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
                                <span>{news.source}</span>
                                <span>{news.date}</span>
                            </div>
                            <CardTitle className="text-xl line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                                {news.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="line-clamp-3">
                                {news.summary}
                            </CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button variant="ghost" className="w-full text-primary hover:text-primary/80 hover:bg-primary/10 group">
                                Leer noticia completa
                                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Google Ads Placeholder */}
            <div className="mt-12 p-8 bg-muted/30 rounded-lg border border-dashed border-border flex flex-col items-center justify-center text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">PUBLICIDAD</p>
                <div className="w-full max-w-[728px] h-[90px] bg-muted flex items-center justify-center rounded text-muted-foreground text-xs">
                    Google Ads Slot (728x90)
                </div>
            </div>
        </div>
    );
}
