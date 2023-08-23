import sqlite3 from 'sqlite3';
import {Database, open} from 'sqlite';
import {createSurnameTable, populateSurnameTable} from "./surnames";
import {createFirstnameTable, populateFirstnameTable} from "./firstnames";

export async function openDb(): Promise<Database> {
    return await open({
        filename: './names.db',
        driver: sqlite3.Database
    });
}

async function main() {
    const db = await openDb();

    await createFirstnameTable(db);
    await populateFirstnameTable(db);

    await createSurnameTable(db);
    await populateSurnameTable(db);

    await db.close();
}

main();
