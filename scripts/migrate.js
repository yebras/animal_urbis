const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
    user: 'postgres',
    host: 'db.eifhptsrsoetfxqmbbuo.supabase.co',
    database: 'postgres',
    password: 'Econocom2025?',
    port: 5432,
    ssl: {
        rejectUnauthorized: false, // Required for Supabase in some environments
    },
});

async function runMigration() {
    try {
        console.log('Connecting to database...');
        await client.connect();
        console.log('Connected successfully!');

        const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', '001_initial_schema.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Running migration...');
        await client.query(sql);

        console.log('Migration completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    } finally {
        try {
            await client.end();
        } catch (e) { }
    }
}

runMigration();
