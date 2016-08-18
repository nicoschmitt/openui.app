// Install

if(require('electron-squirrel-startup')) return;

// App

const electron = require('electron')
const app = electron.app

app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

const BrowserWindow = electron.BrowserWindow

let mainWindow

var urls = {
  dev: "http://localhost:8080",
  staging: "http://openui.nicontoso.eu",
  prod: "http://openpogoui.nicontoso.eu"
};
var url = urls.prod;
if (process.argv.indexOf("--local") >= 0) {
  url = urls.dev;
} else if (process.argv.indexOf("--staging") >= 0) {
  url = urls.staging;
}

function createWindow () {
  mainWindow = new BrowserWindow({width: 1200, height: 900})

  mainWindow.loadURL(url);

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

require("./menu.js").register(urls);
