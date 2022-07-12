const butInstall = document.getElementById("buttonInstall");

// event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  window.deferredPrompt = event;
  butInstall.classList.toggle("hidden", false);
});

// click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  const elementEvent = window.deferredPrompt;
  if (!elementEvent) {
    return;
  }
  elementEvent.prompt();
  window.deferredPrompt = null;
  butInstall.classList.toggle("hidden", true);
});

// handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  window.deferredPrompt = null;
});
