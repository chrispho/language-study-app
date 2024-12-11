import { TranslationServiceClient } from "@google-cloud/translate";

//This model uses google cloud's ml translation api
class _TranslationModel {
  constructor() { // gcloud boilerplate
    this.projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
    this.location = process.env.GOOGLE_CLOUD_LOCATION;
    this.translationClient = new TranslationServiceClient();
  }

  async translate(inLang, outLang, text) {
    // google cloud will respond with an error if inLang and outLang are the same, but in this case we can just return the input text.
    if(inLang === outLang){
      return {out: text, ok: true}
    }

    // Construct request (more gcloud boilerplate)
    const request = {
      parent: `projects/${this.projectId}/locations/${this.location}`,
      contents: [text],
      mimeType: "text/plain", // mime types: text/plain, text/html
      sourceLanguageCode: inLang,
      targetLanguageCode: outLang,
    };

    // send request to server
    const [response] = await this.translationClient.translateText(request).catch((r) => ([{error: r.details, notOk:true}]));
    console.log(`gcloud responded with ${JSON.stringify(response)}`)

    // if there's an error, pass it back to the controller and the controller will handle it
    if(response.notOk){
      return {error: response.error, ok: false};
    }
    //otherwise just send the translated text
    return {out: response.translations[0].translatedText, ok: true};
  }
}

// more verbose export singleton
const TranslationModel = new _TranslationModel();

export default TranslationModel;
