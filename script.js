const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const audio = new Audio('sounds/bg.mp3');
const effect = new Audio('sounds/gameover.wav');
const gameOverImage = document.querySelector('.gameover');
audio.loop = true;
audio.preload = 'auto';

const jump = () => {
  mario.classList.add('jump');
  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
}

const playedBefore = localStorage.getItem('playedBefore');
if (!playedBefore) {
  audio.play();
  localStorage.setItem('playedBefore', true);
}

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','');

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = 'none';
    pipe.style.left = '${pipePosition}px';
    mario.style.animation = 'none';
    mario.style.bottom = '${marioPosition}px';
    mario.src = 'images/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';
    clearInterval(loop);
    audio.pause();
    effect.play()
    localStorage.removeItem('playedBefore');
    gameOverImage.style.display = 'block';
  } else {
    audio.play();
    gameOverImage.style.display = 'none';
  }
}, 10);

document.addEventListener('keydown', jump);
