import ModelFactory from "../models/modelFactory.js"

class ExerciseController{
  constructor(){
    ModelFactory.getExerciseModel().then((model) => {
      this.model = model;
    })
  }

  // //essentially passes through params to model
  // async translate(req, res){
  //   const inLang = req.body.inLang;
  //   const outLang = req.body.outLang;
  //   const text = req.body.text;
  //   const translated = await this.model.translate(inLang, outLang, text);

  //   const error = false
  //   if(error){
  //     res.status(500).json({ error: "some error" })
  //   }

  //   console.log(`translated ${inLang} ${text} ===> ${outLang} ${translated}`)
  //   res.status(200).json({ translated: translated })
  // }
}

// export singleton
export default new ExerciseController();