"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/", label: "Inicio", icon: "🏠" },
    { href: "/noticias", label: "Noticias", icon: "📰" },
    { href: "/recursos-legales", label: "Recursos Legales", icon: "⚖️" },
    { href: "/mis-mascotas", label: "Mis Mascotas", icon: "🐾" },
    { href: "/foro", label: "Foro", icon: "💬" },
    { href: "/lugares-interes", label: "Lugares de interés", icon: "🗺️" },
];

export function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl">🐕</span>
                        <span className="text-xl font-bold text-primary">Animal Urbis</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                    pathname === item.href
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                            >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Auth Buttons - Desktop */}
                    <div className="hidden md:flex items-center gap-2">
                        <Link href="/login">
                            <Button variant="ghost" size="sm">
                                Iniciar sesión
                            </Button>
                        </Link>
                        <Link href="/registro">
                            <Button size="sm">
                                Registrarse
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                    />
                                </svg>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                            <div className="flex flex-col gap-4 mt-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-2xl">🐕</span>
                                    <span className="text-xl font-bold text-primary">Animal Urbis</span>
                                </div>

                                <nav className="flex flex-col gap-1">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors",
                                                pathname === item.href
                                                    ? "bg-primary text-primary-foreground"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                            )}
                                        >
                                            <span className="text-xl">{item.icon}</span>
                                            <span>{item.label}</span>
                                        </Link>
                                    ))}
                                </nav>

                                <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                                    <Link href="/login" onClick={() => setIsOpen(false)}>
                                        <Button variant="outline" className="w-full">
                                            Iniciar sesión
                                        </Button>
                                    </Link>
                                    <Link href="/registro" onClick={() => setIsOpen(false)}>
                                        <Button className="w-full">
                                            Registrarse
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
