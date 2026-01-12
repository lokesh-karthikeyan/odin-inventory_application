#! usr/bin/env node

import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const SQL = `
CREATE TABLE IF NOT EXISTS planets (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS fighters (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL UNIQUE,
  image_url TEXT,
  planet_id INTEGER REFERENCES planets(id) ON DELETE CASCADE
);

INSERT INTO planets (name)
VALUES
  ('Earth'),
  ('Namek'),
  ('Vegeta');

INSERT INTO fighters (name, image_url, planet_id)
VALUES
  ('Goku', '/images/goku.png', (SELECT id FROM planets WHERE name='Earth')),
  ('Piccolo', '/images/piccolo.png', (SELECT id FROM planets WHERE name='Namek')),
  ('Vegeta', '/images/vegeta.png', (SELECT id FROM planets WHERE name='Vegeta'));
`;

async function main() {
  console.log('Seeding...');
  
  const connectionString = process.argv[2] || process.env.DATABASE_URL;

  if (!connectionString) {
    console.error("Please provide a database connection string as an argument or set DATABASE_URL in .env");
    process.exit(1);
  }

  const client = new Client({ connectionString });

  try {
    await client.connect();
    await client.query(SQL);
    console.log('Done seeding messages table');
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.end();
  }
}

main();
