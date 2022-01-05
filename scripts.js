// Getting elements
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skip = player.querySelectorAll('.skip');
const ranges = player.querySelectorAll('.range')

// Building functions
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function keyplay(key) {
    if (key == " ") {
        const method = video.paused ? 'play' : 'pause';
        video[method]();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function Skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate() {
    video[this.name] = this.value;
    console.log(this.name);
    console.log(this.value);
}

function handleProcess() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    // console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// EventListener zone

video.addEventListener("click", togglePlay);
document.addEventListener("keydown", (e) => keyplay(e.key));
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

toggle.addEventListener("click", togglePlay);
for (let i = 0; i < skip.length; i++) {
    skip[i].addEventListener("click", Skip)
}

for (let i = 0; i < ranges.length; i++) {
    ranges[i].addEventListener("change", rangeUpdate)
    ranges[i].addEventListener("mousemove", rangeUpdate)
}

video.addEventListener("timeupdate", handleProcess)
progress.addEventListener("click", scrub);
let mousedown = false
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true)
progress.addEventListener("mouseup", () => mousedown = false)


