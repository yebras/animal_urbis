"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function RegistroPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        const name = formData.get("name") as string;

        if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            setIsLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                    },
                },
            });

            if (error) {
                toast.error(error.message);
            } else {
                toast.success("¡Cuenta creada! Revisa tu email para confirmar.");
                router.push("/login?registered=true");
            }
        } catch (error) {
            toast.error("Error al crear la cuenta");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider: "google" | "github") => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) toast.error(error.message);
        } catch (error) {
            toast.error("Error iniciando sesión social");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 paw-pattern">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 text-4xl">🐾</div>
                    <CardTitle className="text-2xl">Crea tu cuenta</CardTitle>
                    <CardDescription>
                        Únete a Animal Urbis y gestiona todo sobre tus mascotas
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Tu nombre"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="tu@email.com"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Mínimo 8 caracteres"
                                required
                                minLength={8}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Repite tu contraseña"
                                required
                                minLength={8}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="flex items-start gap-2 text-sm">
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                className="mt-1"
                            />
                            <label htmlFor="terms" className="text-muted-foreground">
                                Acepto los{" "}
                                <Link href="/terminos" className="text-primary hover:underline">
                                    términos de servicio
                                </Link>{" "}
                                y la{" "}
                                <Link href="/privacidad" className="text-primary hover:underline">
                                    política de privacidad
                                </Link>
                            </label>
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                                O regístrate con
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" onClick={() => handleSocialLogin("google")} disabled={isLoading}>
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Google
                        </Button>
                        <Button variant="outline" onClick={() => handleSocialLogin("github")} disabled={isLoading}>
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            GitHub
                        </Button>
                    </div>

                    <p className="text-center text-sm text-muted-foreground mt-6">
                        ¿Ya tienes cuenta?{" "}
                        <Link href="/login" className="text-primary hover:underline">
                            Iniciar sesión
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
