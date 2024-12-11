import SiteTranslationModel from "../models/siteTranslationModel.js";

class SiteTranslationController {
  constructor() {
    this.model = SiteTranslationModel;
  }

  async translateSite(req, res) {
    try {
      const { targetLang, keys } = req.body;
      // Validate input
      if (!targetLang || !keys || !Array.isArray(keys) || keys.some(key => typeof key !== 'string' || !key.trim())) {
        return res.status(400).json({ error: "Invalid request data" });
      }

      // Call the model's translate method
      const translations = await this.model.translate(keys, targetLang);

      // Respond with the translations
      res.status(200).json(translations);
    } catch (err) {
      console.error("Error in site-wide translation:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new SiteTranslationController();
