import express from 'express';
import indexRoutes from './routes/index.js';

import FeedbackService from './services/FeedbackService.js';
import SpeakerService from './services/SpeakerService.js';

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const app = express();

const PORT = 3000;

app.set('view engine', 'ejs');

app.set('views', 'views');

app.use(express.static('static'));

app.use(['*'], (req, res, next) => {
    console.log('hi i was used');
    next();
})

app.use('/', indexRoutes({
    feedbackService,
    speakerService
}));


app.listen(PORT, () => {
    
});
