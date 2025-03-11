(function () {
  // Immediately return if we're not in a browser environment
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  // Create a flag to track if the issue has been fixed
  let scrollFixed = false;

  // Fix for common scroll blocking issues
  function fixScrollIssues() {
    if (scrollFixed) return;
    scrollFixed = true;

    // Ensure body and HTML are scrollable
    document.body.style.height = "auto";
    document.body.style.overflowY = "auto";
    document.documentElement.style.height = "auto";
    document.documentElement.style.overflowY = "auto";

    // Fix for common frameworks that might use a container div
    const possibleContainers = [
      document.querySelector("#app"),
      document.querySelector(".app-container"),
      document.querySelector("app-root"),
      document.querySelector("main"),
    ];

    possibleContainers.forEach((container) => {
      if (container) {
        container.style.height = "auto";
        container.style.overflowY = "visible";
        container.style.position = "relative";
      }
    });

    // Check if the page has enough content to scroll
    setTimeout(() => {
      const contentHeight =
        document.body.scrollHeight || document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;


      if (contentHeight <= viewportHeight) {
        // If content is too short, add a dummy element to make it scrollable for testing
        const dummy = document.createElement("div");
        dummy.style.height = "100vh";
        dummy.style.marginTop = "100vh";
        dummy.style.width = "100%";
        dummy.id = "scroll-test-element";
        document.body.appendChild(dummy);

      }
    }, 1000);
  }

  function createBackgroundElements() {
    const container = document.querySelector(".splash-bg-elements");
    if (!container) return;

    const colors = ["#ff4836", "#2d6f17", "#ff7d66", "#45a825"];
    for (let i = 0; i < 40; i++) {
      const dot = document.createElement("div");
      dot.classList.add("splash-bg-element");
      // Random properties
      const size = Math.random() * 80 + 20;
      dot.style.width = size + "px";
      dot.style.height = size + "px";
      dot.style.left = Math.random() * window.innerWidth + "px";
      dot.style.top = Math.random() * window.innerHeight + "px";
      dot.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      dot.style.animationDuration = Math.random() * 4 + 3 + "s";
      dot.style.animationDelay = Math.random() * 2 + "s";
      container.appendChild(dot);
    }
  }

  function hideSplashScreen() {
    const splashScreen = document.getElementById("splash-screen");
    if (splashScreen) {
      setTimeout(() => {
        splashScreen.style.opacity = "0";
        setTimeout(() => {
          splashScreen.style.display = "none";
          splashScreen.remove(); // Fully remove from DOM

          // Fix scroll issues
          fixScrollIssues();

          // Generate test scroll events
          for (let i = 0; i < 5; i++) {
            setTimeout(() => {
              window.dispatchEvent(new Event("scroll"));
            }, i * 200);
          }
        }, 500);
      }, 2800);
    }
  }

  window.addEventListener("DOMContentLoaded", () => {
    // Check if any fixed position elements might be blocking scroll
    const fixedElements = Array.from(document.querySelectorAll("*")).filter(
      (el) => {
        const style = window.getComputedStyle(el);
        return style.position === "fixed" || style.position === "sticky";
      },
    );

    createBackgroundElements();

    // Make sure body overflow is initially set
    document.body.style.overflow = "hidden";

    const checkAngularInterval = setInterval(() => {
      const appRoot = document.querySelector("app-root");
      if (appRoot && appRoot.children.length > 0) {
        clearInterval(checkAngularInterval);
        hideSplashScreen();
      }
    }, 100);

    // Failsafe
    setTimeout(() => {
      clearInterval(checkAngularInterval);
      hideSplashScreen();
    }, 8000);
  });
})();
