# Job Automation Tool

**Job Automation Tool** simplifies the job search process by automating job discovery, resume enhancement, and cover letter generation. This repository contains both the frontend and backend implementations.

---

## Features

### **Frontend**
- **Job Search**: Search for jobs by keyword, location, and category.
- **Resume Enhancement**: Align your resume with job descriptions for better alignment with job requirements.
- **Cover Letter Generator**: Creates personalized cover letters tailored to specific job postings.
- **Responsive Design**: Optimized for all devices, from desktops to mobile phones.

### **Backend**
- **ChatGPT Integration**: Leverages OpenAI's GPT model to enhance resumes and generate professional cover letters.
- **Slack Notifications**: Sends job updates to configured Slack channels.
- **Secure API**: Includes authentication via API keys for secure access.
- **Health Check**: Provides a `/health` endpoint to monitor server status.

---

## Getting Started

### **Prerequisites**
1. **Node.js** (v16+)
2. **MongoDB** (for backend database)
3. Deployment Platforms:
   - **Render** (Backend)
   - **Vercel** (Frontend)

---

## Local Setup

### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/job-automation-tool.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd job-automation-tool/backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=8090
   MONGO_URI=<your-mongodb-connection-string>
   CHATGPT_API_KEY=<your-openai-api-key>
   AUTH_KEY=<your-backend-authentication-key>
   ```
5. Start the backend server:
   ```bash
   npm start
   ```
6. The backend will run on `http://localhost:8090`.

---

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd job-automation-tool/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory:
   ```env
   VITE_BACKEND_URL=<your-backend-endpoint>
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. The frontend will run on `http://localhost:3000`.

---

## Deployment

### **Backend Deployment**
1. Deploy the backend using **Render**.
2. Set the following environment variables in the Render dashboard:
   - `PORT`
   - `MONGO_URI`
   - `CHATGPT_API_KEY`
   - `AUTH_KEY`
3. Verify deployment by accessing the `/health` endpoint on your Render deployment URL.

### **Frontend Deployment**
1. Deploy the frontend using **Vercel** or **GitHub Pages**.
2. Set the following environment variable in the Vercel project settings:
   - `VITE_BACKEND_URL`
3. Ensure the frontend is configured to call the correct backend endpoint.

---

## Contributing

We welcome contributions! Follow these steps to contribute:

1. **Fork** the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add feature: description of your feature"
   ```
4. Push the branch to your fork:
   ```bash
   git push origin feature-name
   ```
5. Open a **Pull Request** to the main repository.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Support

For questions or support, please contact **[your email or GitHub handle]**.

---

## Acknowledgments

Special thanks to the contributors and the open-source community for making this project possible.
