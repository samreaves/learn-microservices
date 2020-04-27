import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req, res) => {
    res.sendStatus(200);
});

export { router as signInRouter };