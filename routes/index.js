import express from 'express';
import speakersRoute from './speakers.js';
import feedbackRoute from './feedback.js';

const router = express.Router();

export default ({ feedbackService, speakerService}) => {
    router.get('/', (req, res) => {
        res.render('pages/index', { pageTitle: 'Welcome' });
    });

    router.use('/speakers', speakersRoute({ speakerService }));
    router.use('/feedback', feedbackRoute({ feedbackService }));

    return router;
}