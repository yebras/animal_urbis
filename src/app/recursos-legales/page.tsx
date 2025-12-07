"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { provinces, legalCategories, legalResources, defaultLegalResources } from "@/lib/data/provinces";

export default function RecursosLegalesPage() {
    const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>("28"); // Default Madrid

    const selectedProvinceData = provinces.find((p) => p.code === selectedProvinceCode);
    const provinceResources = selectedProvinceData
        ? legalResources[selectedProvinceCode] || defaultLegalResources
        : [];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col items-center mb-10 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Recursos Legales</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    Encuentra toda la información legal y normativa para tu mascota según tu comunidad autónoma y provincia.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Province Selector */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Selecciona tu provincia</CardTitle>
                            <CardDescription>
                                Busca y selecciona tu provincia para ver los recursos disponibles.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Select value={selectedProvinceCode} onValueChange={setSelectedProvinceCode}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecciona provincia" />
                                </SelectTrigger>
                                <SelectContent>
                                    {provinces.map((province) => (
                                        <SelectItem key={province.code} value={province.code}>
                                            {province.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* General Resources */}
                            <div className="mt-8">
                                <h3 className="text-base font-semibold mb-3">📚 Recursos Generales</h3>
                                <div className="space-y-3">
                                    <Link
                                        href="https://www.boe.es/buscar/act.php?id=BOE-A-2023-5765"
                                        target="_blank"
                                        className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                                    >
                                        <p className="font-medium text-sm">Ley de Bienestar Animal 2023</p>
                                        <p className="text-xs text-muted-foreground">Ley 7/2023 de protección animal</p>
                                    </Link>
                                    <Link
                                        href="https://www.mapa.gob.es/es/ganaderia/temas/sanidad-animal-higiene-ganadera/sanidad-animal/animales-compania/"
                                        target="_blank"
                                        className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                                    >
                                        <p className="font-medium text-sm">MAPA - Animales de Compañía</p>
                                        <p className="text-xs text-muted-foreground">Ministerio de Agricultura</p>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Resources Content */}
                <div className="lg:col-span-2">
                    {selectedProvinceData ? (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="text-2xl">📍</span>
                                    {selectedProvinceData.name}
                                </CardTitle>
                                <CardDescription>
                                    {selectedProvinceData.community} • {provinceResources.length} recursos disponibles
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="todos">
                                    <TabsList className="mb-6 flex-wrap h-auto gap-2">
                                        <TabsTrigger value="todos">Todos</TabsTrigger>
                                        {legalCategories.map((cat) => (
                                            <TabsTrigger key={cat.id} value={cat.id}>
                                                {cat.icon} {cat.name}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>

                                    <TabsContent value="todos" className="space-y-4">
                                        {provinceResources.map((resource) => (
                                            <ResourceCard key={resource.id} resource={resource} />
                                        ))}
                                    </TabsContent>

                                    {legalCategories.map((cat) => (
                                        <TabsContent key={cat.id} value={cat.id} className="space-y-4">
                                            {provinceResources
                                                .filter((r) => r.category === cat.id)
                                                .map((resource) => (
                                                    <ResourceCard key={resource.id} resource={resource} />
                                                ))}
                                            {provinceResources.filter((r) => r.category === cat.id).length === 0 && (
                                                <p className="text-muted-foreground text-center py-8">
                                                    No hay recursos disponibles en esta categoría para esta provincia.
                                                </p>
                                            )}
                                        </TabsContent>
                                    ))}
                                </Tabs>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="h-full min-h-[400px] flex items-center justify-center">
                            <CardContent className="text-center py-12">
                                <div className="text-6xl mb-4">🗺️</div>
                                <h3 className="text-xl font-semibold mb-2">Selecciona una provincia</h3>
                                <p className="text-muted-foreground max-w-md">
                                    Elige tu provincia en el panel de la izquierda para ver los
                                    recursos legales disponibles.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}

function ResourceCard({ resource }: { resource: { id: string; category: string; title: string; description: string; url: string } }) {
    const category = legalCategories.find((c) => c.id === resource.category);

    return (
        <Link href={resource.url} target="_blank" className="block">
            <Card className="hover:shadow-md transition-all hover:border-primary/50">
                <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                        <div className="text-2xl">{category?.icon || "📄"}</div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm mb-1 group-hover:text-primary">
                                {resource.title}
                            </h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {resource.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                    {category?.name || resource.category}
                                </Badge>
                                {resource.url !== "#" && (
                                    <span className="text-xs text-primary">Ver recurso →</span>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
