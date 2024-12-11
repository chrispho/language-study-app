import ModelFactory from "../models/modelFactory.js"

class TranslationController{
  constructor(){
    ModelFactory.getTranslationModel().then((model) => {
      this.translationModel = model;
    })
    ModelFactory.getDatabaseModel("sqlite-translation-history").then((model) => {
      this.historyModel = model;
    })
  }

  //essentially passes through params to model
  async translate(req, res){
    const inLang = req.body.inLang;
    const outLang = req.body.outLang;
    const text = req.body.text;
    const result = await this.translationModel.translate(inLang, outLang, text);

    // if error respond with 500
    if(!result.ok){
      console.log(`error: ${result.error}`)
      res.status(500).json({ error: result.error })
      return;
    }
    // if not send back translated text
    console.log(`translated ${inLang} ${text} ===> ${outLang} ${result.out}`)
    this.historyModel.create({inLang: inLang, outLang: outLang, input: text, output: result.out})
    res.status(200).json({ inLang: inLang, outLang: outLang, input: text, output: result.out })
  }

  async getHistory(req, res){
    const history = await this.historyModel.findAll()
    res.status(200).json(history);
  }
}

// export singleton
export default new TranslationController();