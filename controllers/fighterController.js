import db from '../db/queries.js';
import { matchedData } from 'express-validator';

const fighterController = (() => {
  async function indexGet(req, res) {
    const fighters = await db.getFightersWithPlanets();
    const data     = { title: 'Fighters', fighters }
    res.render('fighters/index', data);
  }

  async function createGet(req, res) {
    const planets = await db.getPlanets();
    const data    = { title: 'Create Fighter', planets };
    res.render('fighters/create', data);
  }

  async function createPost(req, res) {
    const planets = await db.getPlanets();
    const data    = { title: 'Create Fighter', planets, errors: req.validationErrors || [] } 

    if (req.validationErrors) {
      return res.status(422).render('fighters/create', data);
    }

    const { name, planet_id } = matchedData(req);
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    await db.addFighter({ name, image_url, planet_id });
    res.redirect('/fighters');
  }

  async function deletePost(req, res) {
    const { password } = req.body;
    const fighterId    = req.params.id;

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(403).json({ message: 'Incorrect password' });
    }
    
    await db.removeFighter({ id: fighterId });
    res.json({ message: 'Fighter removed successfully', redirect_url: '/fighters' });
  }

  return {
    indexGet,
    createGet,
    createPost,
    deletePost
  }
})();

export default fighterController;
