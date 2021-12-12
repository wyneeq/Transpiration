const {ipcRenderer} = require('electron');

console.log("tewwerft");

document.addEventListener("DOMContentLoaded", function(event) { 
    console.log("tiest")

    document.getElementById("img1").addEventListener('load', (e) => {
        ipcRenderer.send('imageLoaded', {x:e.currentTarget.clientWidth, y:e.currentTarget.clientHeight})

        

    })
    document.getElementById("fileUploader").addEventListener('change', (e) => {
        document.getElementById("img1").src = e.target.files[0].path;
        document.getElementById("uploaderDiv").style.display = "none";
        document.getElementById("uploaderDiv2").style.display = "none";
        document.getElementById("uploaderDiv3").style.display = "none";
        document.getElementById("img1").style.display = "block";
    })

    ipcRenderer.on("removeImg", () => {
        console.log("fewfwe")
        document.getElementById("img1").style.display = "none";
        document.getElementById("uploaderDiv").style.display = "block";
        document.getElementById("uploaderDiv2").style.display = "block";
        document.getElementById("uploaderDiv3").style.display = "block";
        document.getElementById("fileUploader").value = "";
    })
    ipcRenderer.on("openHelp", () => {
        document.getElementById("helpOpenButton").click();
    })
});




function showVal(val){
    alert(val)
}