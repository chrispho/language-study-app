AUTH ONLY (if you aren't doing auth skip to below)
- see the authentication lecture code, basically copy paste (still proofread though!!!!)
- if we aren't doing google auth then no need for passport/whatever google auth code
- see the lecture for a flowchart of auth
- your router may or may not be different from the ones below (see lecture code again; there is no classes anywhere); I'd add classes if possible, but it's up to you

For anyone doing a feature w/ routes 
- You will be making ~3-4 files: a model(s), controller, and routes
1. the model (under models) will do any backend specific logic. Functions should take in objects/data as params and then do the stuff you need with them (eg translate, store, get, etc)
2. The controller will interface from the router to the model. Its methods should take in req, res parameters and then a) do the actions with the model (eg tell the model to add a flashcard or translate something) and then b) respond with the data/status code (see code for examples)
3. The router simply "attaches" endpoints to the controller. It shouldn't be too bad, as it's just a 1:1 mapping
4. Other tasks: add a function to modelFactory.js for getting your model; add a line in Server.js to use your route

remember to make your classes singleton (see code for examples)