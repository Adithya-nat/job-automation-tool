const { IncomingWebhook } = require('@slack/webhook');
const { fetchJobsFromJujuAPI } = require("../services/jobAggregatorService");
const logger = require("../utils/logger");
const { processJobs } = require("../utils/jobFilter");

const sendSlackNotification = async (req, res) => {
    try {
        const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
        await webhook.send({
            text: 'Test notification from Job Automation Tool!',
        });
        res.json({ message: 'Notification sent successfully!' });
    } catch (error) {
        logger.error(`Slack notification failed: ${error.message}`);
        res.status(500).json({ error: 'Slack notification failed' });
    }
};


const sendFilteredJobsToSlack = async (req, res) => {
    try {
        const { keywords, location, category, results } = req.body.filters;
        const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

        logger.info(`Received request to send jobs with filters: ${JSON.stringify(req.body.filters)}`);

        // Fetch job listings
        const jujuJobs = await fetchJobsFromJujuAPI(keywords, location, category, results);

        logger.info(`Fetched jobs from Juju API: ${jujuJobs.length}`);

        // Process jobs
        const processedJobs = processJobs(jujuJobs);
        logger.info(`Processed jobs count: ${processedJobs.length}`);

        // Send notifications to Slack
        // if (processedJobs.length === 0) {
        //     await webhook.send({ text: "No jobs found for your filters." });
        //     logger.info("No jobs found. Sent empty notification to Slack.");
        // } else {
        //     for (const job of processedJobs) {
        //         await webhook.send({
        //             text: job.description,
        //         });
        //         logger.info(`Sent job notification to Slack: ${job.title}`);
        //     }
        // }

        // Send processed jobs as server response
        res.json({ jobs: processedJobs });
    } catch (error) {
        logger.error(`Error in processing job notifications: ${error.message}`);
        res.status(500).json({ error: "Failed to process job notifications" });
    }
};


module.exports = { sendSlackNotification, sendFilteredJobsToSlack };
