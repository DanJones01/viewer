dragElement(document.querySelector('.moveable'));

let isResizing = false;

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    windowwidth = window.innerWidth;
    windowheight = window.innerHeight;

    changeY = elmnt.offsetTop - pos2
    changeX = elmnt.offsetLeft - pos1

    y = (changeY/windowheight)*100
    x = (changeX/windowwidth)*100

    console.log(x, y)

    // set the element's new position:
    elmnt.style.top = y + "vh";
    elmnt.style.left = x + "vw";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

/*Make resizable div by Hung Nguyen*/
function makeResizableDiv(div) {
  const element = document.querySelector(div);
  const resizers = document.querySelectorAll(div + ' .resizer')
  const minimum_size = 20;
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  for (let i = 0;i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', function(e) {
      e.preventDefault()
      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      original_x = element.getBoundingClientRect().left;
      original_y = element.getBoundingClientRect().top;
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResize)
    })
    
    function resize(e) {
      if (currentResizer.classList.contains('se')) {
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = (width/window.innerWidth)*100 + 'vw'
        }
        if (height > minimum_size) {
          element.style.height = (height/window.innerHeight)*100 + 'vh'
        }
      }
      else if (currentResizer.classList.contains('sw')) {
        const height = original_height + (e.pageY - original_mouse_y)
        const width = original_width - (e.pageX - original_mouse_x)
        if (height > minimum_size) {
          element.style.height = (height/window.innerHeight)*100 + 'vh'
        }
        if (width > minimum_size) {
          element.style.width = (width/window.innerWidth)*100 + 'vw'
          element.style.left = ((original_x + (e.pageX - original_mouse_x))/window.innerWidth)*100 + 'vw'
        }
      }
      else if (currentResizer.classList.contains('ne')) {
        const width = original_width + (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = (width/window.innerWidth)*100 + 'vw'
        }
        if (height > minimum_size) {
          element.style.height = (height/window.innerHeight)*100 + 'vh'
          element.style.top = ((original_y + (e.pageY - original_mouse_y))/window.innerHeight)*100 + 'vh'
        }
      }
      else {
        const width = original_width - (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size) {
          element.style.width = (width/window.innerWidth)*100 + 'vw'
          element.style.left = ((original_x + (e.pageX - original_mouse_x))/window.innerWidth)*100 + 'vw'
        }
        if (height > minimum_size) {
          element.style.height = (height/window.innerHeight)*100 + 'vh'
          element.style.top = ((original_y + (e.pageY - original_mouse_y))/window.innerHeight)*100 + 'vh'
        }
      }
    }
    
    function stopResize() {
      window.removeEventListener('mousemove', resize)
    }
  }
}

makeResizableDiv('.resizable')