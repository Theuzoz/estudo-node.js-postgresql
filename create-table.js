import { sql } from './db.js'

sql`
    CREATE TABLE IF NOT EXISTS videos (
        id TEXT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        duration INTEGER NOT NULL
    );
`.then(() => {
    console.log('Tabela criada!')
})