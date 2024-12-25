const processJobs = (jobs) => {
    return jobs.map((job) => ({
        title: job.title,
        company: job.company,
        location: job.location,
        link: job.link,
        description: `Job Title: ${job.title}\nCompany: ${job.company}\nLocation: ${job.location}\nLink: ${job.link}`
    }));
};

module.exports = { processJobs };
