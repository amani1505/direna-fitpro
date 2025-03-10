(function() {
  function createBackgroundElements() {
    const container = document.querySelector('.splash-bg-elements');
    const colors = ['#ff4836', '#2d6f17', '#ff7d66', '#45a825'];

    for (let i = 0; i < 40; i++) {
      const dot = document.createElement('div');
      dot.classList.add('splash-bg-element');

      // Random properties
      const size = Math.random() * 80 + 20;
      dot.style.width = size + 'px';
      dot.style.height = size + 'px';
      dot.style.left = (Math.random() * window.innerWidth) + 'px';
      dot.style.top = (Math.random() * window.innerHeight) + 'px';
      dot.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      dot.style.animationDuration = (Math.random() * 4 + 3) + 's';
      dot.style.animationDelay = (Math.random() * 2) + 's';

      container.appendChild(dot);
    }
  }

  function hideSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        setTimeout(() => {
            splashScreen.style.opacity = '0';
            setTimeout(() => {
                splashScreen.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scrolling
            }, 500);
        }, 2800);
    }
}


  window.addEventListener('DOMContentLoaded', () => {
    createBackgroundElements();

    const checkAngularInterval = setInterval(() => {
      if (document.querySelector('app-root').children.length > 0) {
        clearInterval(checkAngularInterval);
        hideSplashScreen();
      }
    }, 100);

    setTimeout(() => {
      clearInterval(checkAngularInterval);
      hideSplashScreen();
    }, 8000);
  });
})();
