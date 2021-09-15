import { Router } from 'express';
import familyController from '../controllers/family.controller';
import rateLimiter from 'express-rate-limit';
// import authJwt from '../middleware/authJwt';

const limiter = rateLimiter({
    max: 30,
    windowMs: 30 * 60 * 100,
    message: 'Too many restarts. Please wait for a while and try again.'
})
export const FamilyRouts = Router();

FamilyRouts.get('/',familyController.getFamily)
// FamilyRouts.post('/',familyController.CreateMember)
// FamilyRouts.patch('/',familyController.UpdateMember)
// FamilyRouts.delete('/',familyController.deleteMember)

