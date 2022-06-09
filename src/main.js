/**************************************************** Configuration Google Api  */
const  fs =require('fs');
//const readLine =require('readLine');
const { google } =require ('googleapis');
//const SCOPES = https://www.googleapis.com/auth/drive;
const CLIENT_ID = '586734493477-ok88docf2qsgqnvgoke6ens402813hct.apps.googleusercontent.com'
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN ='1//04AzIU9cUVpD0CgYIARAAGAQSNwF-L9Ir9zot_pj9ciFKF9uKVhPXhi4K0a9OuiLZuQ1igdNM1E6fYGL-wgRyY3a02FTetEW3oEA';
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
)
oauth2Client.setCredentials({refresh_token:REFRESH_TOKEN})
const drive = google.drive({
  version: 'v3',
  auth: oauth2Client
})
/************************************************************** Configuration electron */

// Modules to control application life and create native browser window
const {app, BrowserWindow,ipcMain} = require('electron')
const path = require('path')
const {MainMenu}= require('./mainmenu')
const { dialog } = require('electron')



function createWindow () {  
  new MainMenu()
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '../preload.js'),
      nodeIntegration: true

    }
  })
  
  // and load the index.html of the app.
  mainWindow.loadFile('./vue/index.html')
  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
}
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


/************************************************** IPC & Actions */
ipcMain.on("funconnect",(e,args) =>{
  console.log(args);
  onSignIn(googleUser);
  e.sender.send("funconnect2", "connect2")
})
ipcMain.on("ch1",(e,args) =>{
  console.log(args);
  e.sender.send("ch2", "Pong")
})
ipcMain.on("chcreate1",(e,args) =>{
  console.log(args[1]);
  let nomDossier=args[1];
  create_folder(nomDossier)
 // e.sender.send("chcreate2", "create ok")
})
ipcMain.on("chupload1",(e,args) =>{
  console.log(args);
  
  console.log(args[1]);
  console.log(args[2]);
  let pathfile = args[1];
  let namefile = args[2];
  uploadFile(pathfile,namefile)
 // e.sender.send("chcreate2", "create ok")
})
app.on('browser-window-focus',() =>{
  console.log("app_is_focssed");
})
ipcMain.on("funupload",(e,args) =>{
  uploadFile()
  console.log(args);
 // e.sender.send("funupload2", "upload ok")
})
ipcMain.on("funcreate",(e,args) =>{
  create_folder()
  console.log(args);
 // e.sender.send("funcreate2", "create ok")
})
ipcMain.on("funpartager",(e,args) =>{
  //generatePublicUrl()
  console.log(args);
 // e.sender.send("funpartager2", "partager ok")
})
ipcMain.on("funsupprimer",(e,args) =>{
   //deleteFile();
  console.log(args);
 // e.sender.send("funsupprimer2", "partager ok")
})
/********************************************************* Les functions*/
//publier objet
async function generatePublicUrl() {
  try {
    const fileId = '1PwSdOP6-QhfO_MzbhBTobuDL3ylFu-CU';
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    })

    const result = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink, webContentLink',
    });
    console.log(result.data);
  } catch (error){
    console.log(error.message)
  }
}
//upload file/image
//const filePath = path.join(__dirname, '../media/alistar.png')

async function uploadFile(pathfile,namefile) {
  try {

    const response =await drive.files.create({
      requestBody: {
        name: namefile,
        mimeType: 'image/png'
      },
      media: {
        mimeType: 'image/png',
        body: fs.createReadStream(pathfile)
      }
    })

    console.log(response.data)
  } catch(error){
    console.log(error.message)
  }
}
//creation un dossier :
async function create_folder(nomDossier) {
  var fileMetadata = {
    'name': nomDossier,
    'mimeType': 'application/vnd.google-apps.folder'
  };
  drive.files.create({
    resource: fileMetadata,
    fields: '01'
  }, function (err, file) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      console.log('Folder Id: ', file.id);
    }
  });
}
//Function supprimer un objet de google drive
async function deleteFile() {  
  try {
    const response = await drive.files.delete({
      fileId: '1vAf3esjI8LmZYDukYeAKa6OAZHdqK97h',
    });
    console.log(response.data, response.status);
  } catch (error){
    console.log(error.message);
  }
}
//********************************************************fonctions demo
async function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
