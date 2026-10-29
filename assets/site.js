const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'Close' : 'Menu';
  navigation.classList.toggle('open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
    toggle.click();
    toggle.focus();
  }
});
const video = document.querySelector('.hero video');
const control = document.querySelector('.media-control');
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
let userPaused = false;
function attachVideo() {
  if (!video || !control) return;
  if (motion.matches) {
    video.pause();
    video.removeAttribute('src');
    video.load();
    control.hidden = true;
    return;
  }
  video.muted = true;
  video.src = video.dataset.src;
  control.hidden = false;
  video.play().catch(() => { control.textContent = 'Play video'; });
}
if (video && control) {
  attachVideo();
  motion.addEventListener('change', attachVideo);
  control.addEventListener('click', () => {
    if (video.paused) { userPaused = false; video.play().catch(() => {}); }
    else { userPaused = true; video.pause(); }
  });
  video.addEventListener('play', () => { control.textContent = 'Pause video'; control.setAttribute('aria-label', 'Pause background video'); });
  video.addEventListener('pause', () => { control.textContent = 'Play video'; control.setAttribute('aria-label', 'Play background video'); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
    else if (!userPaused && !motion.matches) video.play().catch(() => {});
  });
}
