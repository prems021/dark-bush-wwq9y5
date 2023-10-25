const venom = require("venom-bot");

const http = require("http");
const url = require("url");

let clx;

const server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathname = parsedUrl.pathname;

  if (pathname === "/") {
    response.writeHead(200, { "Content-Type": "application/json" });
    var jsonResponse = {
      message: "Hello, this is the root of the server v81",
      timestamp: new Date(),
    };
    response.end(JSON.stringify(jsonResponse));
  } else if (pathname === "/stop") {
    server.close();
  } else if (pathname === "/init") {
    venom
      .create({
        session: "session-name", //name of session
      })
      .then((createdClient) => {
        //    start(createdClient)
        clx = createdClient;
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end("WhatsApp client initialized.");
      })
      .catch((erro) => {
        console.log(erro);
      });
  } else if (pathname === "/wa_api") {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });

    request.on("end", () => {
      try {
        const requestData = JSON.parse(body);
        const psp = "91" + requestData.target + "@c.us";
        console.log("action", psp);

        clx
          .sendText(psp, requestData.msg)
          .then((result) => {
            console.log("Result: ", result); //return object success
            response.writeHead(200, { "Content-Type": "application/json" });
            const jsonResponse = {
              message: "Message Sent Successfully:",
              success: true,
              timestamp: new Date(),
            };
            response.end(JSON.stringify(jsonResponse));
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro); //return object error
            response.writeHead(200, { "Content-Type": "application/json" });
            const jsonResponse = {
              message: "Failed retry...",
              success: true,
              timestamp: new Date(),
            };
            response.end(JSON.stringify(jsonResponse));
          });
      } catch (err) {
        response.writeHead(500, { "Content-Type": "application/json" });
        const jsonResponse = {
          message: "Error processing user data",
          error: err.message,
          success: false,
          timestamp: new Date(),
        };
        response.end(JSON.stringify(jsonResponse));
      }
    });
  } else if (pathname === "/wa_file") {
    const imagePath = __dirname + "/files/test.pdf";

    clx
      .sendFile(
        "8129511573@c.us",
        "https://www.jquery-az.com/html/images/banana.jpg",
        "test.jpg",
        "See my file in pdf",
      )
      .then((result) => {
        console.log("Result: ", result); //return object success
      })
      .catch((erro) => {
        console.error("Error when sending: ", erro); //return object error
      });
  } else if (pathname === "/s1") {
    clx
      .sendText("918129511573@c.us", "Welcome ...cp")
      .then((result) => {
        console.log("Result: ", result); //return object success
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end("WhatsApp msg initialized.");
      })
      .catch((erro) => {
        console.error("Error when sending: ", erro); //return object error
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end("WhatsApp client failes.");
      });
  }
});
server.listen(9000, function () {
  console.log("Server is listening on port 9000");
});

function start(client) {
  client
    .sendText("918281807950@c.us", "Welcome ...")
    .then((result) => {
      console.log("Result: ", result); //return object success
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end("WhatsApp msg initialized.");
    })
    .catch((erro) => {
      console.error("Error when sending: ", erro); //return object error
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end("WhatsApp client failes.");
    });
}
