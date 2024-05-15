

import puppeteer from 'puppeteer';
import Client from '../models/companyDetails.model.js';

export async function scrapeCompanies(url) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'networkidle2' });

        await page.waitForSelector('.fs-6.text-uppercase', { timeout: 60000 });

        page.on('error', error => {
            console.error('Page error:', error);
        });

        const companyDetails = [];

        const companyElements = await page.$$('.col-md-9.col-10.p-2');

        for (const companyElement of companyElements) {
            const nameElement = await companyElement.$('h3 a.fs-6.text-uppercase');
            if (!nameElement) continue;

            const name = await (await nameElement.getProperty('innerText')).jsonValue();
            console.log(name);
            const hrefHandle = await nameElement.getProperty('href');
            const href = await hrefHandle.jsonValue();

            const newPage = await browser.newPage();
            await newPage.goto(href, { waitUntil: 'networkidle2' });

            try {
                const CINMatch = await newPage.$eval('.accordion-body', el => el.textContent.match(/U[0-9A-Z]{20}/));

                const CIN = CINMatch ? CINMatch[0].trim() : '';
                console.log(CIN)
                const PIN = await newPage.evaluate(() => {
                    const pinAnchor = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('PIN Code'));
                    if (!pinAnchor) return null;
                    const rowElement = pinAnchor.closest('div.row');
                    const pinH6 = rowElement.querySelector('div.col-xl-8.col-6 h6');
                    return pinH6 ? pinH6.textContent.trim().match(/\b\d{6}\b/)[0] : null;
                });
                console.log(PIN)

                if (CIN.length === 21 && PIN && PIN.length === 6) {
                    const statusElement = await companyElement.$('h5');
                    const addressElement = await companyElement.$('h6');

                    const status = statusElement ? await (await statusElement.getProperty('innerText')).jsonValue() : '';
                    const address = addressElement ? await (await addressElement.getProperty('innerText')).jsonValue() : '';

                    companyDetails.push({
                        name: name.trim(),
                        CIN,
                        PIN,
                        status: status.trim(),
                        address: address.trim(),
                    });

                    await Client.create({
                        name: name.trim(),
                        CIN,
                        PIN,
                        status: status.trim(),
                        address: address.trim()
                    });

                }
            } catch (error) {
                console.error(`Error processing ${href}: ${error.message}`);
            } finally {
                await newPage.close();
            }
        }

        await browser.close();
        return companyDetails;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to scrape companies');
    }
}

