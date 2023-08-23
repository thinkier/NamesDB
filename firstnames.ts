import {Database} from "sqlite";
import fs from "fs/promises";

export async function createFirstnameTable(db: Database) {
    await db.exec(`CREATE TABLE IF NOT EXISTS firstnames
                   (
                       name              TEXT    NOT NULL PRIMARY KEY,
                       occurrence        INTEGER NOT NULL,
                       male_occurrence   INTEGER NOT NULL,
                       female_occurrence INTEGER NOT NULL
                   )`);

    await db.exec(`CREATE INDEX IF NOT EXISTS firstnames_query
        ON firstnames (name ASC, occurrence DESC);`);
    await db.exec(`CREATE INDEX IF NOT EXISTS firstnames_query_male
        ON firstnames (name ASC, male_occurrence DESC);`);
    await db.exec(`CREATE INDEX IF NOT EXISTS firstnames_query_female
        ON firstnames (name ASC, female_occurrence DESC);`);
}

const YEAR = 2022;
const AGE = 69;

export async function populateFirstnameTable(db: Database) {
    for (let year = YEAR - AGE; year <= YEAR; year++) {
        console.log("Processing first names for year", year);
        const f = await fs.open(`./downloads/ssa-babynames/yob${year}.txt`, "r");

        for await (const line of f.readLines()) {
            const [name, gender, count] = line.split(",");

            let male = gender === 'M' ? count : 0
            let female = gender === 'F' ? count : 0;

            await db.run(`INSERT INTO firstnames (name, occurrence, male_occurrence, female_occurrence)
                          VALUES (?, ?, ?, ?)
                          ON CONFLICT DO UPDATE SET occurrence        = occurrence + ?,
                                                    male_occurrence   = male_occurrence + ?,
                                                    female_occurrence = female_occurrence + ?`,
                [name, count, male, female, count, male, female]);
        }

        await f.close();
    }
}
