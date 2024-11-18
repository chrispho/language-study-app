### Feature: Landing Page → Dashboard

- Small feature(2 points): Language Switch Option
- Medium Feature(3 points): Nav-bar/multi ui Header and footer
- Large Feature(5 points): Landing Page

### Feature Descriptions

1. **Language Switch Option (Small Feature, 2 Points)**:
   - **Description**: This feature allows users to easily switch between different languages on the landing page and throughout the application.

2. **Nav-bar/Multi-UI Header and Footer (Medium Feature, 3 Points)**:
   - **Description**: The navigation bar, header, and footer are designed to provide a cohesive UI. The navigation bar allows users to access different sections of the application ,the header provides branding. The footer contains links to important resources, such as privacy policies and terms of service. This multi-UI component ensures that users can navigate the application.

3. **Landing Page Navigation (Large Feature, 5 Points)**:
   - **Description**: The landing page serves as the entry point for users. Once users successfully authenticate, they are directed to the dashboard, which serves as the central hub for accessing key features such as flashcards and exercises. This feature helps in transitioning between different application states. The layout is designed to be user-friendly, with clear calls to action that encourage engagement.

### Mermaind Syntax Flow:
```
sequenceDiagram
    participant User
    participant WebApp

    User->>WebApp: Click "Open Application" Button
    WebApp->>User: Display landing page
    WebApp->>User: Show "Sign Up" Button
    WebApp->>User: Show "Log In" Button

    User->>WebApp: Click "Sign Up" Button
    WebApp->>User: Show sign-up form
    User->>WebApp: Click "Submit" Button (after filling form)
    WebApp->>User: Display confirmation message
    WebApp->>User: Navigate to dashboard

    User->>WebApp: Click "Log In" Button
    WebApp->>User: Show login form
    User->>WebApp: Click "Submit" Button (after filling form)
    WebApp->>User: Display dashboard with key features

    User->>WebApp: Click "Flashcards" Button
    WebApp->>User: Show flashcards section

    User->>WebApp: Click "Language Switch" Button (nav bar or top left corner)
    WebApp->>User: Show available languages
    User->>WebApp: Click desired language Button
    WebApp->>User: Update interface to selected language
```
