import { Router } from 'express';
import countryStateCityController from '../controllers/countryStateCity.controller';
import mastersController from '../controllers/masters.controller';
import rateLimiter from 'express-rate-limit';
// import authJwt from '../middleware/authJwt';

const limiter = rateLimiter({
    max: 30,
    windowMs: 30 * 60 * 100,
    message: 'Too many restarts. Please wait for a while and try again.'
})
export const MasterRouts = Router();

// ConfigRoutes.get('/get-stakes', limiter, configController.GetStakes);
///api/masters/
MasterRouts.get('/countries', countryStateCityController.getCountry);
MasterRouts.get('/states',countryStateCityController.getState);
MasterRouts.get('/cities', countryStateCityController.getCity);

MasterRouts.get('/area',mastersController.getArea)
MasterRouts.post('/area',mastersController.createArea)
MasterRouts.patch('/area',mastersController.updateArea)
MasterRouts.delete('/area',mastersController.deleteArea)

MasterRouts.get('/galli_mohalla',mastersController.getGalliMohalla)
MasterRouts.post('/galli_mohalla',mastersController.createGalliMohalla)
MasterRouts.patch('/galli_mohalla',mastersController.updateGalliMohalla)
MasterRouts.delete('/galli_mohalla',mastersController.deleteGalliMohalla)

MasterRouts.get('/last_names',mastersController.getLastNames)
MasterRouts.post('/last_names',mastersController.createGalliMohalla)
MasterRouts.patch('/last_names',mastersController.updateGalliMohalla)
MasterRouts.delete('/last_names',mastersController.deleteGalliMohalla)


MasterRouts.get('/membership_type',mastersController.getMembershipType)
MasterRouts.post('/membership_type',mastersController.createMembershipType)
MasterRouts.patch('/membership_type',mastersController.updateMembershipType)
MasterRouts.delete('/membership_type',mastersController.deleteMembershipType)

MasterRouts.get('/address_type',mastersController.getAddressType)
MasterRouts.post('/address_type',mastersController.createAddressType)
MasterRouts.patch('/address_type',mastersController.updateAddressType)
MasterRouts.delete('/address_type',mastersController.deleteAddressType)
