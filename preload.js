// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const index_file= require ("./renderer")
const {ipcRenderer } = require('electron')





/*********************** Vue INDEX */
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
  let btnConnect= document.getElementById('btnConnect');
  let btn1= document.getElementById('signOut');
  let btnUpload= document.getElementById('upload');
  let btnCreate= document.getElementById('create');
  let btnPartager= document.getElementById('partager');
  let btnSupprimer= document.getElementById('supprimer');

  btnConnect.addEventListener("click",async function(e) {connect(googleUser);}); 
  btn1.addEventListener("click",async function(e) {signOut();}); 
  btnUpload.addEventListener("click",async function(e) {upload();}); 
  btnCreate.addEventListener("click",async function(e) {create();});
  btnPartager.addEventListener("click",async function(e) {partager();});
  btnSupprimer.addEventListener("click",async function(e) {supprimer();});
  
  //Notification 
  let notification = new Notification('my drive App',{
    body: " created by Amir ben mustapha"
  })
  notification.onclick = e => {
    console.log(e);
  }
})

/*********************** Vue CreateFile */
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  //const form =document.querySelector(form);
  //const data =new FormData(form);
  //const nomdoss =data.get('nom');
  
  let btn2= document.getElementById('btnCreate');
  
  btn2.addEventListener("click",async function(e) {
    let nomdoss = document.getElementById('in').value;
    createfile(nomdoss);});

 /* document.querySelector('#submit').addEventListener('click', function() {
    let nomdoss = document.getElementById("in").value;
    createfile(nomdoss);
  })*/

/*  document.querySelector('#submit').addEventListener('click', function() {

    let nomdoss = document.getElementById("in").value;

    const {ipcRenderer} = require('electron')

    // send username to main.js 
    // receive message from main.js
    ipcRenderer.send("chcreate1",["create", nomdoss]);
    ipcRenderer.on("chcreate2",(e,args) =>{
    console.log(args);

    })
    });*/

})

/*********************** Vue UploadFile */
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  let btn3= document.getElementById('uploadFile');

  btn3.addEventListener("click",async function(e) {
   
    let pathfile = document.getElementById('idfile').value;
    let nomfile = document.getElementById('idnomfile').value;

    uploadfile(pathfile,nomfile);});
})


 async function connect(googleUser){
  // ipc connect**
  ipcRenderer.send("funconnect",["connect", googleUser]);
//  ipcRenderer.on("funsupprimer2",(e,args) =>{
   console.log(args);
 // })
 }
  async function createfile(nomdoss){
  // ipc create**
  ipcRenderer.send("chcreate1",["create", nomdoss]);
  ipcRenderer.on("chcreate2",(e,args) =>{
  console.log(args);
  })
  }
  async function signOut(){
    // ipc signout**
    ipcRenderer.send("ch1","Ping");
    ipcRenderer.on("ch2",(e,args) =>{
      console.log(args);
    })
  }
  async function uploadfile(pathfile,nomfile){
    // ipc create**
    ipcRenderer.send("chupload1",["upload",pathfile,nomfile]);
  //  ipcRenderer.on("chupload1",(e,args) =>{
     console.log(args);
   // })
  }
  async function upload(){
    // ipc upload**
    ipcRenderer.send("funupload","upload");
  //  ipcRenderer.on("chupload1",(e,args) =>{
     console.log(args);
   // })
  }
  async function create(){
    // ipc create file**
    ipcRenderer.send("funcreate","create");
  //  ipcRenderer.on("chupload1",(e,args) =>{
     console.log(args);
   // })
  }
  async function partager(){
    // ipc create**
    ipcRenderer.send("funpartager","partager");
  //  ipcRenderer.on("chupload1",(e,args) =>{
     console.log(args);
   // })
  }
  async function supprimer(){
    // ipc create**
    ipcRenderer.send("funsupprimer","supprimer");
  //  ipcRenderer.on("funsupprimer2",(e,args) =>{
     console.log(args);
   // })
  }
