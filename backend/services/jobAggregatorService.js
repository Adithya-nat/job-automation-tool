const axios = require("axios");
const cheerio = require("cheerio");
const logger = require("../utils/logger");
//const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

/**
 * Fetch jobs using Juju's Publisher API
 * @param {string} keyword - Job keyword (e.g., "Architect")
 * @param {string} location - Location to search for jobs (e.g., "California")
 * @param {string} category - Job category (e.g., "construction")
 * @param {number} results - Number of results to fetch
 * @returns {Promise<Array>} - Array of job objects containing title, company, location, and link
 */
const fetchJobsFromJujuAPI = async (keyword, location, category, results) => {
    try {
        const url = `https://www.juju.com/jobs?k=${keyword}&l=${location}&c=${category}&jpp=${results}`;

        logger.info(`Constructed url: ${url}`);
        
        const response = await axios.get(url);
        const html = response.data;

        // Log the full HTML response for debugging
        logger.info("HTML Response for Debugging:", html.substring(0, 1000)); // Log the first 1000 characters

        // Load the HTML into Cheerio
        const $ = cheerio.load(html);

        //Logging for debugging
        logger.info("Fetched HTML selectors using Cheerio.")
        console.log($("li dl.job").html());

        const jobs = [];
        $("li dl.job").each((_, element) => {
            const title = $(element).find("a.joblink_standard").attr("title");
            const link = $(element).find("a.joblink_standard").attr("href");
            const company = $(element).find("dd.company").text().trim();
            const location = $(element).find("dd.company > span").text().trim();

            logger.info(`title - ${title} \n link - ${link} \n company - ${company} \n location - ${location} \n`)
            const test = (title !== null) && (link !== null) && (company !== null) && (location !== null);
            console.log("\n Test" + test);

            if (test) {
                jobs.push({ title, link, company, location });
            }
        });

        logger.info(`Extracted ${jobs.length} jobs from Juju API`);
        return jobs;
    } catch (error) {
        logger.error(`Error fetching jobs from Juju API: ${error.message}`);
        throw new Error("Failed to fetch jobs from Juju API");
    }
};

module.exports = { fetchJobsFromJujuAPI };
