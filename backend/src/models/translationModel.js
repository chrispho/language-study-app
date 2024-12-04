import { TranslationServiceClient } from "@google-cloud/translate";

class _TranslationModel {
  constructor() {
    this.projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    this.location = process.env.GOOGLE_CLOUD_LOCATION;
    this.translationClient = new TranslationServiceClient();
  }

  async translate(inLang, outLang, text) {
    // Construct request
    const request = {
      parent: `projects/${this.projectId}/locations/${this.location}`,
      contents: [text],
      mimeType: "text/plain", // mime types: text/plain, text/html
      sourceLanguageCode: inLang,
      targetLanguageCode: outLang,
    };

    // Run request
    
    const [response] = await this.translationClient.translateText(request).catch((r) => ([{error: r.details, notOk:true}]));
    console.log(`gcloud responded with ${JSON.stringify(response)}`)

    if(response.notOk){
      return "Error when translating: " + response.error
    }
    return response.translations[0].translatedText;
  }
}

// more verbose export singleton
const TranslationModel = new _TranslationModel();

export default TranslationModel;
