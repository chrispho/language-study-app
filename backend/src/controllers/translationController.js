import ModelFactory from "../models/modelFactory.js"

class TranslationController{
  constructor(){
    ModelFactory.getTranslationModel().then((model) => {
      this.model = model;
    })
  }

  //essentially passes through params to model
  async translate(req, res){
    const translated = await this.model.translate("test");

    const error = false
    if(error){
      res.status(500).json({ error: "some error" })
    }

    res.status(200).json({ tbd: "TODO", tbd2: translated })
    console.log(`translated ${translated}`)
  }
}

// export singleton
export default new TranslationController();