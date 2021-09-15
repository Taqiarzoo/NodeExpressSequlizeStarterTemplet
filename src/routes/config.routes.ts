import { Router } from 'express';
// import configController from '../controllers/config.controller';
import rateLimiter from 'express-rate-limit';
// import authJwt from '../middleware/authJwt';

const limiter = rateLimiter({
    max: 30,
    windowMs: 30 * 60 * 100,
    message: 'Too many restarts. Please wait for a while and try again.'
})
export const ConfigRoutes = Router();

// ConfigRoutes.get('/get-stakes', limiter, configController.GetStakes);

//ConfigRoutes.get('/', limiter, configController.GetConfiguration);//
// ConfigRoutes.patch('/', configController.UpdateConfig);