# Feature: translation page

- calling translation api and placing data on page (5 pts)
- add translation data to storage/flashcards (3 pts)
- restoring translations from flashcards (3 pts)

## Feature descriptions

### Calling translation API and showing data

As a user is typing or upon request, the application will call a translation api and display the translation in another section of the window. The translation language will be decided with the language switching feature.

### Add translation data to storage/flashcards

Once a translation is done, users will have the option to save the data to a remote(temporarily fake/local) database and have it appear in their flashcards.

### Restoring translation from flashcards

Users will be able to restore the text from flashcards in case they want to modify the content of a flashcard while seeing the translation or see what effect changing flashcard contents will have on a translation.

## Mermaid diagram for translation page

```mermaid
sequenceDiagram
actor user
participant application
participant server
  alt calling translation api and showing data 
    user ->> application: translate "hello"
    application ->> server: translate "hello" into spanish (selected language)
    server ->> api: translate "hello" into spanish (selected language)
    api ->> server: "hola"
    server ->> application: "hola"
    application ->> user: display "hola" in the translation box
  else adding translation data to storage/flashcards
    user ->> application: save this to a flashcard
    application ->> server: save "hello -> hola" to a flashcard
    server ->> application: success
    application ->> user: success
  else restoring translation from flashcards
    user ->> application: restore from the "bye -> adios" flashcard
    application ->> user: now on the translate page with "bye" and "adios"
  end
```
