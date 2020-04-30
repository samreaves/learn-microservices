import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
    req.session = null;
    res.sendStatus(200)
});

export { router as signOutRouter };