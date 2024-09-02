<!-- # Social Media React Native App

![Social Media App Banner](https://example.com/banner.png) <!-- Replace with your app's banner image -->

## Overview

This is a fully-featured social media application built using React Native. The app allows users to connect with friends, share updates, follow other users, and engage with the community through likes, comments, and more.

## Features

- **User Authentication**: Sign up, log in, and manage user profiles securely.
- **User Profiles**: Customize profiles with bio, profile picture, and personal information.
- **Timeline**: View posts from people you follow, with the ability to like, comment, and share.
- **Post Creation**: Create text and image posts with various editing options.
- **Search Functionality**: Discover other users, hashtags, and content.
- **Notifications**: Stay updated with real-time notifications for likes, comments, and follows.
- **Direct Messaging**: Send private messages to other users.
- **Group Chats**: Engage in group conversations with multiple users.
- **Push Notifications**: Receive updates even when the app is closed.
- **Dark Mode**: Switch between light and dark themes.

## Technology Stack

- **Frontend**: React Native, Redux
- **Backend**: NestJS
- **Database**: MongoDB
- **Real-time**: Socket.IO for messaging
- **Authentication**: JWT (JSON Web Tokens)
- **Push Notifications**: Firebase Cloud Messaging (FCM)
- **API Integration**: RESTful APIs

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/social-media-react-native-app.git
   cd social-media-react-native-app

   ```

2. **Install dependencies:**

`````bash
npm install

3. **Run the app:**
```bash
npm run android  # for Android
npm run ios      # for iOS

```` -->


# Social Media Backend - NestJS

![Social Media Backend Banner](https://example.com/banner.png) <!-- Replace with your app's banner image -->

## Overview

This repository contains the backend API for a social media application, built using NestJS. The backend handles user authentication, post management, messaging, notifications, and more, providing a robust and scalable foundation for the social media platform.

## Features

- **User Authentication**: Secure authentication using JWT (JSON Web Tokens) with roles and permissions.
- **User Management**: APIs for user registration, profile management, and account settings.
- **Post Management**: Create, read, update, and delete (CRUD) operations for posts, including text, images, and hashtags.
- **Comments and Likes**: Support for commenting on posts and liking/unliking posts.
- **Follow System**: API for following and unfollowing users, including followers/following lists.
- **Real-time Messaging**: Private and group chat functionality using Socket.IO.
- **Notifications**: Real-time notifications for events like new followers, likes, comments, and messages.
- **Search**: Search functionality for users, posts, and hashtags.
- **Role-based Access Control**: Different roles for users, admins, and moderators with specific permissions.
- **RESTful API**: Well-structured and documented RESTful endpoints.

## Technology Stack

- **Framework**: [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **Database**: MongoDB with Mongoose for data modeling.
- **Authentication**: Passport.js with JWT strategy.
- **Real-time**: Socket.IO for real-time messaging and notifications.
- **Caching**: Redis for caching frequently accessed data.
- **Validation**: Class-validator for input validation.
- **Documentation**: Swagger for API documentation.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/social-media-backend.git
   cd social-media-backend

2. **Install dependencies:**
  ```bash
  npm install

3. **Create .env file and replace the value
  DATABASE_URI=your_mongo_db_uri
  JWT_SECRET=your_jwt_secret

4. **Run the application:**
  ```bash
  npm run start:dev


`````
