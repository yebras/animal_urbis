"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

const initialMessages: Message[] = [
    {
        id: "1",
        role: "assistant",
        content: "¡Guau guau! 🐕 ¡Hola! Soy Toby, tu asistente virtual perruno. Estoy aquí para ayudarte con cualquier duda sobre el cuidado de tus mascotas, legislación en España, consejos de salud y mucho más. ¿En qué puedo ayudarte hoy?",
        timestamp: new Date(),
    },
];

const quickQuestions = [
    "¿Qué vacunas necesita mi perro?",
    "¿Es obligatorio el microchip para gatos?",
    "Consejos para adoptar una mascota",
    "¿Cómo registro a mi mascota en Madrid?",
];

export function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        // Scroll lock when chat is open
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // TODO: Connect to OpenAI API here
        // Fallback response for now
        setTimeout(() => {
            const responses: Record<string, string> = {
                "vacunas": "🐕 Las vacunas esenciales para tu perro son:\n\n• **Parvovirus y Moquillo**: A las 6-8 semanas\n• **Hepatitis y Leptospirosis**: A las 8-10 semanas\n• **Rabia**: A partir de los 3 meses (obligatoria)\n\nRecuerda hacer refuerzos anuales. ¡Tu veterinario te ayudará con el calendario!",
                "microchip": "🐱 Según la Ley 7/2023 de Bienestar Animal, el microchip es **obligatorio** para todos los gatos nacidos después del 29 de septiembre de 2023. Para gatos anteriores a esa fecha, tienes hasta septiembre de 2025 para identificarlos.\n\n¡Es un procedimiento rápido e indoloro!",
                "adoptar": "❤️ ¡Qué bonito que quieras adoptar! Aquí algunos consejos:\n\n1. **Reflexiona**: ¿Tienes tiempo, espacio y recursos?\n2. **Visita protectoras**: Conoce a los animales en persona\n3. **Pregunta su historia**: Pueden tener necesidades especiales\n4. **Prepara tu hogar**: Camas, comederos, juguetes...\n5. **Paciencia**: La adaptación puede llevar semanas\n\n¡Adoptar salva vidas!",
                "registro": "📋 Para registrar tu mascota en **Madrid**:\n\n1. Acude a un veterinario para el microchip\n2. El veterinario registrará en RIAC (Registro de Identificación de Animales de Compañía)\n3. Guarda el documento de identificación\n\nEl coste del microchip + registro suele ser 30-50€. ¡Es obligatorio!",
                "default": "¡Interesante pregunta! 🐕 Aunque necesitaría más contexto para darte una respuesta completa, te recomiendo:\n\n• Consultar con un veterinario para temas de salud\n• Revisar la sección de Recursos Legales de MascotaZEN\n• Preguntar en nuestro Foro a la comunidad\n\n¿Hay algo más específico en lo que pueda ayudarte?",
            };

            let responseContent = responses.default;
            const lowerContent = content.toLowerCase();

            if (lowerContent.includes("vacuna")) responseContent = responses.vacunas;
            else if (lowerContent.includes("microchip") || lowerContent.includes("chip"))
                responseContent = responses.microchip;
            else if (lowerContent.includes("adoptar") || lowerContent.includes("adopción"))
                responseContent = responses.adoptar;
            else if (lowerContent.includes("registro") || lowerContent.includes("registrar"))
                responseContent = responses.registro;

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: responseContent,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center text-3xl hover:scale-110 transition-transform ${isOpen ? "hidden" : ""}`}
                aria-label="Abrir asistente virtual"
            >
                🐕
            </button>

            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)] bg-background border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
                    <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 bg-primary-foreground/20">
                                <AvatarFallback className="text-xl">🐕</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold">Toby</h3>
                                <p className="text-xs text-primary-foreground/80">Tu asistente mascotero</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary-foreground/20 transition-colors"
                            aria-label="Cerrar chat"
                        >
                            ✕
                        </button>
                    </div>

                    <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-2 ${message.role === "user"
                                                ? "bg-primary text-primary-foreground rounded-br-md"
                                                : "bg-muted rounded-bl-md"
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                                            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.1s]" />
                                            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    {messages.length === 1 && (
                        <div className="px-4 pb-2">
                            <p className="text-xs text-muted-foreground mb-2">Preguntas frecuentes:</p>
                            <div className="flex flex-wrap gap-2">
                                {quickQuestions.map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => sendMessage(q)}
                                        className="text-xs bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-full transition-colors"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="p-4 border-t">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                sendMessage(input);
                            }}
                            className="flex gap-2"
                        >
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Escribe tu pregunta..."
                                disabled={isTyping}
                                className="flex-1"
                            />
                            <Button type="submit" size="icon" disabled={isTyping || !input.trim()}>
                                ➤
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
