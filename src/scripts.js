console.log("Loaded scripts.js! Currently, server online")
const startButton = document.getElementById("startButton");
const startMenu = document.getElementById("startMenu");

startButton.addEventListener("click", () => {
    startMenu.style.display = startMenu.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", (event) => {
    if (event.target !== startButton && event.target !== startMenu) {
        startMenu.style.display = "none";
    }
});
function openWindow(url, title) {
    const windowElement = document.createElement('div');
    windowElement.classList.add('window');
    windowElement.style.top = '50px';
    windowElement.style.left = '50px';
    document.body.appendChild(windowElement); 

    const titleBar = document.createElement('div');
    titleBar.classList.add('title-bar');
    windowElement.appendChild(titleBar);

    const titleText = document.createElement('div');
    titleText.classList.add('title-bar-text');
    titleText.textContent = title;
    titleBar.appendChild(titleText);

    const titleBarControls = document.createElement('div');
    titleBarControls.classList.add('title-bar-controls');
    titleBar.appendChild(titleBarControls);

    const minimizeButton = document.createElement('button');
    minimizeButton.setAttribute('aria-label', 'Minimize');
    minimizeButton.addEventListener('click', () => {
      windowElement.style.display = 'none';
    });
    titleBarControls.appendChild(minimizeButton);

    const maximizeButton = document.createElement('button');
    maximizeButton.setAttribute('aria-label', 'Maximize');
    maximizeButton.addEventListener('click', () => {
      if (windowElement.classList.contains('window--maximized')) {
        windowElement.classList.remove('window--maximized');
        const iframe = windowElement.querySelector('iframe');
        iframe.style.height = windowElement.offsetHeight - 30 + 'px'; 
      } else {
        windowElement.classList.add('window--maximized');
        const iframe = windowElement.querySelector('iframe');
        iframe.style.height = 'calc(100% - 30px)'; 
      }
    });
    titleBarControls.appendChild(maximizeButton);

    const closeButton = document.createElement('button');
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.addEventListener('click', () => {
      windowElement.remove();
    });
    titleBarControls.appendChild(closeButton);

    const windowContent = document.createElement('div');
    windowContent.classList.add('window-content');
    windowElement.appendChild(windowContent);

    const iframe = document.createElement('iframe');
    iframe.src = url;
    windowContent.appendChild(iframe);

    const windowFooter = document.createElement('div');
    windowFooter.classList.add('window-footer');
    windowElement.appendChild(windowFooter);

    dragelement(windowElement);
    resizableelement(windowElement);
  }

  function dragelement(elmnt) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    elmnt.querySelector('.title-bar').onmousedown = dragmousedown;

    function dragmousedown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closedragelement;
      document.onmousemove = elementdrag;
    }

    function elementdrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
      elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
    }

    function closedragelement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  function resizableelement(elmnt) {
    const resizeHandle = document.createElement('div');
    resizeHandle.classList.add('window-resize-handle');
    elmnt.appendChild(resizeHandle);

    resizeHandle.addEventListener('mousedown', initresize, false);

    function initresize(e) {
      e.preventDefault();
      document.addEventListener('mousemove', resize, false);
      document.addEventListener('mouseup', stopresize, false);
    }

    function resize(e) {
      elmnt.style.width = e.clientX - elmnt.offsetLeft + 'px';
      elmnt.style.height = e.clientY - elmnt.offsetTop + 'px';
      const iframe = elmnt.querySelector('iframe');
      iframe.style.height = elmnt.offsetHeight - 30 + 'px';
    }

    function stopresize() {
      document.removeEventListener('mousemove', resize, false);
      document.removeEventListener('mouseup', stopResize, false);
    }
  }
