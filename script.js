const image = document.querySelector('img');
const progressBarContainer = document.getElementById('progressbar-container')
const progressBar = document.getElementById('progress-bar');
const currentTimeEle = document.getElementById('current-time');
const durationTimeEle = document.getElementById('duration');
const songName =  document.querySelector('h2');
const artistName = document.querySelector('h3');
const audioFile = document.querySelector('audio');
const previousBtn = document.getElementById('previous');
const playBtn = document.getElementById('play');
const forwardBtn = document.getElementById('forward');

// Array containing songs 
const songs = [
    {
        name: 'jungle',
        displayName: 'Jungle sounds',
        artist: 'Unknown',
    },

    {
        name: 'countryside',
        displayName: 'Countryside sounds',
        artist: 'Unknown',
    },

    {
        name: 'river',
        displayName: 'Riverside sounds',
        artist: 'Unknown',
    }
];
// Check if music is playing
let isPLaying = false;

function playSong () {
    isPLaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    audioFile.play();
}

function pauseSong () {
    isPLaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    audioFile.pause();
}

// Event listener for playing or pausing the music
playBtn.addEventListener ('click', () => (isPLaying? pauseSong() : playSong()));

// Update DOM with songs properties
function selectSongs (song) {
    songName.textContent = song.displayName;
    artistName.textContent = song.artist;
    audioFile.src = `music/${song.name}.mp3`;
    image.src = `images/${song.name}.jpg`;
}

let songIndex = 0;
// Function to change to previous song
function decrementSongIndex () {
    songIndex-- ;
    if (songIndex < 0 ) {
        songIndex = songs.length -1;
    }
    selectSongs(songs[songIndex])
    playSong();
}
// Function to change to next song
function incrementSongIndex () {
    songIndex++ ;
    if (songIndex > songs.length -1) {
        songIndex = 0;
    }
    selectSongs(songs[songIndex])
    playSong();
}
// First song on load
selectSongs(songs[songIndex]);
// Function to update time and moving progress bar
function updateProgressBar (event) {
    if (isPLaying) {
        const { duration, currentTime } = event.srcElement;
        // Update progress bar as the song is playing
        const progressBarPercentage = ( currentTime / duration ) * 100;
        progressBar.style.width = `${progressBarPercentage}%`;
        // Display duration time 
        let durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay updating durationTimeEle to avoid NaN
        if (durationMinutes) {
            durationTimeEle.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Display current time 
        let currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEle.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}
// Function for skipping time on progress bar
function skipTimeOnProgresBar (event) {
    const width = this.clientWidth;
    const xOffsetLength = event.offsetX;
    const { duration } = audioFile;
    audioFile.currentTime = (xOffsetLength / width) * duration;

};

// Event listeners for controls panel
progressBarContainer.addEventListener('click', skipTimeOnProgresBar);
previousBtn.addEventListener('click', decrementSongIndex);
forwardBtn.addEventListener('click', incrementSongIndex);
audioFile.addEventListener('timeupdate', updateProgressBar);
audioFile.addEventListener('ended', incrementSongIndex);
