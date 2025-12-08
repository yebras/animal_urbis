"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

// Sample pet data - In production, this would come from Supabase
const samplePets = [
    {
        id: "1",
        name: "Max",
        type: "dog",
        breed: "Labrador Retriever",
        birthDate: "2020-03-15",
        favoriteToy: "Pelota amarilla",
        photoUrl: "",
        notes: "Le encanta nadar y jugar en el parque. Muy sociable con otros perros.",
    },
    {
        id: "2",
        name: "Luna",
        type: "cat",
        breed: "Europeo común",
        birthDate: "2021-07-22",
        favoriteToy: "Ratón de cuerda",
        photoUrl: "",
        notes: "Muy cariñosa. Le gusta dormir al sol junto a la ventana.",
    },
];

export default function MisMascotasPage() {
    const [pets, setPets] = useState(samplePets);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPet, setEditingPet] = useState<typeof samplePets[0] | null>(null);

    // Check if user is logged in - In production, use Supabase Auth
    const isLoggedIn = true; // Demo mode

    if (!isLoggedIn) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-6">🔒</div>
                    <h1 className="text-2xl font-bold mb-4">Acceso restringido</h1>
                    <p className="text-muted-foreground mb-6">
                        Necesitas iniciar sesión para ver y gestionar tus mascotas.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button asChild>
                            <a href="/login">Iniciar sesión</a>
                        </Button>
                        <Button variant="outline" asChild>
                            <a href="/registro">Registrarse</a>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                        🐾 Mis Mascotas
                    </h1>
                    <p className="text-muted-foreground">
                        Gestiona las fichas de tus mascotas en un solo lugar.
                    </p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setEditingPet(null)}>
                            <span className="mr-2">+</span> Añadir mascota
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>
                                {editingPet ? "Editar mascota" : "Nueva mascota"}
                            </DialogTitle>
                            <DialogDescription>
                                {editingPet
                                    ? "Actualiza la información de tu mascota"
                                    : "Añade los datos de tu nueva mascota"}
                            </DialogDescription>
                        </DialogHeader>
                        <PetForm
                            pet={editingPet}
                            onSave={(pet) => {
                                if (editingPet) {
                                    setPets(pets.map((p) => (p.id === pet.id ? pet : p)));
                                } else {
                                    setPets([...pets, { ...pet, id: Date.now().toString() }]);
                                }
                                setIsDialogOpen(false);
                            }}
                            onCancel={() => setIsDialogOpen(false)}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            {/* User Profile Summary */}
            <Card className="mb-8">
                <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                                U
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold">Usuario Demo</h2>
                            <p className="text-muted-foreground">demo@animalurbis.es</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary">{pets.length}</div>
                            <div className="text-sm text-muted-foreground">mascotas</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Pets Grid */}
            {pets.length === 0 ? (
                <Card className="text-center py-16">
                    <CardContent>
                        <div className="text-6xl mb-4">🐕</div>
                        <h3 className="text-xl font-semibold mb-2">
                            ¡Añade tu primera mascota!
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            Crea fichas personalizadas para cada una de tus mascotas con
                            fotos, información y notas especiales.
                        </p>
                        <Button onClick={() => setIsDialogOpen(true)}>
                            <span className="mr-2">+</span> Añadir mascota
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pets.map((pet) => (
                        <PetCard
                            key={pet.id}
                            pet={pet}
                            onEdit={() => {
                                setEditingPet(pet);
                                setIsDialogOpen(true);
                            }}
                            onDelete={() => {
                                if (confirm("¿Estás seguro de que quieres eliminar esta mascota?")) {
                                    setPets(pets.filter((p) => p.id !== pet.id));
                                }
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function PetCard({
    pet,
    onEdit,
    onDelete,
}: {
    pet: typeof samplePets[0];
    onEdit: () => void;
    onDelete: () => void;
}) {
    const age = calculateAge(pet.birthDate);

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Pet Photo */}
            <div className={`aspect-square flex items-center justify-center relative bg-muted`}>
                {pet.photoUrl ? (
                    <img
                        src={pet.photoUrl}
                        alt={pet.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pet-orange-light to-pet-beige flex items-center justify-center">
                        <span className="text-8xl">
                            {pet.type === "dog" ? "🐕" : "🐈"}
                        </span>
                    </div>
                )}
            </div>

            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-xl">{pet.name}</CardTitle>
                        <CardDescription>{pet.breed}</CardDescription>
                    </div>
                    <Badge variant="secondary">
                        {pet.type === "dog" ? "Perro" : "Gato"}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent>
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">🎂 Edad:</span>
                        <span>{age}</span>
                    </div>
                    {pet.favoriteToy && (
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">🎾 Juguete favorito:</span>
                            <span>{pet.favoriteToy}</span>
                        </div>
                    )}
                    {pet.notes && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {pet.notes}
                        </p>
                    )}
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex-1" onClick={onEdit}>
                        Editar
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive" onClick={onDelete}>
                        Eliminar
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function PetForm({
    pet,
    onSave,
    onCancel,
}: {
    pet: typeof samplePets[0] | null;
    onSave: (pet: typeof samplePets[0]) => void;
    onCancel: () => void;
}) {
    const supabase = createClient();
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        id: pet?.id || "",
        name: pet?.name || "",
        type: pet?.type || "dog",
        breed: pet?.breed || "",
        birthDate: pet?.birthDate || "",
        favoriteToy: pet?.favoriteToy || "",
        photoUrl: pet?.photoUrl || "",
        notes: pet?.notes || "",
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            if (!e.target.files || e.target.files.length === 0) {
                throw new Error("Selecciona una imagen");
            }

            const file = e.target.files[0];
            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("pet-photos")
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from("pet-photos")
                .getPublicUrl(filePath);

            setFormData({ ...formData, photoUrl: data.publicUrl });
            toast.success("Foto subida correctamente");
        } catch (error: any) {
            toast.error("Error subiendo imagen: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as typeof samplePets[0]);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Tabs value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="dog">🐕 Perro</TabsTrigger>
                    <TabsTrigger value="cat">🐈 Gato</TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Photo Upload */}
            <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg bg-muted/20">
                {formData.photoUrl ? (
                    <div className="relative w-32 h-32 mb-2">
                        <img
                            src={formData.photoUrl}
                            alt="Previsualización"
                            className="w-full h-full object-cover rounded-full"
                        />
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, photoUrl: "" })}
                            className="absolute top-0 right-0 bg-destructive text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs"
                        >
                            X
                        </button>
                    </div>
                ) : (
                    <div className="w-24 h-24 mb-2 rounded-full bg-muted flex items-center justify-center text-4xl text-muted-foreground">
                        📷
                    </div>
                )}
                <Label htmlFor="photo" className="cursor-pointer">
                    <div className="flex items-center gap-2 text-sm text-primary hover:underline">
                        {uploading ? "Subiendo..." : "Subir foto"}
                    </div>
                    <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={uploading}
                    />
                </Label>
            </div>


            <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nombre de tu mascota"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="breed">Raza</Label>
                <Input
                    id="breed"
                    value={formData.breed}
                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                    placeholder="Ej: Labrador, Siamés..."
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="birthDate">Fecha de nacimiento</Label>
                <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="favoriteToy">Juguete favorito</Label>
                <Input
                    id="favoriteToy"
                    value={formData.favoriteToy}
                    onChange={(e) => setFormData({ ...formData, favoriteToy: e.target.value })}
                    placeholder="Ej: Pelota, ratón de cuerda..."
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="notes">Notas</Label>
                <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Información adicional sobre tu mascota..."
                    rows={3}
                />
            </div>

            <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit" className="flex-1" disabled={uploading}>
                    {pet ? "Guardar cambios" : "Añadir mascota"}
                </Button>
            </div>
        </form>
    );
}

function calculateAge(birthDate: string): string {
    if (!birthDate) return "Desconocida";

    const birth = new Date(birthDate);
    const today = new Date();
    const months = (today.getFullYear() - birth.getFullYear()) * 12 +
        (today.getMonth() - birth.getMonth());

    if (months < 12) {
        return `${months} meses`;
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (remainingMonths === 0) {
        return `${years} año${years > 1 ? "s" : ""}`;
    }

    return `${years} año${years > 1 ? "s" : ""} y ${remainingMonths} mes${remainingMonths > 1 ? "es" : ""}`;
}
