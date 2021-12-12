const { app, BrowserWindow, globalShortcut} = require('electron')
const { ipcMain } = require('electron')
const electronLocalshortcut = require('electron-localshortcut');

var win;
var lastOpacity;

const createWindow = () => {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      frame:false,
      opacity:1,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        preload:'global.js',
      },
      icon:'Transpiration.ico',

    })

    win.loadFile('index.html')

    
}

app.whenReady().then(() => {
    createWindow()

    electronLocalshortcut.register(win, "CommandOrControl+D", () => {
        win.setOpacity(win.getOpacity() + 0.1);
    })

    electronLocalshortcut.register(win, "CommandOrControl+A", () => {
        win.setOpacity(win.getOpacity() - 0.1);
    })

    electronLocalshortcut.register(win, "CommandOrControl+T", () => {
        if(win.getOpacity() > 0){
            lastOpacity = win.getOpacity();
            win.setOpacity(0);
        }
        else
            win.setOpacity(lastOpacity);
    })

    globalShortcut.register("CommandOrControl+L", () => {
        if(win.isAlwaysOnTop()){
            win.setAlwaysOnTop(false);
            win.setMovable(true);
            win.setIgnoreMouseEvents(false);
        }
        else {
            win.setAlwaysOnTop(true, 'screen-saver');
            win.setVisibleOnAllWorkspaces(true);
            win.setFullScreenable(false);
            win.setMovable(false);
            win.setIgnoreMouseEvents(true);
           //win.moveTop();
        }
    })

    electronLocalshortcut.register(win, "CommandOrControl+W", () => {
        app.quit();
    })

    electronLocalshortcut.register(win, "CommandOrControl+C", () => {
        win.center();
    })

    electronLocalshortcut.register(win, "CommandOrControl+Q", () => {
        win.webContents.send("removeImg");
    })

    electronLocalshortcut.register(win, "CommandOrControl+H", () => {
        win.webContents.send("openHelp");
    })

}) 


ipcMain.on('imageLoaded', (event, arg) => {
    console.log(arg)
    win.setSize(arg.x, arg.y);

    win.center()
})
