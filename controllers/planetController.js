import db from '../db/queries.js';
import { matchedData } from 'express-validator';

const planetController = (() => {
  async function indexGet(req, res) {
    const planets = await db.getPlanets();
    const data    = { title: 'Planets', planets } 
    res.render('planets/index', data);
  }

  const createGet = (req, res) => {
    const data = { title: 'Create Planet' }
    res.render('planets/create', data);
  }

  async function createPost(req, res) {
    const { name } = matchedData(req);
    await db.addPlanet({ name });
    res.redirect('/planets');
  }

  async function deletePost(req, res) {
    const { password } = req.body;
    const planetId      = req.params.id;

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(403).json({ message: 'Incorrect password' });
    }

    await db.deletePlanet({ id: planetId });
    res.json({ message: 'Destroyed successfully', redirect_url: '/planets' })
  }

  return {
    indexGet,
    createGet,
    createPost,
    deletePost
  }
})();

export default planetController;
