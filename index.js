const Datastore = require('nedb');
const electron = require('electron');
const isDev = require('electron-is-dev');
const {BrowserWindow, Menu, ipcMain, app} = electron;
const path = require("path");

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        // frame: false,
        backgroundColor: '#FCFCFF',
        fullscreen:false,
    // resizable:false,
        webPreferences: { 
            backgroundThrottling: true,
            nodeIntegration: true,
        }
    });
    mainWindow.loadURL(`file://${__dirname}/build/index.html`);
    mainWindow.on('closed', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
    mainWindow.webContents.openDevTools();

});

// Database (NeDB)
let userData;
if(isDev){
    userData = app.getAppPath('userData') + '/data/graphs.db';
}
else{
    userData= app.getPath("userData") + "/data/graphs.db";
}
let db_graphs =  new Datastore({ filename: userData, autoload: true});
db_graphs.loadDatabase();

ipcMain.on('addGraph', (event, graph) => {
    db_graphs.insert(graph, function (err, newGraph) {
        if (!err) {
            db_graphs.find({}).sort({ updatedAt: -1 }).exec(function (err, graphs) {                
                if (!err) {
                    mainWindow.webContents.send('graph:added', graphs, newGraph);
                }
            });
        }
    });
});

ipcMain.on('fetchGraphs', (event) => {
    db_graphs.find({}).sort({ updatedAt: -1 }).exec(function (err, graphs) {
        if (!err) {
            mainWindow.webContents.send('graphs:fetched', graphs);
        }
    });
});


ipcMain.on('deleteGraph', (event, ID) => {

    db_graphs.remove({ _id: ID }, {}, function (err, numRemoved) {
        if (!err) {
            db_graphs.find({}).sort({ updatedAt: -1 }).exec(function (err, graphs) {
                if (!err) {
                    mainWindow.webContents.send('graph:deleted', graphs);
                }
            });
        }
    });

});


// Custom App Menu
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                role: 'resetzoom'
            },
            {
                role: 'zoomin'
            },
            {
                role: 'zoomout'
            },
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen'
            }
        ]
    }
];

// Show Developer Tools if running on Dev env
if (isDev) {
    menuTemplate.push({
        label: 'Developer',
        submenu: [
            {
                role: 'reload'
            },
            {
                label: 'Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}

// Push additional submenu for Mac only
if (process.platform === 'darwin') {
    const name = app.getName()
    menuTemplate.unshift({
        label: name,
        submenu: [
            {
                role: 'about'
            },
            {
                type: 'separator'
            },
            {
                role: 'services',
                submenu: []
            },
            {
                type: 'separator'
            },
            {
                role: 'hide'
            },
            {
                role: 'hideothers'
            },
            {
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                role: 'quit'
            }
        ]
    })
}