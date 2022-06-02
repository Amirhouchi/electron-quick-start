const {app, BrowserWindow} = require('electron')
class MainMenu {
    constructor(){
        const{Menu}= require('electron')
        let template =[
            {
                label:"File",
                submenu:[
                    {
                    label:"Close",
                    role: "quit"
                }]
            },
            {
                label:"Edit",
                submenu:[{
                    label:"nouveau dossier",
                    click:() => {let window = new BrowserWindow()
                        window.loadFile(`vue/createfolder.html`)}},
                        {
                    label:"nouveau fichier",
                    click:() => {let window = new BrowserWindow()
                       
                        window.loadFile(`vue/uploadfile.html`)}},
                        {
                    label:"Supprimer",
                    click:() => {let window = new BrowserWindow()
                        window.loadFile(`vue/delete.html`)}},
                        {
                    label:"publier",
                    click:() => {let window = new BrowserWindow()
                        window.loadFile(`vue/share.html`)}},
                        ]
                
            },
            {
                label:"Help",
                click:() => {
                    const{shell}=require('electron')
                    shell.openExternal("https://electronjs.org")
                }
            },
            {
                label:"About",
                click:() => {
                    const{dialog}=require('electron')
                    dialog.showMessageBox({
                        type: "info",
                        buttons: ["OK"],
                        title: "About",
                        message: "Hello from About Window"
                    })
                }
            },
        ]
        let menu=Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)
    }

}
module.exports={MainMenu}