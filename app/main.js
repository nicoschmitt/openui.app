// Install

if(require('electron-squirrel-startup')) return;

// App

const electron = require('electron')
const app = electron.app

app.commandLine.appendSwitch('ignore-certificate-errors', 'true');

const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 1200, height: 900})

  var devurl = "http://localhost.nicontoso.eu:8080/?websocket=http://localhost.nicontoso.eu:8080";
  var stagingurl = "http://openui.nicontoso.eu";
  var produrl = "http://openpogoui.nicontoso.eu";
  mainWindow.loadURL(devurl);

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

