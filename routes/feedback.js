import express from 'express';

const router = express.Router();

export default ({ feedbackService }) => {
    router.get('/', async (req, res) => {
        const feedback = await feedbackService.getList();
        return res.json(feedback);
        // return res.render('pages/feedback');
    });
    return router;
}
