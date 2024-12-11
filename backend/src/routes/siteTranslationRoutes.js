import express from "express";
import SiteTranslationController from "../controllers/siteTranslationController.js";

class SiteTranslationRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Middleware for logging
    this.router.use((req, res, next) => {
      console.log(`${req.method} ${req.originalUrl}`);
      next();
    });

    // Endpoint for translating the entire site
    this.router.post("/v1/translate-site", async (req, res) => {
      try {
        await SiteTranslationController.translateSite(req, res);
      } catch (error) {
        console.error("Error handling /translate-site request:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new SiteTranslationRoutes().getRouter();
