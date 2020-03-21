const Datastore = require("nedb");
const electron = require("electron");
const isDev = require("electron-is-dev");
const { BrowserWindow, Menu, ipcMain, app } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    minHeight: 800,
    minWidth: 1130,
    width: 1130,
    height: 800,
    backgroundColor: "#FCFCFF",
    fullscreen: false,
    webPreferences: {
      backgroundThrottling: true,
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(`file://${__dirname}/build/index.html`);
  mainWindow.on("closed", () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.webContents.openDevTools();
});

// Database (NeDB)
let userData;
// if(isDev){
//     userData = app.getAppPath('userData') + '/data/graphs.db';
// }
// else{
userData = app.getPath("userData") + "/data/graphs.db";
//userData= path.join(process.resourcesPath, '/data/graphs.db')
// const dbFile = path.join(__dirname, '/appData.db').replace('/app.asar', '');
// }
let db_graphs = new Datastore({ filename: userData, autoload: true });
db_graphs.loadDatabase();

ipcMain.on("addGraph", (event, graph) => {
  db_graphs.insert(graph, function(err, newGraph) {
    if (!err) {
      db_graphs
        .find({})
        .sort({ updatedAt: -1 })
        .exec(function(err, graphs) {
          if (!err) {
            mainWindow.webContents.send("graph:added", graphs, newGraph);
          }
        });
    }
  });
});

ipcMain.on("fetchGraphs", event => {
  db_graphs
    .find({})
    .sort({ updatedAt: -1 })
    .exec(function(err, graphs) {
      if (!err) {
        mainWindow.webContents.send("graphs:fetched", graphs);
      }
    });
});

ipcMain.on("deleteGraph", (event, ID) => {
  db_graphs.remove({ _id: ID }, {}, function(err, numRemoved) {
    if (!err) {
      db_graphs
        .find({})
        .sort({ updatedAt: -1 })
        .exec(function(err, graphs) {
          if (!err) {
            mainWindow.webContents.send("graph:deleted", graphs);
          }
        });
    }
  });
});

// Custom App Menu
const menuTemplate = [
  {
    label: "Quit",
    submenu: [
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  },
];

// Show Developer Tools if running on Dev env
if (isDev) {
  menuTemplate.push({
    label: "Developer",
    submenu: [
      {
        role: "reload"
      },
      {
        label: "Developer Tools",
        accelerator:
          process.platform === "darwin" ? "Command+Alt+I" : "Ctrl+Shift+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
