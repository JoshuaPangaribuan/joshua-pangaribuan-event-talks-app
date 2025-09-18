# Gemini Event Talks App

This project is a simple web application that displays a list of talks for an event. The application is built with a Node.js backend and a plain HTML, CSS, and JavaScript frontend.

## Features

*   Displays a list of talks with details like title, speakers, category, duration, and description.
*   Provides a simple API to fetch the talk data.
*   Serves a static frontend to display the talks.

## Getting Started

To get the application running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/JoshuaPangaribuan/joshua-pangaribuan-event-talks-app.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd joshua-pangaribuan-event-talks-app
    ```

3.  **Start the server:**
    ```bash
    node server.js
    ```

4.  **Open your browser and visit [http://localhost:3002](http://localhost:3002).**

## API

The application exposes the following API endpoint:

*   `GET /api/talks`: Returns a JSON array of all the talks.
