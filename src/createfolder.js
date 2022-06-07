// Modules to control application life and create native browser window
const {app, BrowserWindow,ipcMain} = require('electron')
const path = require('path')
const {MainMenu}= require('./mainmenu')

function createWindow () {
  new MainMenu()
  // Create the browser window.
  const CreateWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '../preload.js')
      
    }
    
  })

  // and load the index.html of the app.
  CreateWindow.loadFile('./vue/createfolder.html')

  // Open the DevTools.
   mainWindow.webContents.openDevTools()
}
ipcMain.on("chCreate1",(e,args) =>{
  console.log(args);
  console.log("Amiiiiiiiiiiiiiiir Create");
  e.sender.send("chCreate2", "retour")
})
app.on('browser-window-focus',() =>{
  console.log("app_is_focssed Create");
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//*********************************************************************************************************** */
function getValue() {
    // Sélectionner l'élément input et récupérer sa valeur
    var input = document.getElementById("nom").value;
    // Afficher la valeur
    alert(input);
    console.log(input);
}