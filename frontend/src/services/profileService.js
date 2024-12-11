import { Service } from "./service.js";
import { Events } from "../eventhub/Events.js";

//Please change when new database is created for demo
// Hardcoded userID for demonstration.
const USER_ID = "1";

export class ProfileService extends Service {
  constructor() {
    super();
  }

  addSubscriptions() {
    this.subscribe(Events.LoadUserProfile, () => {
      this.fetchUserProfile();
    });
  }

  async fetchUserProfile() {
    try {
      const userResp = await fetch(`/v1/users/${USER_ID}`);
      if (!userResp.ok) {
        throw new Error(`Error fetching user: ${userResp.status} ${userResp.statusText}`);
      }
      const user = await userResp.json();

      // Convert languageProgress object to array of {language, progress}
      const progress = this.convertLanguageProgressToArray(user.languageProgress);

      // Construct profileData
      const profileData = {
        user,
        achievements: user.achievements || [],
        exercises: user.exercisesCompleted || [],
        flashcards: user.flashcardsSaved || [],
        progress
      };

      this.publish(Events.UserProfileSuccess, profileData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      this.publish(Events.UserProfileFailure, "Failed to load user profile data.");
    }
  }

  // Convert languageProgress object into an array format to match previous logic if necessary
  convertLanguageProgressToArray(languageProgress) {
    // languageProgress is an object like { english: 0, spanish: 0, ... }
    // Convert it to an array of { language, progress }
    if (!languageProgress) return [];
    return Object.keys(languageProgress).map(lang => ({
      language: lang,
      progress: languageProgress[lang]
    }));
  }

}
