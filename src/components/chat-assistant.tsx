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
    "¿Es obligatorio el microchip?",
    "Consejos para adoptar",
    "Ley de Bienestar Animal",
];

const knowledgeBase: Record<string, string> = {
    // Health & Vets
    "vacuna": "🐕 Las vacunas esenciales para tu perro en España son:\n• **Polivalente** (Parvovirus, Moquillo, Hepatitis...): 6-8 semanas y refuerzos.\n• **Rabia**: Obligatoria en casi toda España a partir de los 3 meses.\n• **Leishmaniosis**: Muy recomendable en zonas cálidas.\n\n¡Consulta siempre a tu veterinario!",
    "desparasit": "🪱 Debes desparasitar internamente cada 3 meses y externamente (pipetas/collares) cada mes, especialmente en primavera y verano por las garrapatas y mosquitos.",
    "comida": "🍖 Una buena dieta depende de la edad y raza. Evita siempre: chocolate, uvas, cebolla y ajo, que son tóxicos. ¿Buscas recomendaciones de pienso o dieta BARF?",
    "toxico": "⚠️ Alimentos prohibidos: Chocolate, cafeína, uvas, pasas, alcohol, ajo, cebolla. Si ha ingerido algo sospechoso, ¡ve al veterinario inmediatamente!",

    // Legal
    "microchip": "🐱 El microchip es **obligatorio** para perros, gatos y hurones en toda España. Es la única forma de recuperar a tu animal si se pierde y evitar multas.",
    "ley": "📜 La nueva **Ley de Bienestar Animal (2023)** establece:\n• Prohibición del sacrificio salvo eutanasia médica.\n• Curso obligatorio para tener perro (pendiente de reglamento).\n• Seguro de Responsabilidad Civil obligatorio.\n• Prohibición de dejar al perro solo más de 24h.",
    "seguro": "🛡️ Es obligatorio contratar un Seguro de Responsabilidad Civil para todos los perros, independientemente de su raza.",
    "perro peligroso": "🐕 Los PPP (Perros Potencialmente Peligrosos) requieren licencia, seguro específico y deben ir siempre con bozal y correa de menos de 2 metros en espacios públicos.",
    "ppp": "🐕 Los PPP (Perros Potencialmente Peligrosos) requieren licencia, seguro específico y deben ir siempre con bozal y correa de menos de 2 metros en espacios públicos.",

    // General
    "viajar": "🚗 Para viajar por la UE necesitas el Pasaporte Europeo de Animales de Compañía. Para viajar en tren (Renfe), los perros de hasta 40kg pueden viajar con billete propio.",
    "adoptar": "❤️ Adoptar es un acto de amor. Te recomiendo visitar protectoras locales. Necesitarás firmar un contrato de adopción y comprometerte a cuidarlo y no abandonarlo.",
    "pasear": "🦮 Los perros necesitan al menos 3 paseos al día. Recuerda recoger siempre sus excrementos y llevar una botella de agua con vinagre para limpiar los orines.",

    // Fun/Fallback
    "toby": "¡Ese soy yo! Soy un Golden Retriever virtual programado para ayudarte. 🦴",
    "hola": "¡Hola! ¿Qué tal estás tú y tu peludo amigo?",
    "gracias": "¡De nada! Aquí estoy para lo que necesites. ¡Guau!",
};

export function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Scroll cleanup fix: Ensure overflow is ALWAYS auto when checking unmount or closed
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Mobile safari fix
            document.body.style.position = "fixed";
            document.body.style.width = "100%";
        } else {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
        };
    }, [isOpen]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const getResponse = (query: string): string => {
        id: Date.now().toString(),
            role: "user",
                content,
                timestamp: new Date(),
        };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulated AI delay
    setTimeout(() => {
        const responseContent = getResponse(content);

        const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: responseContent,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
    }, 1000); // Faster response for better UX
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
            <>
                {/* Backdrop for mobile focus */}
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />

                <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full md:w-[380px] h-[80vh] md:h-[600px] bg-background border rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
                    {/* Header */}
                    <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 bg-primary-foreground/20">
                                <AvatarFallback className="text-xl">🐕</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold">Toby</h3>
                                <p className="text-xs text-primary-foreground/80">Tu asistente experto</p>
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

                    {/* Messages Area */}
                    <ScrollArea className="flex-1 p-4 bg-slate-50 dark:bg-slate-900/50" ref={scrollRef}>
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-2 shadow-sm ${message.role === "user"
                                            ? "bg-primary text-primary-foreground rounded-br-md"
                                            : "bg-white dark:bg-slate-800 border rounded-bl-md"
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-slate-800 border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    {/* Quick Questions Chips */}
                    {messages.length === 1 && (
                        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/50 shrink-0 overflow-x-auto">
                            <div className="flex gap-2">
                                {quickQuestions.map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => sendMessage(q)}
                                        className="text-xs bg-white dark:bg-slate-800 border hover:bg-slate-100 whitespace-nowrap px-3 py-1.5 rounded-full transition-colors"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="p-4 border-t bg-background shrink-0">
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
                                placeholder="Pregunta sobre leyes, salud..."
                                disabled={isTyping}
                                className="flex-1"
                                autoFocus
                            />
                            <Button type="submit" size="icon" disabled={isTyping || !input.trim()}>
                                ➤
                            </Button>
                        </form>
                    </div>
                </div>
            </>
        )}
    </>
);
}
