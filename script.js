$(document).ready(function(){
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
    })
})
// document.getElementById("#toggleItem").style.display = ""

var audio = document.getElementById("audio")
var addAudioFiles = document.getElementById("addFile")
var rotateImage = document.getElementById("audioImg")
var volume = document.getElementById("volume")
// my default playlist
var defaultPlaylist = [
    "Alan Walker - Fade [NCS Release].mp3",
    "Alan Walker, Sabrina Carpenter & Farruko - On My Way.mp3",
    "Dharia - (Uu Nai Na) Sugar And Brownies.mp3",
    "Faded - Alan Walker.mp3"
]

var i = 0
var files = null

audio.loop
// audio volume
volume.addEventListener('change', () => {
    audio.volume = volume.value / 100
})

// Add audio files dynamically from user
addAudioFiles.onchange = (e) => {
    this.files = e.target.files
    console.log(this.files)
    audio.src = "audio/" + this.files.item(0).name
    var songTitle = document.getElementById("songTitle")
    songTitle.innerText = `Song Title = ${this.files.item(0).name}`

    // for show playlist in DOM
    let list = 0
    while (list < this.files.length) {
        var node = document.createElement("h6")
        var textnode = document.createTextNode(list + 1 + " " + this.files.item(list).name)
        node.appendChild(textnode)
        document.getElementById("showList").appendChild(node)
        list++
    }
}

// default playlist button
var dfPlaylistBtn = document.getElementById("dfPlaylistBtn")
dfPlaylistBtn.addEventListener("click",()=>{
    audio.src = "audio/" + this.defaultPlaylist[0]
    var songTitle = document.getElementById("songTitle")
    songTitle.innerText = `Song Title = ${this.defaultPlaylist[0]}`    
})

// play button
function play() {
    audio.play()
    if(audio.src == ""){
        this.rotateImage.style.animationDuration = "0s"
    }else{
        this.rotateImage.style.animationDuration = "5s"
    }
}
// pause button
function pause() {
    audio.pause()
    this.rotateImage.style.animationDuration = "0s"
}

// next button 
function next() {
    if (files == null) {
        if (i < defaultPlaylist.length - 1) {
            i++
        } else {
            i = 0
        }
        console.log(i)
        audio.src = "audio/" + defaultPlaylist[i]
        audio.play()
        this.rotateImage.style.animationDuration = "5s"
        songTitle.innerText = `Song Title = ${this.defaultPlaylist[i]}`
    } else {
        if (i < files.length - 1) {
            i++
        } else {
            i = 0
        }
        console.log(i)
        audio.src = "audio/" + files.item(i).name
        audio.play()
        this.rotateImage.style.animationDuration = "5s"
        songTitle.innerText = `Song Title = ${this.files.item(i).name}`
    } 
}
// previous button
function prev() {
    if (files == null) {
        if (i > 0) {
            i--
        } else {
            i = defaultPlaylist.length - 1
        }
        console.log(i)
        audio.src = "audio/" + defaultPlaylist[i]
        audio.play()
        this.rotateImage.style.animationDuration = "5s"
        songTitle.innerText = `Song Title = ${this.defaultPlaylist[i]}`
    } else {
        if (i > 0) {
            i--
        } else {
            i = files.length - 1
        }
        console.log(i)
        audio.src = "audio/" + files.item(i).name
        audio.play()
        this.rotateImage.style.animationDuration = "5s"
        songTitle.innerText = `Song Title = ${this.files.item(i).name}`
    }
}

// change audio track position
audio.addEventListener('timeupdate', () => {
    var track = document.getElementById("track")
    var position = audio.currentTime / audio.duration
    track.style.width = position * 100 + "%"
    console.log(position * 100 + "\n" + audio.currentTime + " current time\n" + audio.duration + " duration")
})

// clear playlist
document.getElementById("clearPlaylist").onclick = ()=>{
    files = null
    document.getElementById("showList").innerHTML = null
    songTitle.innerText = "Empty Audio"
}
