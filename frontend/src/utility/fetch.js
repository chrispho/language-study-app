export function fetch(endpoint, data) {
  const mockResponse = {
    ok: true,
    status: 200,
    statusText: "OK",
    json: undefined,
    text: undefined,
  };

  const timeout = 1000;

  return new Promise((res, rej) => {
    setTimeout(() => {
      if (data.method === undefined || data.method === "GET") {
        switch (endpoint) {
          case "/api/translate":
            mockResponse.json = async () => ({
              translated: `${data.body.inLang} to ${data.body.outLang}: ${data.body.text}`,
            });
            break;
          default:
            rej("not implemented");
        }
      } else if (data.method === "POST") {
        switch (endpoint) {
          case "/api/flashcard/add":
            mockResponse.json = async () => ({success: true})
            break;
          default:
            rej("not implemented");
        }
      } else {
        rej("unknown http method");
      }
      res(mockResponse);
    }, timeout);
  });
}
