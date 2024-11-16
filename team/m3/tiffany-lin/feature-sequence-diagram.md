# Feature: Dashboard
- show recent exercises with a progress bar and continue/restart button (3 pts)
- show recently used flashcards (3 pts)
- showcasing trophy progress (3 pts)


## Feature Descriptions

### Show recent exercises with a progress bar and continue/restart button
Once a user logs in, it will display a few recent exercises that the user worked on the previous times that they visited the application. Under the name of each exercise, there will be a progress bar, colored in to visualize how much of the exercise the user has completed. The user can choose to continue an exercise directly from the dashboard. This takes them to the lesson and allows them to complete the exercise from where they left off. 

### Show recently used flashcards
Next to the recent exercises, there will also be recent flashcard decks. This allows the user quick access to the flashcards for an convenient, quick review. 

### Showcasing trophy progress
This will show the trophies that the user is working on and display the progress they have achieved so far with earning those trophies. Users collect more as they spend more time learning without our application. 

### Showing time spent on application for each day of the recent week
This shows the time in minutes/hours that the user has spent learning on our application. They can choose to set a goal for the amount of time they want to allot to practicing each day and this can be used to track it and act as motivation. 

## Mermaid Diagram for Dashboard Features

```mermaid
sequenceDiagram
actor user  
participant application
participant server
  alt displaying recent exercises
    user ->> application: view recent exercises
    application ->> server: fetch recent exercises and progress
    server ->> application: return recent exercises with progress data
    application ->> user: display recent exercises with progress bars
    user ->> application: click "continue" on "Exercise 1"
    application ->> server: fetch "Exercise 1" progress
    server ->> application: return current progress for "Exercise 1"
    application ->> user: display "Exercise 1" from where the user left off
 else displaying trophy progress
    user ->> application: view trophy progress
    application ->> server: fetch trophy progress
    server ->> application: return trophy data
    application ->> user: display trophies and progress bars
else showing time spent for the week
    user ->> application: view time spent for the week
    application ->> server: fetch time data for the past week
    server ->> application: return time spent for each day
    application ->> user: display time spent for each day of the week
  end
```