import express from 'express';

const router = express.Router();

export default ({ speakerService }) => {
    router.get('/', async (req, res) => {
        const speakers = await speakerService.getList();
        return res.json(speakers);
        // return res.render('pages/speakers', { pageTitle: 'Welcome' });
    });

    router.get('/:shortname', (req, res) => {
        return res.send('hillo');
    });

    router.post('/', (req, res) => {
        console.log('posted');
        return res.send('hi');
    });
    return router;
}
