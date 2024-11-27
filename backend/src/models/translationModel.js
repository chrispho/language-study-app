class _TranslationModel{
  async translate(inLang, outLang, text){
    return "fdsa";
  }
}

// more verbose export singleton
const TranslationModel = new _TranslationModel()

export default TranslationModel;