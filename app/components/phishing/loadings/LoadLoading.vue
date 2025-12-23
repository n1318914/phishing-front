<template>
  <teleport to="body">
    <div class="spinner-wrapper">
      <div class="spinner">
    <span class="icon" aria-label="spinner">
      <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path
          d="M32 16c0 8.837-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0v2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14h2z"></path></svg>
    </span>
      </div>
      <p></p>
    </div>
  </teleport>
</template>

<style scoped>
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-moz-keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-o-keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

@-o-keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.spinner {
  /* dimensions of the spinner */
  width: 64px;
  height: 64px;
  animation: fade-in 500ms ease-in-out, rotate 500ms linear infinite;
}

.icon {
  display: block;
  max-height: 100%;
  max-width: 100%;
  fill: currentColor;
  color: #005bd3; /* color of the spinner */
}

.svg {
  position: relative;
  display: block;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
}

.spinner-wrapper {
  z-index: 99999;
  position: fixed;
  top:0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}
</style>