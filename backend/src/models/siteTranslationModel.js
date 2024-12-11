import { TranslationServiceClient } from "@google-cloud/translate";

class _SiteTranslationModel {
  constructor() {
    this.projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    this.location = process.env.GOOGLE_CLOUD_LOCATION || "global"; // default to global

    if (!this.projectId || !this.location) {
      throw new Error("Google Cloud project ID or location not set.");
    }

    this.translationClient = new TranslationServiceClient();
  }

  async translateSite(texts, targetLang) {
    const request = {
      parent: `projects/${this.projectId}/locations/${this.location}`,
      contents: Array.isArray(texts) ? texts : [texts],
      mimeType: "text/plain",
      targetLanguageCode: targetLang,
    };

    try {
      const [response] = await this.translationClient.translateText(request);
      if (!response || !response.translations) {
        throw new Error("Unexpected response from Google API");
      }

      return Array.isArray(texts)
        ? response.translations.map((t) => t.translatedText)
        : response.translations[0].translatedText;
    } catch (err) {
      console.error("Translation error:", err.message);
      throw new Error(`Error during translation: ${err.details || err.message}`);
    }
  }
}
const SiteTranslationModel = new _SiteTranslationModel();

export default SiteTranslationModel;
