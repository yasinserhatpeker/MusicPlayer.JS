const container=document.querySelector(".container");
const image=document.querySelector("#music-image");
const title=document.querySelector("#music-details .title");
const singer=document.querySelector("#music-details .singer");
const prev=document.querySelector("#controls #prev");
const play=document.querySelector("#controls #play");
const next=document.querySelector("#controls #next");
const duration=document.querySelector("#progress #duration");
const currentTime=document.querySelector("#progress #current-time");
const progressBar=document.querySelector("#progress-bar");
const volume=document.querySelector("#volume");
const volumeBar=document.querySelector("#volume-bar");



const player=new MusicPlayer(musicList);

window.addEventListener("load", ()=> {
    let music =player.getMusic();
     displayMusic(music);
    
    });

    function displayMusic(music) {
        title.innerText=music.title;
        singer.innerText=music.singer;
        image.src="img/" + music.img;
        audio.src="mp3/" + music.file;

    }

play.addEventListener("click", ()=> {
    const isMusicPlay= container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
    
});

prev.addEventListener("click", ()=> {
  prevMusic();
})

function prevMusic() {
     player.prev();
     let music=player.getMusic();
     displayMusic(music);
     playMusic(music);


}

next.addEventListener("click", () => {
    nextMusic();
});

function nextMusic() {
    player.next();
    let music=player.getMusic();
    displayMusic(music);
    playMusic(music);
}


function pauseMusic() {
    container.classList.remove("playing");
    play.querySelector("i").classList="fa-solid fa-play";
     audio.pause();


}

function playMusic() {
    container.classList.add("playing");
    play.querySelector("i").classList="fa-solid fa-pause";
    audio.play();

}

const calculateTime=(totalSecond) => {
    const minute=Math.floor(totalSecond / 60);
    const second=Math.floor(totalSecond % 60);
    const updatedSecond=second <10 ? `0${second}` : `${second}`;
    const final=`${minute}: ${updatedSecond}`;
    return final;

}

audio.addEventListener("loadedmetadata" ,() => {
     duration.textContent=calculateTime(audio.duration);
     progressBar.max=Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progressBar.value=Math.floor(audio.currentTime);
    currentTime.textContent=calculateTime(audio.currentTime);

})

volumeBar.addEventListener("input",(e)=> {
    const value=e.target.value;
    audio.volume=value/100;
    if(value==0) {
        audio.muted=true;
        muteState="muted";
        volume.classList="fa-solid fa-volume-xmark";
    }
    else {
        audio.muted=false;
        muteState="unmuted";
        volume.classList="fa-solid fa-volume-high";

    }


});
let muteState="unmuted";
volume.addEventListener("click",() => {
    if(muteState==="unmuted") {
        audio.muted=true;
        muteState="muted";
        volume.classList="fa-solid fa-volume-xmark";
        volumeBar.value=0;
    }
    else {
        audio.muted=false;
        muteState="unmuted";
        volume.classList="fa-solid fa-volume-high";
        volumeBar.value=100;

    }


});

progressBar.addEventListener("click",() => {
    
    currentTime.textContent=calculateTime(progressBar.value);
    audio.currentTime=progressBar.value;


});
