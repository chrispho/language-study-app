# Language Study App
Welcome to the repository for the Language Study App for CS 326: Web Programming. Currently a work-in-progress.

## How to run our app
First, run `npm i` in both the `/backend` and `/frontend` directories.
Then, navigate to the `/backend` directory and run `node src/Server.js`.

Notable things that won't work:
- Translation requires a google cloud service account key, which is not in this repository. Therefore, the translation page and any of its features (such as history or add to flashcard) will not work.

## Repository Structure
The following is the structure of the repository:
- ``team/m2`` - Contains the files for Milestone 2, including ``data.md`` and ``roles.md``.
- ``team/m3`` - Contains the files for Milestone 3, including ``data.md`` and ``roles.md``.
- ``team/reports`` - Contains reports of each team member's commit history.

Code sections:
- ``frontend`` - Contains the frontend part of our application, structured similarly to the tasks-v3 app in class
- ``backend`` - Contains the backend part of our application, structured similarly to the tasks-v5 and authentication apps in class

