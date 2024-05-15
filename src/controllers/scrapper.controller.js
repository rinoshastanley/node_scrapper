// controllers/scrapeController.js

import axios from 'axios';
import cheerio from 'cheerio';
import { scrapeCompanies as _scrapeCompanies } from '../services/screpper.service.js';

// Controller function to scrape companies
export async function scrapeCompanies(req, res) {
    try {
        const url = 'https://www.companydetails.in/latest-registered-company-mca';
        const companies = await _scrapeCompanies(url);
        res.json({ companies });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
