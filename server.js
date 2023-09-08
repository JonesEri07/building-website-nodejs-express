import express from 'express';
import cookieSession from 'cookie-session';

import indexRoutes from './routes/index.js';

import FeedbackService from './services/FeedbackService.js';
import SpeakerService from './services/SpeakerService.js';

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const app = express();

const PORT = 3000;

app.set('trust proxy', 1); // makes express trust cookies passed through proxy

app.use(cookieSession({
    name: 'session',
    keys: ['Gijw8924kjf', 'ajdf9249898*(8f2j'],
}));

app.set('view engine', 'ejs');

app.set('views', 'views');

app.use(express.static('public'));


// app.use((req, res, next) => {
//     res.locals.someVal = 'test'; // variables available to all routes that use this middleware (right now that would be all routes)
//     next();
// });

app.use(async (req, res, next) => {
    try {
        const names = await speakerService.getNames();
        res.locals.speakerNames = names;
        next();
    } catch (err) {
        next(err);
    }
})

// set during start up and available for whole life cycle
app.locals.siteName = 'CIRE';

app.use('/', indexRoutes({
    feedbackService,
    speakerService
}));

app.use((req, res) => {
    res.status(400).render('404');
});

app.use((error, req, res, next) => {
    res.status(500).render('500');
});

app.listen(PORT, () => {
    
});
