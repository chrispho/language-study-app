# Features: profile page

1. User Progress Overview (1 pts)

2. Trophies/Achievements (3pts)

3. Saved Flashcards (3pts)

4. Completed Exercises (3pts)

5. Account Information (1pt)

6. Additional Design Idea (1pt)

### Feature Descriptions

1. ## User Progress Overview (1 pts) ##

Description: Display progress bars or numerical indicators for each language the user is learning. Include metrics like proficiency percentage, total time spent, or levels completed.

Design Idea: Use horizontal progress bars with color coding for different languages. Add a summary section at the top showing cumulative learning stats (e.g., total hours studied, overall progress).

2. ## Trophies/Achievements (3pts) ## 

Description: Showcase awards or achievements earned by users, like streaks, level completions, or special challenges.

Design Idea: Create a grid or carousel of icons with brief descriptions. Include eye-catching graphics (medals, badges) with hover effects that show more details.

3. ## Saved Flashcards (3pts) ## 

Description: A section displaying flashcards that the user has saved for quick access and revision.

Design Idea: Use a compact card layout with options to flip for answers or details. Categorize them by language or type, with an option to filter.

4. ## Completed Exercises (3pts) ## 

Description: List or chart showing exercises the user has finished, including dates and scores.

Design Idea: Present a timeline view or a list with checkmarks for completed tasks. Add icons or small charts to indicate the difficulty level and score.

5. ## Account Information (1pt) ## 

Description: General user data such as profile picture, username, bio, joined date, and learning streaks.

Design Idea: Place this section near the top as a header with a user avatar, followed by user details in a clean, card-like layout.

6. ## Additional Design Ideas (1pt) ##

Navigation Tabs: Implement tabs or buttons to switch between "Progress," "Achievements," "Flashcards," and "Exercises" for easy navigation.



```mermaid
sequenceDiagram
actor user
participant app as application
participant db as IndexedDB

    Note over user,db: Viewing profile page
    user->>app: Accesses Profile page
    app->>db: Request user profile data
    db-->>app: Send profile data (progress, achievements, etc.)
    app-->>user: Display profile overview with progress, achievements, flashcards, and exercises

    Note over user,db: Viewing progress
    user->>app: Switch to "Progress" tab
    app-->>user: Display progress bars for each language with cumulative stats
    user->>app: Click on a specific language
    app->>db: Fetch detailed progress for the language
    db-->>app: Send detailed progress data
    app-->>user: Display detailed progress view

    Note over user,db: Viewing achievements
    user->>app: Switch to "Achievements" tab
    app-->>user: Display trophy grid or carousel
    user->>app: Hover over a trophy
    app-->>user: Show detailed description of the trophy

    Note over user,db: Accessing saved flashcards
    user->>app: Switch to "Flashcards" tab
    app->>db: Fetch saved flashcards
    db-->>app: Send saved flashcards data
    app-->>user: Display flashcards

    Note over user,db: Viewing completed exercises
    user->>app: Switch to "Exercises" tab
    app->>db: Fetch completed exercises
    db-->>app: Send exercise data (dates, scores, difficulty)
    app-->>user: Display completed exercises in a timeline or list view
    user->>app: Click on a specific exercise
    app-->>user: Show detailed score and feedback for the exercise
```