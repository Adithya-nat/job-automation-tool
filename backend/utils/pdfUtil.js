const puppeteer = require('puppeteer');
const fs = require('fs');
const logger = require('./logger');

/**
 * Launch Puppeteer in a way compatible with Render.
 */
const getPuppeteerBrowser = async () => {
    return await puppeteer.launch({
      headless: "new", // Ensure Puppeteer runs headlessly
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process', // Run as a single process
        '--disable-gpu'
      ],
    });
  };

const createResumeHTML = (
    contactInformation,
    summary,
    education,
    professionalExperience,
    skills,
    portfolio,
    certifications,
    professionalReferences
) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 20px;
            color: #333;
        }
        h1 {
            font-size: 24px;
            margin-bottom: 10px;
        }
        .contact-info {
            margin-bottom: 15px;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
        }
        .contact-info span {
            flex: 1;
            margin-right: 10px;
            word-wrap: break-word;
        }
        .section {
            margin-bottom: 10px;
        }
        .section-title {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
            border-bottom: 1px solid #ddd;
        }
        .content-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        .education-item, .experience-item, .skill-item, .certification-item, .reference-item {
            font-size: 12px;
            line-height: 1.4;
        }
        ul {
            margin: 5px 0;
            padding-left: 15px;
            font-size: 12px;
        }
        a {
            font-size: 12px;
            color: #0056b3;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <h1>${contactInformation?.name || 'Name not available'}</h1>
    <div class="contact-info">
        <span>${contactInformation?.phone || 'Phone not available'}</span>
        <span>${contactInformation?.email || 'Email not available'}</span>
        <span>${contactInformation?.LinkedIn || 'LinkedIn not available'}</span>
    </div>

    <div class="section">
        <div class="section-title">Summary</div>
        <p>${summary?.text || 'Summary not available'}</p>
    </div>

    <div class="section">
        <div class="section-title">Education</div>
        <div class="content-grid">
            ${education.map(edu => `
                <div class="education-item">
                    <strong>${edu.institution}</strong> - ${edu.degree} (${edu.graduationYear})
                    <br>GPA: ${edu.GPA || 'Not available'}
                </div>
            `).join('')}
        </div>
    </div>

    <div class="section">
        <div class="section-title">Professional Experience</div>
        <div class="content-grid">
            ${professionalExperience.map(exp => `
                <div class="experience-item">
                    <strong>${exp.position}</strong> at <strong>${exp.company}</strong> (${exp.timePeriod})
                    <ul>
                        ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    </div>

    <div class="section">
        <div class="section-title">Skills</div>
        <div class="content-grid">
            <ul>
                ${skills.map(skill => `<li>${skill.skill}</li>`).join('')}
            </ul>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Portfolio</div>
        <p><a href="${portfolio?.url || '#'}" target="_blank">${portfolio?.url || 'Portfolio not available'}</a></p>
    </div>

    <div class="section">
        <div class="section-title">Certifications</div>
        <ul>
            ${certifications.map(cert => `<li>${cert.certification}</li>`).join('')}
        </ul>
    </div>

    <div class="section">
        <div class="section-title">Professional References</div>
        <ul>
            ${professionalReferences.map(ref => `<li>${ref.reference}</li>`).join('')}
        </ul>
    </div>
</body>
</html>
    `;
};


const generateProfessionalResumePDF = async (resumeJSON) => {
    const { contactInformation, summary, education, professionalExperience, skills, portfolio, certifications, professionalReferences } = resumeJSON;

    const htmlContent = createResumeHTML(contactInformation, summary, education, professionalExperience, skills, portfolio, certifications, professionalReferences);

    fs.writeFileSync('test_resume_html.html', htmlContent);

    const browser = await getPuppeteerBrowser();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: 'A4' });

    fs.writeFileSync('test_resume.pdf', pdfBuffer);
    logger.info("PDF saved for manual inspection.");

    await browser.close();

    return pdfBuffer;
};

module.exports = { generateProfessionalResumePDF, createResumeHTML };
