import { AppControllerComponent } from './components/AppControllerComponent/AppControllerComponent.js';
//import { TranslationFactory } from './services/translationFactory.js';

// Create an instance of AppControllerComponent
const appController = new AppControllerComponent();

// Render the component in the #app container
const appContainer = document.getElementById('app');
appContainer.appendChild(appController.render());

// Services
// const taskRepository = TaskRepositoryFactory.get('remote');
//const translationService = TranslationFactory.get();