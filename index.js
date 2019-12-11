const Datastore = require('nedb');
const electron = require('electron');
const isDev = require('electron-is-dev');
const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let db_notes;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        // frame: false,
        backgroundColor: '#FCFCFF',
    fullscreen:false,
    
        webPreferences: { 
            backgroundThrottling: true,
        }
    });
    mainWindow.loadURL(`file://${__dirname}/build/index.html`);
    mainWindow.on('closed', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
    mainWindow.webContents.openDevTools();

});

// Database (NeDB)

// var userData = app.getPath('userData');
let db_graphs = new Datastore({ filename: './graphs/graphs.db', timestampData: true });
db_graphs.loadDatabase();

// db.remove({}, { multi: true }, function (err, numRemoved) {

// });
// db_notes = new Datastore({ filename: userData +'/db/notes.db', timestampData: true });
// db_notes.loadDatabase();

let data= {
    root: 1,
    nodes: [{ id: 1, x: 20, y: 200,highlight:false},
        { id: 2, x: 80, y: 100,highlight:false   },
        { id: 3, x: 200, y: 100,highlight:false   },
        { id: 4, x: 320, y: 100,highlight:false  },
        { id: 5, x: 380, y: 200,highlight:false   },
        { id: 6, x: 320, y: 300,highlight:false  },
        { id: 7, x: 200, y: 300,highlight:false  },
        { id: 8, x: 80, y: 300,highlight:false  },
        { id: 9, x: 150, y: 200,highlight:false   },
    ],

    edges: [
        {source:1, target:2, weight:4,highlight:false, tree:false},
        {source:2, target:3, weight:8,highlight:false, tree:false},
        {source:3, target:4, weight:7,highlight:false,tree:false},
        {source:4, target:5, weight:9,highlight:false,tree:false},
        {source:5, target:6, weight:10,highlight:false,tree:false},
        {source:6, target:3, weight:14,highlight:false,tree:false},
        {source:6, target:7, weight:2,highlight:false,tree:false},
        {source:4, target:6, weight:1,highlight:false,tree:false},
        {source:7, target:8, weight:7,highlight:false,tree:false},
        {source:7, target:9, weight:6,highlight:false,tree:false},
        {source:8, target:9, weight:7,highlight:false,tree:false},
        {source:8, target:1, weight:8,highlight:false,tree:false},
        {source:2, target:8, weight:11,highlight:false,tree:false},
        {source:9, target:3, weight:2,highlight:false,tree:false},
    ],
};


// ipcMain.on('addNote', (event, note) => {
    
//     db_notes.insert(note, function (err, newNote) {
//         if (!err) {
//             db_graphs.find({}).sort({ updatedAt: -1 }).exec(function (err, notes) {                
//                 if (!err) {
//                     mainWindow.webContents.send('note:added', notes, newNote);
//                 }
//             });
//         }
//     });
// });

// ipcMain.on('fetchNotes', (event) => {
//     db_notes.find({}).sort({ updatedAt: -1 }).exec(function (err, notes) {
//         if (!err) {
//             mainWindow.webContents.send('fetched:notes', notes);
//         }
//     });
// });

// ipcMain.on('saveNote', (event, note) => {
//     db_notes.update({ _id: note._id }, { $set: { content: note.content } }, {}, function (err, numReplaced) {
//         if (!err) {
//             db_notes.find({}).sort({ updatedAt: -1 }).exec(function (err, notes) {
//                 if (!err) {
//                     mainWindow.webContents.send('note:saved', notes);
//                 }
//             });
//         }
//     });

// });

// ipcMain.on('deleteNote', (event, ID) => {

//     db_notes.remove({ _id: ID }, {}, function (err, numRemoved) {
//         if (!err) {
//             db_notes.find({}).sort({ updatedAt: -1 }).exec(function (err, notes) {
//                 if (!err) {
//                     mainWindow.webContents.send('note:deleted', notes);
//                 }
//             });
//         }
//     });

// });




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

ipcMain.on('saveGraph', (event, graph) => {

    db_graphs.update({ _id: graph._id }, { $set: { content: graph.content } }, {}, function (err, numReplaced) {
        if (!err) {
            db_graphs.find({}).sort({ updatedAt: -1 }).exec(function (err, graphs) {
                if (!err) {
                    mainWindow.webContents.send('graph:saved', graphs);
                }
            });
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