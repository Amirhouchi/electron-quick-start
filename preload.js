// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const index_file= require ("./renderer")
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
  document.getElementById("talkTo-ch1").addEventListener("click",() => {
  ipcRenderer.send("ch1","Ping");
  })

  ipcRenderer.on("ch2",(e,args) =>{
    console.log(args);
  })
 //Notification 
  let notification = new Notification('my electron App',{
    body: " created by Amir ben mustapha"
  })
  notification.onclick = e => {
    console.log(e);
  }
})

