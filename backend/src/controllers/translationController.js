import ModelFactory from "../models/modelFactory.js"

class TranslationController{
  constructor(){
    ModelFactory.getTranslationModel().then((model) => {
      this.model = model;
    })
  }

  //essentially passes through params to model
  async translate(req, res){
    const inLang = req.body.inLang;
    const outLang = req.body.outLang;
    const text = req.body.text;
    const result = await this.model.translate(inLang, outLang, text);

    // if error respond with 500
    if(!result.ok){
      res.status(500).json({ error: result.error })
      return;
    }
    // if not send back translated text
    console.log(`translated ${inLang} ${text} ===> ${outLang} ${result.out}`)
    res.status(200).json({ translated: result.out })
  }
}

// export singleton
export default new TranslationController();