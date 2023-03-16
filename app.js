console.log("====================================================");
console.log("         Node.js/Java Communication Module");
console.log("====================================================");
console.log("");

//#region ////////////////// Importing Functions \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const map2num = require('./routes/serverFunctions.js')
//#endregion


//#region ////////////////// Initialize NodeJS-MDPnP server \\\\\\\\\\\\\\\\\\\\\\\\\


var javaServer = require("net").createServer();
const { javaHOST, javaPORT } = require("./public/config/default.js");
var fileData;
var sendS1 = [];
var sendS2 = [];
//#endregion

//#region ////////////////// Initialize NodeJS-WebPage server \\\\\\\\\\\\\\\\\\\\\\\\\
const cors =require('cors');
var expressHT = require("express"),
  appHT = expressHT(),
  httpHT = require("http"),
  socketIOHT = require("socket.io"),
  serverHT,
  ioHT;

var { webHOST, webPORT } = require("./public/config/default.js");
webPORT = process.env.PORT || 3030
//#endregion

//#region /////////////////////////// WEB PAGES \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//#region ////////////////////////// View engine Setup \\\\\\\\\\\\\\\\\\\\\\\\\
const path = require("path");
const indexRouter = require("./routes/index");

appHT.set("views", path.join(__dirname, "views"));
appHT.engine("html", require("ejs").renderFile);
appHT.set("view engine", "html");

appHT.use("/", indexRouter);

//#endregion

//#region //////////////////// Static Files page \\\\\\\\\\\\\\\\\\\\\\\\\

// CORS IS OF UTMOST IMPORTANCE, IT ALLOWS OTHER DEVICES (SUCH AS HOLOLENS) TO RENDER REGULARLY THE DATA
appHT.use(cors({
  origin: "*",
}));
//
appHT.use(expressHT.static("public"));
appHT.use("/css", expressHT.static(__dirname + "/public/css"));
appHT.use("/js", expressHT.static(__dirname + "/public/js"));
appHT.use("/img", expressHT.static(__dirname + "/public/img"));
appHT.use("/config", expressHT.static(__dirname + "/public/config"));


//#endregion //////////////////// Static Files page \\\\\\\\\\\\\\\\\\\\\\\\\

//#endregion

//#region ///////////////////// Data emitter function \\\\\\\\\\\\\\\\\\\\\\\\\\\\
var firstDataListenner = function (data) {
  fileData = data;
  var msg = data.toString();
  var arr = msg.split(":");
  //Add this to buffer data from NIDAQ!:
  if (arr[0] == "S1") { 
    
    if (arr[1] !== undefined && arr[1] !== null) { //Check that tha incoming string is not null or undefined
      sendS1 = sendS1.concat(map2num(arr[1]));
    }

    if (arr[3] !== undefined && arr[3] !== null) { //Check that tha incoming string is not null or undefined
      sendS2 = sendS2.concat(map2num(arr[3]));
    }
    
    if (sendS1.length < 49) { //In order not to overload the client we collect the data and then after 50 samples we send them
    } else {
      
      ioHT.emit("data", "S1:" + sendS1); sendS1 = [];
      
      ioHT.emit("data", "S2:" + sendS2); sendS2 = [];
      
    }
  } else {
    ioHT.emit("data", msg); // If data are not coming from NIDAQ just send them
  }
};

//#endregion

//#region ////////////////// NodeJS-MDPnP server Functions and Initialization\\\\\\\\\\\\\\\\\\\\\\\\\

javaServer.on("listening", function () {
  console.log("Server is listening on " + javaPORT + " for OpenICE Data");
});

javaServer.on("error", function (e) {
  console.log("Server error: " + e.code);
});

javaServer.on("close", function () {
  console.log("Server closed");
  console.log("Java " + clientAddress + " disconnected");
});

javaServer.on("end", function () {
  console.log("Server closed");
});

javaServer.on("connection", function (javaSocket) {
  javaSocket.on("data", firstDataListenner);
});

javaServer.listen(javaPORT, javaHOST);

//#endregion

//#region ////////////////// NodeJS-WebPage server Functions and Initialization\\\\\\\\\\\\\\\\\\\\\\\\\

serverHT = httpHT.Server(appHT);

serverHT.on("listening", function () {
  console.log("Serving address: " + "http://" + webHOST + ":" + webPORT);
});

serverHT.on("error", function (e) {
  console.log("Server error: " + e.code);
});



serverHT.listen(webPORT, webHOST);

ioHT = socketIOHT(serverHT);

//#endregion
