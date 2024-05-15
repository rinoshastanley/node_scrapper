import { Router } from 'express';
const router = Router();
import { scrapeCompanies } from '../controllers/scrapper.controller.js';

router.get('/scrape', scrapeCompanies);

export default router;
