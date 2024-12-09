import { ProfileService } from "./profileService.js";

export class ProfileFactory {
  constructor() {
    throw new Error("This is a factory");
  }

  static instance = null;

  static get() {
    if (!ProfileFactory.instance) {
      ProfileFactory.instance = new ProfileService();
      ProfileFactory.instance.addSubscriptions();
    }
    return ProfileFactory.instance;
  }
}
