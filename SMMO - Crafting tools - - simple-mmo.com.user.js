// ==UserScript==
// @name           SMMO - Crafting tools - - simple-mmo.com
// @updateURL      https://github.com/oligochrome/scripts/raw/main/SMMO - Crafting tools - - simple-mmo.com.user.js
// @downloadURL      https://github.com/oligochrome/scripts/raw/main/SMMO - Crafting tools - - simple-mmo.com.user.js
// @namespace      https://github.com/oligochrome
// @match          https://web.simple-mmo.com/crafting/menu*
// @grant          none
// @version        1.2
// @author         Ogliochrome
// @license        GNU GPL
// @description    05/02/2023, 18:55:37
// ==/UserScript==

function countItems() {
  let itemElements = $("[id*='item-id-']");
  let itemQuantity = 0;

  for (let i = 24; i < itemElements.length; i++) {
    if (!itemElements[i].innerText.includes("Key")) {
      let quantity = itemElements[i].previousSibling.textContent.split('x ')[0].trim();
      if (itemElements[i].innerText !== "Diamond Shard") {
        itemQuantity += parseInt(quantity);
      }
    }
  }
    document.getElementsByClassName("flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center")[1].childNodes[1].attributes[1].value = ""
  document.querySelector("#dragLinks > ul > li > a").textContent = "Count Links: "+itemQuantity
    //alert(itemQuantity);
}

function applyCSS(element, styles) {
  for (const property in styles) {
    element.style[property] = styles[property];
  }
}

// Toggle visibility of an element
function toggleVisibility() {
  console.log("Toggle called");
  const dragLinks = document.querySelector("#dragLinks");
  dragLinks.style.display = dragLinks.style.display === 'none' ? 'block' : 'none';
}

// Create toggle script
const script = document.createElement("script");
script.innerHTML = `
  ${toggleVisibility.toString()}
`;
document.head.appendChild(script);

// Create draggable container
const draggableContainer = document.createElement('div');
draggableContainer.id = "draggableContainer";

const header = document.createElement('div');
header.id = "header";
header.innerText = " ";
draggableContainer.appendChild(header);

// Add container to body
document.body.appendChild(draggableContainer);

// Add button to draggable container
const toggleButton = document.createElement('button');
toggleButton.id = "toggleButton";
toggleButton.innerText = "Toggle Links";
toggleButton.onclick = toggleVisibility;
draggableContainer.appendChild(toggleButton);

// Create container for links
const dragLinks = document.createElement('div');
dragLinks.id = "dragLinks";
dragLinks.style.display = 'none';
draggableContainer.appendChild(dragLinks);

// Make container draggable
enableDragging(draggableContainer);

function enableDragging(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  const header = document.getElementById(element.id + "header");
  if (header) {
    header.onmousedown = dragMouseDown;
  } else {
    element.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Apply styles
applyCSS(draggableContainer, {
  position: 'absolute',
  left: '290px',
  top: '300px',
  transform: 'translate(-50%, -50%)',
  padding: '10px',
  zIndex: '999',
  backgroundColor: '#171717',
  textAlign: 'center',
  border: '1px solid #d3d3d3',
  color: '#ececec'
});

applyCSS(header, {
  padding: '10px',
  cursor: 'move',
  zIndex: '10',
  backgroundColor: '#000000',
  color: '#ececec'
});

applyCSS(toggleButton, {
  fontSize: 'xx-large',
  color: '#ececec'
});

// Links and labels
const linkNames = ['Count Items'];
const linkHrefs = ['#'];

linkNames.forEach((name, i) => {
  const link = document.createElement('a');
  link.href = linkHrefs[i];
  link.innerText = name;
  link.style.color = '#ececec';

  const listItem = document.createElement('li');
  listItem.appendChild(link);

  const list = document.createElement('ul');
  list.appendChild(listItem);

  dragLinks.appendChild(list);
});

// Add event listener for counting items
dragLinks.querySelector("a").addEventListener("click", countItems);

// Initialize visibility
toggleVisibility();
