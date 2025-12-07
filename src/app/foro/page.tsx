"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample forum data
const forumCategories = [
    { id: "consejos", name: "Consejos", icon: "💡", count: 45 },
    { id: "salud", name: "Salud", icon: "🏥", count: 32 },
    { id: "comportamiento", name: "Comportamiento", icon: "🧠", count: 28 },
    { id: "adopcion", name: "Adopción", icon: "❤️", count: 15 },
    { id: "general", name: "General", icon: "💬", count: 67 },
];

const samplePosts = [
    {
        id: "1",
        title: "Mi perro ladra mucho cuando me voy de casa",
        content: "Tengo un labrador de 2 años y cada vez que salgo de casa ladra sin parar. Los vecinos se quejan. ¿Algún consejo?",
        category: "comportamiento",
        author: { name: "María García", avatar: "" },
        createdAt: "2024-12-07T10:30:00",
        replies: 12,
        views: 156,
    },
    {
        id: "2",
        title: "¿Qué pienso recomendáis para gatos con estómago sensible?",
        content: "Mi gata tiene problemas digestivos frecuentes. El veterinario dice que necesita alimentación especial. ¿Experiencias?",
        category: "salud",
        author: { name: "Carlos Ruiz", avatar: "" },
        createdAt: "2024-12-06T15:45:00",
        replies: 8,
        views: 89,
    },
    {
        id: "3",
        title: "Adopté un cachorro de la protectora - Mi experiencia",
        content: "Quería compartir mi experiencia adoptando a Bruno. Lleva 3 meses con nosotros y es lo mejor que nos ha pasado...",
        category: "adopcion",
        author: { name: "Ana López", avatar: "" },
        createdAt: "2024-12-05T09:15:00",
        replies: 24,
        views: 342,
    },
    {
        id: "4",
        title: "Tips para el primer viaje en coche con tu mascota",
        content: "Después de varios viajes largos con mi perro, he aprendido algunos trucos que quiero compartir con vosotros...",
        category: "consejos",
        author: { name: "Pedro Sánchez", avatar: "" },
        createdAt: "2024-12-04T18:20:00",
        replies: 15,
        views: 198,
    },
    {
        id: "5",
        title: "¿Microchip obligatorio para gatos?",
        content: "Con la nueva ley, ¿es obligatorio ponerle microchip a los gatos? Mi veterinario no me ha dicho nada claro...",
        category: "general",
        author: { name: "Laura Fernández", avatar: "" },
        createdAt: "2024-12-03T12:00:00",
        replies: 19,
        views: 267,
    },
];

export default function ForoPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredPosts = samplePosts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        💬 Foro Comunitario
                    </h1>
                    <p className="text-muted-foreground">
                        Conecta con otros amantes de las mascotas, comparte experiencias y resuelve dudas.
                    </p>
                </div>
                <Button>
                    <span className="mr-2">+</span> Nueva publicación
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Search */}
                    <Card>
                        <CardContent className="p-4">
                            <Input
                                placeholder="Buscar en el foro..."
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
                                className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${!selectedCategory ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                                    }`}
                            >
                                <span>Todas</span>
                                <Badge variant="secondary" className="text-xs">
                                    {samplePosts.length}
                                </Badge>
                            </button>
                            {forumCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${selectedCategory === cat.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span>{cat.icon}</span>
                                        <span>{cat.name}</span>
                                    </span>
                                    <Badge variant="secondary" className="text-xs">
                                        {cat.count}
                                    </Badge>
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

                {/* Posts List */}
                <div className="lg:col-span-3">
                    <Tabs defaultValue="recientes">
                        <TabsList className="mb-6">
                            <TabsTrigger value="recientes">Más recientes</TabsTrigger>
                            <TabsTrigger value="populares">Más populares</TabsTrigger>
                            <TabsTrigger value="sin-respuesta">Sin respuesta</TabsTrigger>
                            ))
                            )}
                        </TabsContent>

                        <TabsContent value="populares" className="space-y-4">
                            {[...filteredPosts]
                                .sort((a, b) => b.views - a.views)
                                .map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                        </TabsContent>

                        <TabsContent value="sin-respuesta" className="space-y-4">
                            {filteredPosts
                                .filter((p) => p.replies === 0)
                                .map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            {filteredPosts.filter((p) => p.replies === 0).length === 0 && (
                                <Card className="text-center py-12">
                                    <CardContent>
                                        <div className="text-4xl mb-4">✨</div>
                                        <p className="text-muted-foreground">
                                            ¡Todas las publicaciones tienen respuesta!
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

function PostCard({ post }: { post: typeof samplePosts[0] }) {
    const category = forumCategories.find((c) => c.id === post.category);
    const timeAgo = getTimeAgo(post.createdAt);

    return (
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
                <div className="flex gap-4">
                    <Avatar className="h-10 w-10 shrink-0">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                            {post.author.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <Badge variant="secondary" className="text-xs">
                                {category?.icon} {category?.name}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{timeAgo}</span>
                        </div>

                        <h3 className="font-semibold text-base mb-1 line-clamp-1 hover:text-primary transition-colors">
                            {post.title}
                        </h3>

                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {post.content}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <span>👤</span> {post.author.name}
                            </span>
                            <span className="flex items-center gap-1">
                                <span>💬</span> {post.replies} respuestas
                            </span>
                            <span className="flex items-center gap-1">
                                <span>👁</span> {post.views} vistas
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Hace unos minutos";
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays === 1) return "Ayer";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}
