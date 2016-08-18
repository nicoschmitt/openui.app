(function(){

    const electron = require('electron')
    const BrowserWindow = electron.BrowserWindow
    const Menu = electron.Menu
    const app = electron.app

    module.exports.register = function(urls) {

        let template = [
            {
                label: "File",
                submenu: [{
                    label: 'Exit',
                    role: 'quit'
                }]
            }, {
                label: 'View',
                submenu: [{
                    label: 'Reload',
                    accelerator: 'CmdOrCtrl+R',
                    click: function (item, focusedWindow) {
                        if (focusedWindow) {
                            // on reload, start fresh and close any old
                            // open secondary windows
                            if (focusedWindow.id === 1) {
                                BrowserWindow.getAllWindows().forEach(function (win) {
                                    if (win.id > 1) win.close();
                                })
                            }
                            focusedWindow.reload();
                        }
                    }
                }, {
                    label: 'Open',
                    submenu: [{
                        label: 'Production',
                        click: (item, focusedWindow) => {
                            focusedWindow.loadURL(urls.prod);
                        }
                    }, {
                        label: 'Staging',
                        click: (item, focusedWindow) => {
                            focusedWindow.loadURL(urls.staging);
                        }
                    }, {
                        label: 'Localhost',
                        click: (item, focusedWindow) => {
                            focusedWindow.loadURL(urls.dev);
                        }
                    }]
                }, {
                    label: 'Toggle Developer Tools',
                    accelerator: (function () {
                        if (process.platform === 'darwin') {
                            return 'Alt+Command+I'
                        } else {
                            return 'Ctrl+Shift+I'
                        }
                    })(),
                    click: function (item, focusedWindow) {
                        if (focusedWindow) {
                            focusedWindow.toggleDevTools()
                        }
                    }
                }]
            }, {
                label: 'Help',
                role: 'help',
                submenu: [{
                    label: 'Learn More',
                    click: function () {
                        electron.shell.openExternal('https://github.com/OpenPoGo/OpenPoGoBot')
                    }
                },{
                    label: 'Report Issue',
                    click: function () {
                        electron.shell.openExternal('https://github.com/OpenPoGo/OpenPoGoBot/issues')
                    }
                }]
            }]

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    }

})();