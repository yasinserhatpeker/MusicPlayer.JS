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
    play.classList="fa-solid fa-play";
     audio.pause();


}

function playMusic() {
    container.classList.add("playing");
    play.classList="fa-solid fa-pause";
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
