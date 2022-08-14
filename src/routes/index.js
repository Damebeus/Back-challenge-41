const { Router } = require('express');
// import all routers;
const coinRouter = require('./coin.js');


const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/coin', coinRouter);

module.exports = router;
