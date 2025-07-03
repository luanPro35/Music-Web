const toggleButton = document.getElementById("toggleButton");

let isPlaying = false;
const playlist = [
    {
        src: "https://zingmp3.vn/bai-hat/Lac-Troi-Son-Tung-M-TP/ZW78DIEO.html",
        img: "../image/images (5).jpg",
        title: "Lạc Trôi - Sơn Tùng M-TP"
    },
    {
        src: "../music/song2.mp3",
        img: "../image/images (6).jpg",
        title: "Nơi Này Có Anh - Sơn Tùng M-TP"
    },
    {
        src: "../music/song3.mp3",
        img: "../image/ngang-1749778781557-17497787836531803059463.webp",
        title: "Em Gái Mưa - Hương Tràm"
    }
];

let currentSongIndex = 0;

function loadSong(index) {
    const audio = document.getElementById("audio");
    const songImage = document.getElementById("song-image");
    if(index < 0 || index >= playlist.length) {
        return;
    }
    audio.src = playlist[index].src;
    songImage.src = playlist[index].img;
    songImage.alt = playlist[index].title;
    currentSongIndex = index;
}

function playSongAt(index) {
    const audio = document.getElementById("audio");
    const songImage = document.getElementById("song-image");

    if (index >= 0 && index < playlist.length) {
        currentSongIndex = index;
        audio.src = playlist[index].src;
        songImage.src = playlist[index].img;
        songImage.alt = playlist[index].title;

        audio.play();
        isPlaying = true;
        toggleButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
}

function pauseSong() {
    const audio = document.getElementById("audio");
    audio.pause();
    isPlaying = false;
}

function nextSong() {
    // ❌ Sai: Gọi loadSong(nextIndex); rồi playSong(); nhưng không có hàm playSong()
    // ✅ Sửa: Gọi trực tiếp playSongAt(nextIndex)
    let nextIndex = (currentSongIndex + 1) % playlist.length;
    playSongAt(nextIndex);
}

function previousSong() {
    // ❌ Sai: Gọi loadSong(prevIndex); rồi playSong(); nhưng không có hàm playSong()
    // ✅ Sửa: Gọi trực tiếp playSongAt(prevIndex)
    let prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    playSongAt(prevIndex);
}

function togglePlayPause() {
    const audio = document.getElementById("audio");
    if (isPlaying) {
        pauseSong();
        toggleButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        // ❌ Sai: Gọi playSong(); nhưng hàm này không được định nghĩa
        // ✅ Sửa: Gọi playSongAt(currentSongIndex) để phát bài hiện tại
        playSongAt(currentSongIndex);
    }
}

// ❌ Sai: Không cập nhật currentSongIndex nên các chức năng next/prev không chính xác
// ✅ Sửa: Dùng index trong vòng forEach để truyền vào playSongAt(index)
document.querySelectorAll('.music-list li').forEach((item, index) => {
    item.addEventListener('click', function() {
        playSongAt(index);
    });
});


const timestart = document.getElementById("audio");
timestart.addEventListener("timeupdate", function() {
    const currentTime = timestart.currentTime;
    const totalTime = timestart.duration;
    const progressBar = document.querySelector(".bar-progress");
    const progress = totalTime ? (currentTime / totalTime) * 100 : 0;
    progressBar.style.width = progress + "%";
    const currentTimeElement = document.querySelector(".current-time");
    const totalTimeElement = document.querySelector(".total-time");
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    const totalMinutes = Math.floor(totalTime / 60);
    const totalSeconds = Math.floor(totalTime % 60);
    currentTimeElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
totalTimeElement.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' + totalSeconds : totalSeconds}`;
    if (currentTime >= totalTime) {
        nextSong();
    }
    if (currentTime >= totalTime) {
        isPlaying = false;
        toggleButton.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
    if (isPlaying) {
        timestart.play();
    } else {
        timestart.pause();
    }
    toggleButton.innerHTML = isPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
});
