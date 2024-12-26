import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

const migrationClient = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1,
});

async function syncMigrationsWithDb() {
  try {
    const db = drizzle(migrationClient);

    console.info("⏳ Running migrations...");

    const start = Date.now();

    await migrate(db, {
      migrationsFolder: "./server/db/migrations",
    });

    const end = Date.now();

    console.info(`✅ Migrations completed in ${end - start}ms`);
  } catch (e) {
    console.error("❌ Migration failed");
    console.error(e);
    process.exit(1);
  } finally {
    await migrationClient.end();
  }
}

syncMigrationsWithDb();
