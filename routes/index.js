import express from 'express';
import speakersRoute from './speakers.js';
import feedbackRoute from './feedback.js';

const router = express.Router();

export default ({ feedbackService, speakerService}) => {
    router.get('/', async (req, res, next) => {
        try {
            const speakers = await speakerService.getList();
            const allArtwork = await speakerService.getAllArtwork();
            res.render('layout/index', { pageTitle: 'Welcome', template: 'index', speakers, allArtwork });
        } catch (err) {
            next(err);
        }
    });

    router.use('/speakers', speakersRoute({ speakerService }));
    router.use('/feedback', feedbackRoute({ feedbackService }));

    return router;
}