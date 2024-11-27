class _TranslationModel{
  async translate(params_todo){
    return "translated" + params_todo;
  }
}


// more verbose export singleton
const TranslationModel = new _TranslationModel()

export default TranslationModel;