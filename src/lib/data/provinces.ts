// Spanish provinces data
export const provinces = [
    { code: "A", name: "Alicante", community: "Comunidad Valenciana" },
    { code: "AB", name: "Albacete", community: "Castilla-La Mancha" },
    { code: "AL", name: "Almería", community: "Andalucía" },
    { code: "AV", name: "Ávila", community: "Castilla y León" },
    { code: "B", name: "Barcelona", community: "Cataluña" },
    { code: "BA", name: "Badajoz", community: "Extremadura" },
    { code: "BI", name: "Vizcaya", community: "País Vasco" },
    { code: "BU", name: "Burgos", community: "Castilla y León" },
    { code: "C", name: "A Coruña", community: "Galicia" },
    { code: "CA", name: "Cádiz", community: "Andalucía" },
    { code: "CC", name: "Cáceres", community: "Extremadura" },
    { code: "CE", name: "Ceuta", community: "Ceuta" },
    { code: "CO", name: "Córdoba", community: "Andalucía" },
    { code: "CR", name: "Ciudad Real", community: "Castilla-La Mancha" },
    { code: "CS", name: "Castellón", community: "Comunidad Valenciana" },
    { code: "CU", name: "Cuenca", community: "Castilla-La Mancha" },
    { code: "GC", name: "Las Palmas", community: "Canarias" },
    { code: "GI", name: "Girona", community: "Cataluña" },
    { code: "GR", name: "Granada", community: "Andalucía" },
    { code: "GU", name: "Guadalajara", community: "Castilla-La Mancha" },
    { code: "H", name: "Huelva", community: "Andalucía" },
    { code: "HU", name: "Huesca", community: "Aragón" },
    { code: "J", name: "Jaén", community: "Andalucía" },
    { code: "L", name: "Lleida", community: "Cataluña" },
    { code: "LE", name: "León", community: "Castilla y León" },
    { code: "LO", name: "La Rioja", community: "La Rioja" },
    { code: "LU", name: "Lugo", community: "Galicia" },
    { code: "M", name: "Madrid", community: "Comunidad de Madrid" },
    { code: "MA", name: "Málaga", community: "Andalucía" },
    { code: "ML", name: "Melilla", community: "Melilla" },
    { code: "MU", name: "Murcia", community: "Región de Murcia" },
    { code: "NA", name: "Navarra", community: "Navarra" },
    { code: "O", name: "Asturias", community: "Principado de Asturias" },
    { code: "OR", name: "Ourense", community: "Galicia" },
    { code: "P", name: "Palencia", community: "Castilla y León" },
    { code: "PM", name: "Islas Baleares", community: "Islas Baleares" },
    { code: "PO", name: "Pontevedra", community: "Galicia" },
    { code: "S", name: "Cantabria", community: "Cantabria" },
    { code: "SA", name: "Salamanca", community: "Castilla y León" },
    { code: "SE", name: "Sevilla", community: "Andalucía" },
    { code: "SG", name: "Segovia", community: "Castilla y León" },
    { code: "SO", name: "Soria", community: "Castilla y León" },
    { code: "SS", name: "Guipúzcoa", community: "País Vasco" },
    { code: "T", name: "Tarragona", community: "Cataluña" },
    { code: "TE", name: "Teruel", community: "Aragón" },
    { code: "TF", name: "Santa Cruz de Tenerife", community: "Canarias" },
    { code: "TO", name: "Toledo", community: "Castilla-La Mancha" },
    { code: "V", name: "Valencia", community: "Comunidad Valenciana" },
    { code: "VA", name: "Valladolid", community: "Castilla y León" },
    { code: "VI", name: "Álava", community: "País Vasco" },
    { code: "Z", name: "Zaragoza", community: "Aragón" },
    { code: "ZA", name: "Zamora", community: "Castilla y León" },
];

