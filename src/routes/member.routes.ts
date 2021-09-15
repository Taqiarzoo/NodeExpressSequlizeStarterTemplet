import { Router } from 'express';
import memberController from '../controllers/member.controller';
import rateLimiter from 'express-rate-limit';
// import authJwt from '../middleware/authJwt';

const limiter = rateLimiter({
    max: 30,
    windowMs: 30 * 60 * 100,
    message: 'Too many restarts. Please wait for a while and try again.'
})
export const MemberRouts = Router();



MemberRouts.get('/list',memberController.getMembers)


MemberRouts.get('/',memberController.getMember)
MemberRouts.post('/',memberController.CreateMember)
MemberRouts.patch('/',memberController.UpdateMember)
MemberRouts.delete('/',memberController.deleteMember)