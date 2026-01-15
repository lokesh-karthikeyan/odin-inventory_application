import pool from './pool.js';

const db = (() => {
  async function getFighters() {
    const query    = 'SELECT * FROM fighters';
    const { rows } = await pool.query(query);
    return rows;
  }

  async function getPlanets() {
    const query    = 'SELECT * FROM planets';
    const { rows } = await pool.query(query);
    return rows;
  }

  async function getFightersWithPlanets() {
    const query    = `
      SELECT fighter.id, fighter.name, fighter.image_url, planet.name AS planet_name
      FROM fighters fighter
      JOIN planets planet ON fighter.planet_id = planet.id;
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  async function addPlanet({ name }) {
    const query = {
      text: 'INSERT INTO planets (name) VALUES ($1)',
      values: [name]
    }
    await pool.query(query);
  }

  async function addFighter({ name, image_url, planet_id }) {
    const query = {
      text: 'INSERT INTO fighters (name, image_url, planet_id) VALUES ($1, $2, $3)',
      values: [name, image_url, planet_id]
    }
    await pool.query(query); 
  }

  async function deletePlanet({ id }) {
    const query = {
      text: 'DELETE FROM planets WHERE id = $1',
      values: [id]
    }
    await pool.query(query);
  }

  async function removeFighter({ id }) {
    const query = {
      text: 'DELETE FROM fighters WHERE id = $1',
      values: [id]
    }
    await pool.query(query);
  }
  
  return {
    getFighters,
    getPlanets,
    getFightersWithPlanets,
    addPlanet,
    addFighter,
    deletePlanet,
    removeFighter
  }
})();

export default db;