// Legal resource categories
export const legalCategories = [
    { id: "registro", name: "Registro de mascotas", icon: "📋" },
    { id: "licencias", name: "Licencias PPP", icon: "🪪" },
    { id: "ordenanzas", name: "Ordenanzas municipales", icon: "📜" },
    { id: "viajes", name: "Viajes y transporte", icon: "✈️" },
    { id: "tenencia", name: "Tenencia responsable", icon: "🏠" },
    { id: "maltrato", name: "Maltrato animal", icon: "⚠️" },
];

// Sample legal resources per province
export const legalResources: Record<string, Array<{
    id: string;
    category: string;
    title: string;
    description: string;
    url: string;
}>> = {
    M: [ // Madrid
        {
            id: "mad-1",
            category: "registro",
            title: "Registro de Animales de Compañía de Madrid (RIAC)",
            description: "Portal oficial para identificar y registrar tu mascota en la Comunidad de Madrid. Obligatorio por ley.",
            url: "https://www.comunidad.madrid/servicios/salud/proteccion-animal-riac",
        },
        {
            id: "mad-2",
            category: "tenencia",
            title: "Ley 4/2016 de Protección de Animales",
            description: "Texto completo de la Ley 4/2016 de protección de los animales de compañía de la Comunidad de Madrid.",
            url: "https://www.boe.es/buscar/pdf/2016/BOE-A-2016-10450-consolidado.pdf",
        },
        {
            id: "mad-3",
            category: "ordenanzas",
            title: "Ordenanza de Protección Animal Madrid",
            description: "Normativa municipal que regula la tenencia de animales en la ciudad de Madrid (ruidos, correas, limpieza).",
            url: "https://www.madrid.es/UnidadesDescentralizadas/Sostenibilidad/LegalyNormativa/Normativa/Ambiental/OrdProteccionSalubridad1.pdf",
        },
    ],
    B: [ // Barcelona
        {
            id: "bcn-1",
            category: "registro",
            title: "AIAC - Arxiu d'Identificació d'Animals",
            description: "Registro de identificación de animales de compañía del Consejo de Colegios Veterinarios de Cataluña.",
            url: "https://www.aiac.cat/",
        },
        {
            id: "bcn-2",
            category: "ordenanzas",
            title: "Ordenança de Protecció dels Animals",
            description: "Ordenanza sobre la protección, tenencia y venta de animales en Barcelona. Información sobre ADN obligatoria.",
            url: "https://ajuntament.barcelona.cat/benestaranimal/es/ordenanza-sobre-la-proteccion-la-tenencia-y-la-venta-de-animales",
        },
    ],
    V: [ // Valencia
        {
            id: "val-1",
            category: "registro",
            title: "RIVIA - Registro Valenciano",
            description: "Registro Informático Valenciano de Identificación Animal.",
            url: "https://www.rivia.org/",
        },
    ],
    SE: [ // Sevilla
        {
            id: "sev-1",
            category: "registro",
            title: "RAIA - Registro Andaluz",
            description: "Registro Central de Animales de Compañía de Andalucía.",
            url: "https://www.raia.org/",
        },
    ],
};

// Default resources for provinces without specific data
export const defaultLegalResources = [
    {
        id: "default-1",
        category: "tenencia",
        title: "Ley de Bienestar Animal (2023)",
        description: "Ley 7/2023, de 28 de marzo, de protección de los derechos y el bienestar de los animales (Documento Oficial BOE).",
        url: "https://www.boe.es/eli/es/l/2023/03/28/7",
    },
    {
        id: "default-2",
        category: "licencias",
        title: "Regulación Perros Potencialmente Peligrosos",
        description: "Real Decreto 287/2002 sobre el régimen jurídico de animales potencialmente peligrosos (Vigente parcialmente tras Ley 2023).",
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2002-6016",
    },
    {
        id: "default-3",
        category: "viajes",
        title: "Viajar con animales de compañía (MAPA)",
        description: "Información oficial del Ministerio sobre pasaportes y requisitos para viajar dentro y fuera de España.",
        url: "https://www.mapa.gob.es/es/ganaderia/temas/comercio-exterior-ganadero/desplazamiento-animales-compania/",
    },
];
