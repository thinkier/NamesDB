import {Database} from "sqlite";
import fs from "fs/promises";

export async function createSurnameTable(db: Database) {
    await db.exec(`CREATE TABLE IF NOT EXISTS surnames
                   (
                       name       TEXT    NOT NULL PRIMARY KEY,
                       occurrence INTEGER NOT NULL
                   )`);

    await db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS surnames_query
        ON surnames (name ASC, occurrence DESC);`);
}

export async function populateSurnameTable(db: Database) {
    const f = await fs.open("./downloads/Names_2010Census.csv", "r");

    for await (const line of f.readLines()) {
        const [name, rank, occurrence] = line.split(",");

        try {
            // Filter out the header / non-surname data
            if (Number.parseInt(rank) <= 0) continue;
        } catch {
            continue;
        }

        await db.run(`INSERT INTO surnames (name, occurrence)
                      VALUES (?, ?)`, [name, occurrence]);
    }

    await f.close();
}
