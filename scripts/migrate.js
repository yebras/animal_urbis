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
        rejectUnauthorized: false,
    },
});

async function runMigration() {
    try {
        console.log('Connecting to database...');
        await client.connect();
        console.log('Connected successfully!');

        const migrationFiles = [
            '001_initial_schema.sql',
            '002_storage_and_fixes.sql'
        ];

        for (const file of migrationFiles) {
            console.log(`Running migration: ${file}...`);
            const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', file);
            const sql = fs.readFileSync(sqlPath, 'utf8');
            await client.query(sql);
            console.log(`Migration ${file} completed!`);
        }

        console.log('All migrations completed successfully!');
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
