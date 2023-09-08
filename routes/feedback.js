import express from 'express';

const router = express.Router();

export default ({ feedbackService }) => {
    router.get('/', async (req, res) => {
        const feedback = await feedbackService.getList();
        return res.render('layout/index', { pageTitle: 'Feedback', template: 'feedback' });
    });
    return router;
}
