import express from 'express';

const router = express.Router();

export default ({ speakerService }) => {
    router.get('/', async (req, res, next) => {
        try {
            const speakers = await speakerService.getList();
            const allArtwork = await speakerService.getAllArtwork();
            return res.render('layout/index', { pageTitle: 'Speakers', template: 'speakers', speakers, allArtwork });
        } catch (err) {
            return next(err);
        }
    });

    router.get('/:shortname', async (req, res, next) => {
        try {
            const speaker = await speakerService.getSpeaker(req.params.shortname);
            const artwork = await speakerService.getArtworkForSpeaker(req.params.shortname);
            return res.render('layout/index', { pageTitle: 'Speakers', template: 'speaker-details', speaker, artwork });
        } catch (err) {
            return next(err);
        }
    });

    router.post('/', (req, res) => {
        console.log('posted');
        return res.send('hi');
    });
    return router;
}
