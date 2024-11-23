class _TranslationModel{
  async translate(params_todo){
    return "TODO"
  }
}


// more verbose export singleton
const TranslationModel = new _TranslationModel()

export default TranslationModel;