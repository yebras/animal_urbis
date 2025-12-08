
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { processChat } from "@/app/actions/chat";
import { Paperclip, Loader2 } from "lucide-react";
import { toast } from "sonner";

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
        content: "¡Guau guau! 🐕 ¡Hola! Soy Toby, tu asistente virtual perruno. Estoy alimentado por IA avanzada para leer documentos y buscar en internet. ¿En qué puedo ayudarte hoy?",
        timestamp: new Date(),
    },
];

const quickQuestions = [
    "¿Qué vacunas necesita mi perro?",
    "¿Es obligatorio el microchip?",
    "Consejos para adoptar",
    "Ley de Bienestar Animal",
];

export function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Scroll cleanup fix
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

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type === "application/pdf") {
                setSelectedFile(file);
                toast.success(`Archivo seleccionado: ${file.name}`);
            } else {
                toast.error("Solo se permiten archivos PDF");
                e.target.value = "";
            }
        }
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    // Remove data url prefix (e.g. "data:application/pdf;base64,")
                    const base64 = reader.result.split(",")[1];
                    resolve(base64);
                } else {
                    reject(new Error("Failed to convert file"));
                }
            };
            reader.onerror = error => reject(error);
        });
    };

    const sendMessage = async (content: string) => {
        if (!content.trim() && !selectedFile) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: selectedFile ? `${content} \n[📎 Archivo adjunto: ${selectedFile.name}]` : content,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        const currentFile = selectedFile;
        const currentFileName = selectedFile?.name;

        // Clear file after sending
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";

        try {
            let fileBase64 = undefined;
            if (currentFile) {
                fileBase64 = await convertFileToBase64(currentFile);
            }

            // Convert messages to history format simply
            const history = messages.map(m => ({ role: m.role, content: m.content }));

            const responseText = await processChat(history, content, fileBase64, currentFileName);

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: responseText,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);

        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Hubo un error al procesar tu mensaje.");

            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Lo siento, tuve un problema técnico. ¿Podrías intentarlo de nuevo?",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
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
                                    <p className="text-xs text-primary-foreground/80">
                                        {isTyping ? "Pensando..." : "Tu asistente experto"}
                                    </p>
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
                        <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto" ref={scrollRef}>
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
                                        <div className="bg-white dark:bg-slate-800 border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm flex items-center gap-3">
                                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                            <span className="text-xs text-muted-foreground">Analizando...</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

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

                        {/* File Selection Indicator */}
                        {selectedFile && (
                            <div className="px-4 py-2 bg-muted/50 border-t flex items-center justify-between text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Paperclip className="h-3 w-3" />
                                    {selectedFile.name}
                                </span>
                                <button
                                    onClick={() => {
                                        setSelectedFile(null);
                                        if (fileInputRef.current) fileInputRef.current.value = "";
                                    }}
                                    className="hover:text-destructive"
                                >
                                    ✕
                                </button>
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
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="application/pdf"
                                    onChange={handleFileSelect}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isTyping}
                                    title="Adjuntar PDF"
                                >
                                    <Paperclip className="h-5 w-5 text-muted-foreground" />
                                </Button>

                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Mensaje..."
                                    disabled={isTyping}
                                    className="flex-1"
                                    autoFocus
                                />
                                <Button type="submit" size="icon" disabled={isTyping || (!input.trim() && !selectedFile)}>
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
