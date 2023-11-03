const router = require('express').Router();

const {getNewArrivals, searchByQueryType} = require('../controllers/filterCtrl')

router.get('/', getNewArrivals)
router.post('/search', searchByQueryType);

module.exports = router;    