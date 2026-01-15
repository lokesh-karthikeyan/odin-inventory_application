import db from '../db/queries.js';

const indexController = (() => {
  async function homepageGet(req, res) {
    const fighters = await db.getFighters();
    const data     = { title: 'Home', fighters } 
    res.render('index/index', data);
  }

  return {
    homepageGet
  }
})();

export default indexController;
