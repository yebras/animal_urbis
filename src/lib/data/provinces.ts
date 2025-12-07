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
            title: "Registro de Animales de Compañía de Madrid",
            description: "Portal oficial para registrar tu mascota en la Comunidad de Madrid. Obligatorio para todos los perros, gatos y hurones.",
            url: "https://www.comunidad.madrid/servicios/salud/registro-animales-compania",
        },
        {
            id: "mad-2",
            category: "licencias",
            title: "Licencia para Perros Potencialmente Peligrosos",
            description: "Requisitos y trámites para obtener la licencia PPP en Madrid.",
            url: "https://www.comunidad.madrid/servicios/salud/perros-potencialmente-peligrosos",
        },
        {
            id: "mad-3",
            category: "ordenanzas",
            title: "Ordenanza de Protección Animal de Madrid",
            description: "Normativa municipal sobre tenencia de animales en la ciudad de Madrid.",
            url: "https://www.madrid.es/portales/munimadrid/es/Inicio/El-Ayuntamiento/Normativa/",
        },
    ],
    B: [ // Barcelona
        {
            id: "bcn-1",
            category: "registro",
            title: "AIAC - Archivo de Identificación de Animales de Compañía",
            description: "Registro obligatorio de animales de compañía en Cataluña.",
            url: "https://agricultura.gencat.cat/ca/ambits/ramaderia/animals-companyia/",
        },
        {
            id: "bcn-2",
            category: "ordenanzas",
            title: "Ordenanza sobre la protección de animales",
            description: "Regulación municipal de Barcelona sobre bienestar animal.",
            url: "https://ajuntament.barcelona.cat/",
        },
    ],
    V: [ // Valencia
        {
            id: "val-1",
            category: "registro",
            title: "RIVIA - Registro de Identificación de Animales",
            description: "Registro oficial de animales de compañía en la Comunidad Valenciana.",
            url: "https://www.gva.es/es/inicio/procedimientos?id_proc=18490",
        },
    ],
    SE: [ // Sevilla
        {
            id: "sev-1",
            category: "registro",
            title: "RAIA - Registro Andaluz de Identificación Animal",
            description: "Sistema de registro de animales de compañía en Andalucía.",
            url: "https://www.juntadeandalucia.es/",
        },
    ],
};

// Default resources for provinces without specific data
export const defaultLegalResources = [
    {
        id: "default-1",
        category: "registro",
        title: "Registro de animales de compañía",
        description: "Consulta con tu ayuntamiento o comunidad autónoma para registrar a tu mascota.",
        url: "#",
    },
    {
        id: "default-2",
        category: "licencias",
        title: "Licencia para perros potencialmente peligrosos",
        description: "Ley 50/1999 sobre el Régimen Jurídico de la Tenencia de Animales Potencialmente Peligrosos.",
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-1999-24419",
    },
    {
        id: "default-3",
        category: "viajes",
        title: "Pasaporte europeo para mascotas",
        description: "Documentación necesaria para viajar con tu mascota por la UE.",
        url: "https://www.mapa.gob.es/",
    },
];
