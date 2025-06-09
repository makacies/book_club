document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("image-container");
  const coversFolder = "covers";
  const coversCount = 35;

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function getRandomRotation() {
    const rotation_chance = Math.random();
    if (rotation_chance < 0.4) return rotation_chance * 10 - 9;
    else if (rotation_chance < 0.8) return rotation_chance * 10 + 9;
    else return 0;
  }

  function getRandomZIndex() {
    return Math.floor(Math.random() * 10);
  }

  function loadCovers() {
    container.innerHTML = "";

    // Get viewport dimensions with extra padding to ensure edge coverage
    const viewportWidth = window.innerWidth + 100;
    const viewportHeight = window.innerHeight + 60;

    // Image dimensions with margin
    const imageWidth = 120;
    const imageHeight = 180;
    const margin = -8;
    const effectiveWidth = imageWidth + 2 * margin;
    const effectiveHeight = imageHeight + 2 * margin;

    // Calculate needed images
    const columnsNeeded = Math.ceil(viewportWidth / effectiveWidth);
    const rowsNeeded = Math.ceil(viewportHeight / effectiveHeight);
    const totalImagesNeeded = columnsNeeded * rowsNeeded;

    // Position container to allow overflow
    container.style.position = "absolute";
    container.style.left = "-50px";
    container.style.right = "-50px";
    container.style.top = "-30px";
    container.style.bottom = "-30px";

    for (let i = 0; i <= totalImagesNeeded; i++) {
      const img = document.createElement("img");
      const imageIndex = i % coversCount;
      img.src = `${coversFolder}/${imageIndex}.png`;
      img.style.transform = `rotate(${getRandomRotation()}deg)`;
      img.style.zIndex = getRandomZIndex();
      container.appendChild(img);
    }
  }

  const debouncedLoadCovers = debounce(loadCovers, 10);
  window.addEventListener("resize", debouncedLoadCovers);

  loadCovers();
});
