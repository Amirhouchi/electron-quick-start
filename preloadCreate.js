// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const index_file= require ("./rendererCreate")
const {ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
  
    // ipc **
    document.getElementById('btnCreate').addEventListener("click",() => {
    ipcRenderer.send("chCreate1","allez");
    })
  
    ipcRenderer.on("chCreate2",(e,args) =>{
      console.log(args);
    })
   //Notification 
    let notification = new Notification('my electron App',{
      body: " vou -avez ajouter un Dossier google drive"
    })
    notification.onclick = e => {
      console.log(e);
    }
  })