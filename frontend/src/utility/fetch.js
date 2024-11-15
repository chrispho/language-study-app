export function fetch(endpoint, data) {
  return new Promise((res, rej) => {
    if(data.method === undefined || data.method === "GET"){ 
      switch (endpoint) {
        case "/api/translate":
          setTimeout(() => res({ json: () => ({ translated: `${data.body.inLang} to ${data.body.outLang}: ${data.body.text}` }) }), 1000);
          break;
        default:
          rej("not implemented");
      }
    }else if(data.method === "POST"){
      switch(endpoint){
        case "/api/flashcard/add":
          setTimeout(() => res({ json: () => ({ success: true }) }), 1000);
          break;
        default:
          rej("not implemented")
      }
    }else{
      rej("unknown http method")
    }
  });
}
