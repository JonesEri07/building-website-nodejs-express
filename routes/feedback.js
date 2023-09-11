import express from 'express';
import { check, validationResult } from 'express-validator';

const router = express.Router();

const validations = [
    check('name').trim().isLength({min: 3}).escape().withMessage('A name is required'),
    check('email').trim().isEmail().normalizeEmail().withMessage('An email is required'),
    check('title').trim().isLength({min: 3}).escape().withMessage('A title is required'),
    check('message').trim().isLength({min: 3}).escape().withMessage('A message is required'),
];

export default ({ feedbackService }) => {
    router.get('/', async (req, res) => {
        const feedback = await feedbackService.getList();
        const errors = req.session.feedback?.errors;
        const successMessage = req.session.feedback?.message;
        req.session.feedback = {};
        return res.render('layout/index', { pageTitle: 'Feedback', template: 'feedback', feedback, errors, successMessage });
    });

    router.post('/', validations, async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.session.feedback = {
                    errors: errors.array()
                };
                return res.redirect('/feedback');
            }
            const {name, email, title, message } = req.body;
            await feedbackService.addEntry(name, email, title, message);
            req.session.feedback = {
                message: 'Thank you for your feedback'
            }
            return res.redirect('/feedback');
        } catch (err) {
            return next(err);
        }
    });

    router.post('/api', validations, async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({ errors: errors.array() });
            }
            const {name, email, title, message } = req.body;
            await feedbackService.addEntry(name, email, title, message);
            const feedback = await feedbackService.getList();
            return res.json({ feedback, successMessage: `Thank you ${name} for your feedback!` });

        } catch (err) {
            return next(err);
        }
    })
    return router;
}
