# Instawork Takehome
## Introduction and Background

This project was completed as a takehome assignment from Instawork. I needed to implement a simple team-member management application that allows the user to view, edit, add, and delete team members. The project tech-stack required the use of Django for the backend and allowed for flexibility for the frontend. As I am most familiar with React, I created the SPA with Vite and styled up the site with Tailwind CSS.

Unfortunately, I had never used Django prior to working on this project. I had to read up on several articles and watch YouTube tutorial videos on setting up and learning all of the moving parts of this backend framework. Here is a list of resources that I used to keep me up to speed with the requirements of this project:

- https://docs.djangoproject.com/en/5.1/

- https://www.geeksforgeeks.org/how-to-connect-django-with-reactjs/

- https://www.freecodecamp.org/news/models-in-django/

- https://www.youtube.com/watch?v=OJdFj5hPAKs&ab_channel=JohnWatsonRooney

- https://www.youtube.com/watch?v=nGIg40xs9e4&t=103s&ab_channel=TechWithTim

Special thanks to the authors of those resources for making it possible for me to develop this project from start to finish.

## Tech Stack
### Backend

- Django

- Django REST Framework

- SQLite (database)

- Python 3.x

### Frontend

- React

- Vite

- Tailwind CSS

- Axios

- React Router

### Prerequisites

- Python 3.x

- Node.js & npm

- Git

## Installation and Setup
### Backend Setup

1. Navigate to the Django project directory:

`cd backend`

2. Install Python dependencies:

`pip install django djangorestframework django-cors-headers`

3. Run database migrations:

`python manage.py makemigrations python manage.py migrate`

4. Start the Django development server:

`python manage.py runserver`

The backend server will be running at `http://localhost:8000`

### Frontend Setup
1. From the project root directory, install Node dependencies:

`npm install`

2. Start the Vite development server:

`npm run dev`

The frontend application will be running at `http://localhost:5173`

## Usage

1. Open your browser and navigate to `http://localhost:5173`

2. Use the "+" button to add new team members

3. Click on any team member to edit their details

4. Use the delete button in the edit page to remove team members

## API Endpoints

-  `GET /api/team-members/` - List all team members

-  `POST /api/team-members/` - Create a new team member

-  `GET /api/team-members/{id}/` - Retrieve a specific team member

-  `PUT /api/team-members/{id}/` - Update a specific team member

-  `DELETE /api/team-members/{id}/` - Delete a specific team member

## Testing
### Backend Tests

Navigate to the Django project directory and run:

`python manage.py test`

### Frontend Tests

From the project root directory, run:

`npm test`