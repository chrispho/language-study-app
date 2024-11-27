import { TranslationServiceClient } from "@google-cloud/translate";
import dotenv from "dotenv";

// Instantiates a client

// console.log(process.env)
process.env.GOOGLE_APPLICATION_CREDENTIALS =
  "/home/alex/Downloads/language-app-441022-95dfc5ef16a8.json";

class _TranslationModel {
  constructor() {
    this.projectId = "language-app-441022";
    this.location = "global";
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
