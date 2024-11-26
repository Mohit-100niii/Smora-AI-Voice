# Samora AI - Full Stack Text-to-Speech Web Application

A full-stack web application that generates speech from text using the **PlayAI Text API**. This project is built with **Next.js**, integrating both frontend and backend functionalities. It uses **TailwindCSS** for styling, **MongoDB** for data storage, and **Clerk** for authentication.

---

## Features
- **Text-to-Speech**: Convert text into speech using the PlayAI Text API.
- **Authentication**: Secure login/signup powered by Clerk.
- **Fully Integrated Backend**: Server-side rendering and API routes managed with Next.js.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Database**: User data and audio files are stored in MongoDB.

---
You can check out the live version of the application here:

### Live Demo - https://smora-ai-voice.vercel.app/


---

## Screenshots

![Homepage](https://github.com/user-attachments/assets/1628bf18-6b43-4492-9e49-02b1f70e4555)
![image](https://github.com/user-attachments/assets/25bca11a-03c4-46c4-b12f-6f4bcfd67e15)

![image](https://github.com/user-attachments/assets/7e4d2e15-7775-45ca-9fc3-f0012ee864c8)

![image](https://github.com/user-attachments/assets/5cbaf6ca-1996-4a0f-ae10-cf67f8b1c057)


---

## Technologies Used

- **Framework**: Next.js
- **Styling**: TailwindCSS
- **Authentication**: Clerk
- **Database**: MongoDB
- **API**: PlayAI Text-to-Speech API

---

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- **MongoDB** - You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB setup.
- **Clerk Account** - Sign up at [Clerk](https://clerk.dev/) to configure authentication.

## Features

### User Authentication:
- Users can sign up, log in, and securely manage their accounts using **Clerk** authentication.

### Text-to-Speech:
- Users can input text and generate audio using **PlayAI's text-to-speech API**.
- Users can listen to the generated audio and download it.

### Audio Storage:
- Users can save the generated audio to their account, which is stored in **Cloudinary** and **MongoDB**.

### Responsive Design:
- The application is fully responsive and optimized for both **desktop** and **mobile devices**.

---

## Deployment

The project is deployed using **Netlify** for the frontend and **Heroku** (or your choice of deployment platform) for the backend.

- **Frontend**: [Netlify Deployment](https://elegant-semifreddo-f9bf5c.netlify.app/)
- **Backend**: Deployment to **Heroku** or your preferred cloud service.
