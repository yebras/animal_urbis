"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MessageCircle, Share2, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Mock data to simulate fetching a post
const getPost = (id: string) => {
    return {
        id,
        title: "Consejos para la ansiedad por separación",
        content: `
      <p>Hola a todos,</p>
      <p>Mi perro Lucky lo pasa fatal cuando me voy a trabajar. Empieza a ladrar y a rascar la puerta. He probado con juguetes interactivos y dejándole la radio puesta, pero no parece mejorar mucho.</p>
      <p>¿Alguien ha pasado por esto y puede darme algún consejo que le haya funcionado? Me da mucha pena verlo así y también me preocupan los vecinos.</p>
      <p>¡Gracias de antemano!</p>
    `,
        author: {
            name: "María G.",
            avatar: "MG",
        },
        date: "Hace 2 horas",
        likes: 15,
        replies: 4,
        category: "Comportamiento",
    };
};

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const [post, setPost] = useState<any>(null);

    useEffect(() => {
        // Simulate fetch
        setPost(getPost(unwrappedParams.id));
    }, [unwrappedParams.id]);

    if (!post) {
        return <div className="container py-8 text-center">Cargando...</div>;
    }

    return (
        <div className="container max-w-4xl py-8 px-4">
            <Button variant="ghost" className="mb-6 gap-2" asChild>
                <Link href="/foro">
                    <ArrowLeft className="w-4 h-4" />
                    Volver al foro
                </Link>
            </Button>

            <Card className="mb-8">
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                    <div className="flex gap-4">
                        <Avatar>
                            <AvatarFallback>{post.author.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl mb-1">{post.title}</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">{post.author.name}</span>
                                <span>•</span>
                                <span>{post.date}</span>
                                <span>•</span>
                                <span className="bg-muted px-2 py-0.5 rounded-full text-xs">
                                    {post.category}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div
                        className="prose prose-stone dark:prose-invert max-w-none mb-6"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <Separator className="my-4" />

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ThumbsUp className="w-4 h-4" />
                            {post.likes} Me gusta
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                            <MessageCircle className="w-4 h-4" />
                            {post.replies} Respuestas
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2 ml-auto">
                            <Share2 className="w-4 h-4" />
                            Compartir
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <h3 className="text-xl font-bold px-1">Respuestas ({post.replies})</h3>

                {/* Mock Replies */}
                {[1, 2].map((i) => (
                    <Card key={i}>
                        <CardContent className="pt-6">
                            <div className="flex gap-4">
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback>U{i}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-sm">Usuario {i}</span>
                                        <span className="text-xs text-muted-foreground">Hace 1 hora</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Te recomiendo empezar a practicar salidas cortas y aumentar el tiempo progresivamente. También ayuda no hacer "fiesta" al volver ni despedidas largas al irte.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
