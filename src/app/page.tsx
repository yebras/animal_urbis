import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: "📰",
    title: "Noticias Automáticas",
    description: "Las últimas noticias del mundo animal, actualizadas diariamente.",
    href: "/noticias",
  },
  {
    icon: "⚖️",
    title: "Recursos Legales",
    description: "Normativa sobre mascotas por provincia en España.",
    href: "/recursos-legales",
  },
  {
    icon: "🐾",
    title: "Fichas de Mascotas",
    description: "Gestiona la información de tus mascotas en un solo lugar.",
    href: "/mis-mascotas",
  },
  {
    icon: "💬",
    title: "Foro Comunitario",
    description: "Conecta con otros amantes de las mascotas.",
    href: "/foro",
  },
  {
    icon: "🤖",
    title: "Asistente Virtual",
    description: "Un perrito experto listo para ayudarte con cualquier duda.",
    href: "#asistente",
  },
  {
    icon: "🗺️",
    title: "Puntos de Interés",
    description: "Encuentra veterinarios, peluquerías y parques cerca.",
    href: "/lugares-interes",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative paw-pattern py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-pet-orange-light text-pet-orange px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>🐕</span>
              <span>Tu compañero digital para el cuidado de mascotas</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Bienvenido a{" "}
              <span className="text-primary">Animal Urbis</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Animal Urbis te ofrece toda la información y herramientas que necesitas para el cuidado de tus mascotas en tu ciudad
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/registro">
                <Button size="lg" className="w-full sm:w-auto">
                  Unirme
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Acceder
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Todo para tu mascota en un solo lugar
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Animal Urbis te ofrece todas las herramientas que necesitas para
              cuidar y gestionar la información de tus mascotas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Link key={feature.href} href={feature.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-pet-orange-light rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "52", label: "Provincias cubiertas" },
              { value: "24/7", label: "Asistente disponible" },
              { value: "100+", label: "Recursos legales" },
              { value: "∞", label: "Amor por las mascotas" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    ¿Listo para empezar?
                  </h2>
                  <p className="text-primary-foreground/80 max-w-md">
                    Únete a nuestra comunidad de amantes de las mascotas y
                    accede a todas las funcionalidades.
                  </p>
                </div>
                <Link href="/registro">
                  <Button size="lg" variant="secondary" className="whitespace-nowrap">
                    Crear cuenta gratis
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐕</span>
              <span className="text-xl font-bold text-primary">Animal Urbis</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Animal Urbis te ofrece todas las herramientas que necesitas para
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="/privacidad" className="hover:text-foreground transition-colors">
                Privacidad
              </Link>
              <Link href="/terminos" className="hover:text-foreground transition-colors">
                Términos
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
