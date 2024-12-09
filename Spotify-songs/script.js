// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let bottomCoverImage = document.getElementById("bottomCoverImage");


let songs = [
  {
    songName: "Jungle - Back on 74",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Bruno Mars - Leave The Door Open",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Peggy Gou - (It Goes Like) Nanana",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Dua Lipa - Levitating",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Tame Impala - Breathe Deeper",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Khruangbin, Leon Bridges - Texas Sun",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "ANOTR - Relax My Eyes",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Fred again... - adore u",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Jorja Smith - Little Things",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "KAYTRANADA - Intimidated",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

// Set up the song items dynamically
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  element.getElementsByClassName("songItemPlay")[0].id = i; // Set the correct id for the play button
});

// Function to update the song cover in the bottom controls
const updateBottomCover = (index) => {
  bottomCoverImage.src = songs[index].coverPath; // Set the cover image in the bottom controls
  masterSongName.innerText = songs[index].songName; // Update song name
};

// Handle play/pause click for master button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
    updateBottomCover(songIndex); // Ensure the bottom cover updates when playback starts
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

// Listen to time updates and update the progress bar
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;
});

// Seekbar change event
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// Handle individual song play/pause clicks
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id); // Get song index
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = songs[songIndex].filePath; // Use the correct file path
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
      updateBottomCover(songIndex); // Update the bottom cover
    });
  }
);

// Handle next and previous buttons
document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  updateBottomCover(songIndex); // Update the bottom cover
});

document.getElementById("previous").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  updateBottomCover(songIndex); // Update the bottom cover
});
