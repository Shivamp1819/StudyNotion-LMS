````markdown
# 🎓 StudyNotion – Full Stack EdTech Platform

StudyNotion is a **full-stack Learning Management System (LMS)** built with the MERN stack.  
It empowers instructors to create and sell courses, while students can explore, purchase, and learn interactively.  

✨ Deployed with **Render (Backend)** + **Vercel (Frontend)** + **MongoDB Atlas (Database)** + **Cloudinary (Media Storage)** + **Razorpay (Payments)**.

---

## 🚀 Features

### 👩‍🏫 For Instructors
- Create, update, and manage courses
- Upload videos, thumbnails, and resources to **Cloudinary**
- Track student enrollments and course performance

### 👨‍🎓 For Students
- Secure **Signup/Login with OTP verification (SMTP/Gmail/Mailtrap)**
- Explore all available courses
- Purchase courses with **Razorpay Payment Gateway**
- Access purchased courses in a personalized dashboard

### ⚙️ Core Highlights
- JWT-based authentication and authorization
- Scalable REST APIs with Express
- Modern React frontend with Tailwind CSS and Redux
- Cloud media storage and optimized file handling
- Clean developer setup with environment-based configuration

---

## 🛠️ Tech Stack

**Frontend**
- React.js (Create React App)
- Redux Toolkit
- Tailwind CSS
- Razorpay Checkout Integration

**Backend**
- Node.js + Express.js
- MongoDB Atlas (Mongoose ODM)
- Cloudinary SDK
- Nodemailer (SMTP / Gmail / Mailtrap)
- Razorpay SDK

**Deployment**
- Render (Backend)
- Vercel (Frontend)

---

## ⚡ Local Development Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/StudyNotion.git
cd StudyNotion
````

### 2️⃣ Install Dependencies

```bash
# Install frontend
npm install

# Install backend
cd server
npm install
cd ..
```

### 4️⃣ Run Locally

```bash
npm run dev
```

* Frontend → [http://localhost:3000](http://localhost:3000)
* Backend → [http://localhost:4000](http://localhost:4000)

---

## 🌐 Deployment

### Backend – Render

1. Create a **Web Service**
2. Root directory: `/server`
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add all env variables in Render dashboard
6. Deploy → copy the backend URL

### Frontend – Vercel

1. Import repo into Vercel
2. Framework: Create React App
3. Build command: `npm run build`
4. Output directory: `build`
5. Add env variables (`REACT_APP_BASE_URL`, `REACT_APP_RAZORPAY_KEY`)
6. Deploy → get live frontend URL

---

## 📸 Screenshots (optional)

* 🔑 Signup/Login with OTP
* 🏫 Instructor Dashboard
* 📚 Student Dashboard
* 💳 Razorpay Payment Modal

---

## 🧑‍💻 Author

👤 **Shivam Patel**

* 📧 Email: [splkobnrs@gmail.com](mailto:splkobnrs@gmail.com)
* 🔗 LinkedIn: [shivam-patel-mrsp](https://www.linkedin.com/in/shivam-patel-mrsp)
* 💻 GitHub: [Shivamp1819](https://github.com/Shivamp1819)

---