
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load env vars
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Faltan las claves en .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSetup() {
    console.log("🔍 Verificando conexión a Supabase...");

    // Try to insert a dummy document to verify table existence
    const { error } = await supabase.from("documents").select("count", { count: "exact", head: true });

    if (error) {
        if (error.code === "42P01") { // undefined_table
            console.log("❌ La tabla 'documents' NO existe.");
            console.log("⚠️ Necesitas ejecutar el SQL de migración en el panel de Supabase.");
        } else {
            console.error("❌ Error conectando a la BD:", error.message);
        }
    } else {
        console.log("✅ La tabla 'documents' existe y es accesible.");
    }
}

checkSetup();
