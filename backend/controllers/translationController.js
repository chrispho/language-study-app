class TranslationController{
  constructor(){
    ModelFactory.getTranslationModel().then((model) => {
      this.model = model;
    })
  }

  //essentially passes through params to model
  async translate(req, res){
    const translated = this.model.translate(params_todo);

    const error = false
    if(error){
      res.status(500).json({ error: "some error" })
    }

    return res.status(200).json({ tbd: "TODO" })
  }
}

// export singleton
export default new TranslationController();