document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("stroke").value = "#000000";
  document.getElementById("lineWidth").value = "5";

  const canvas = document.getElementById("drawing-board");
  const toolbar = document.getElementById("toolbar");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    const toolbarWidth = toolbar.offsetWidth;
    canvas.width = window.innerWidth - toolbarWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let isPainting = false;
  let lineWidth = 5;
  let startX;
  let startY;

  toolbar.addEventListener("click", (e) => {
    if (e.target.id === "clear") {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  });

  toolbar.addEventListener("change", (e) => {
    if (e.target.id === "stroke") {
      ctx.strokeStyle = e.target.value;
    }

    if (e.target.id === "lineWidth") {
      lineWidth = e.target.value;
    }
  });

  const draw = (e) => {
    if (!isPainting) {
      return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY);
    ctx.stroke();
  };

  canvas.addEventListener("mousedown", (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  canvas.addEventListener("mouseup", (e) => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
  });

  canvas.addEventListener("mousemove", draw);

  const container = document.querySelector('.container');

  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = "Show Drawing Board";
  toggleBtn.id = "toggle-canvas-btn";
  document.body.insertBefore(toggleBtn, container);

  container.style.display = "none";

  toggleBtn.addEventListener("click", () => {
    if (container.style.display === "none") {
      container.style.display = "flex";
      toggleBtn.textContent = "Hide Drawing Board";
      
      resizeCanvas();
    } else {
      container.style.display = "none";
      toggleBtn.textContent = "Show Drawing Board";
    }
  });
});

