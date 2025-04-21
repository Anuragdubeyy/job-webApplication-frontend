# Job Portal Frontend - MERN Stack

This frontend project is a comprehensive implementation of a Job Portal using **React.js**, **Tailwind CSS**, **ShadCN UI**, and **Redux**. It provides a seamless user interface for Job Seekers and Employers to access and manage the job portal efficiently.

## Features Implemented

### **1. User Authentication System**
- **Role-Based Access Control (RBAC):** Provides login and registration functionality for two roles:
  - **Employer**
  - **Job Seeker**
- **Authentication Flow:**
  - Login and registration are integrated with the backend using JWT for session management.
- **Protected Routes:** Ensure that users can access specific features only when authenticated.

---

### **2. Employer Features**
Employers can manage job postings and track applicants. Features include:

#### Create Job Post
Employers can fill out a form to post new job openings.

#### View All Job Posts
Employers can see a list of all their job postings in a dedicated dashboard.

#### View Applicants
Employers can access a list of applicants for a specific job post, complete with resume links or other relevant details.

#### Update Job Post
Employers can update job details directly from the dashboard.

#### Delete Job Post
Employers can remove job postings from the system.

#### Profile Management
Employers can view and edit their profile details, including contact information and company details.

#### Employer Dashboard
Employers have access to a custom dashboard where they can:
- Manage their job postings.
- Track the number of applicants for each job post.
- Perform actions such as adding, updating, or deleting job posts.

---

### **3. Job Seeker Features**
Job Seekers can browse and apply for jobs with ease. Features include:

#### Browse Jobs with Categories and Pagination
Job Seekers can search for jobs by category or keyword and view paginated results.

#### View Single Job Details
Job Seekers can view detailed job descriptions, requirements, and employer information.

#### Apply for Job Posts
Job Seekers can submit applications for job posts by uploading their resumes and providing relevant details.

#### View Applied Jobs
Job Seekers can track their application status and view the jobs they have applied for.

#### Profile Management
Job Seekers can update their profiles, including skills, education, and experience.

#### Job Seeker Dashboard
Job Seekers have access to a personalized dashboard where they can:
- Track their applied jobs.
- Update their profile for better job matches.
- Access detailed job recommendations.

---

### **4. Additional Functionalities**
#### Responsive Design
The application is fully responsive and works seamlessly across desktops, tablets, and mobile devices.

#### Search and Filtering System
A robust search and filter system allows users to find jobs or applications quickly.

#### Toast Notifications
- Integrated with **Toastify** for displaying real-time feedback messages for actions like job applications, profile updates, or error handling.

#### State Management
- Implemented **Redux** for efficient state management across components, ensuring smooth data handling for both Employer and Job Seeker dashboards.

#### Pagination
All job listing pages support pagination for improved usability and performance.

---

## **Technologies Used**
- **React.js:** JavaScript library for building the user interface.
- **Tailwind CSS:** Utility-first CSS framework for responsive design.
- **ShadCN UI:** For building accessible and customizable UI components.
- **Redux:** For managing global state across the application.
- **Toastify:** For real-time toast notifications.
- **Axios:** For making HTTP requests to the backend API.
- **React Router DOM:** For routing and navigation between pages.
- **React Context API:** For managing authentication state across the app.

---

## **Setup Instructions**

### Clone the repository:
```bash
git clone https://github.com/your-username/job-portal-frontend.git
