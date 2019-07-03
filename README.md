a temporary repo for issue #7838
https://github.com/Automattic/mongoose/issues/7838

run `npm run start`

- navigate to http://localhost:4200/ it will show a response from express engine (i.e: server.ts) {test:"ok"}

- navigate to /mongoose it suppose to make a connection via mongoose (without srv) and response with {test: mongoose} or {test: "error"}

- navigate to /mongoose-srv to test the connection using srv, it should response with {test: "mongoose-srv"} or {test: "error-srv"}

- to test the connection outside of Angular run `node test-mongoose`
