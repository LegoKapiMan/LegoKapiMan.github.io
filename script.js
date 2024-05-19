// check if user has stored wallpaper
if (localStorage.getItem("wallpaper"))
    document.body.style.backgroundImage = `url(${localStorage.getItem("wallpaper")})`;

// time
const time = document.querySelector("#time");

function startTime(el = 0) {
    let date;
    function execute() {
        date = new Date();
        if (el == 0)
            time.innerHTML = `${checkTime(date.getHours())}:${checkTime(date.getMinutes())}<br>
            ${checkTime(date.getDate())}.${checkTime(date.getMonth() + 1)}.${date.getFullYear()}`;
        else
            time.innerHTML = `${checkTime(date.getHours())}:${checkTime(date.getMinutes())}:${checkTime(date.getSeconds())}<br>
            ${checkTime(date.getDate())}.${checkTime(date.getMonth() + 1)}.${date.getFullYear()}`;
    }
    execute();
    change = setInterval(() => { execute(); }, 1000);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}

const checkbox = document.querySelector("label#timecontainer input");
const timechange = document.querySelector("#timechange");
const bluescreen = document.querySelector("#bluescreen");
const languagechange = document.querySelector("#language");
const windowscontainer = document.querySelector("#windowscontainer");
const notification = document.querySelector("#notification");
const changelog = document.querySelector("#changelog");

let change = 0;

// hide everything if pressed on desktop
[document.querySelector("#press"), document.querySelector("#desktop")].forEach(element => {
    element.addEventListener("click", () => {
        windowscontainer.style.zIndex = "-1";
        windowscontainer.style.opacity = "0";
        windowscontainer.style.height = "300px";
        changelog.style.right = "-300px";
        timechange.style.height = "0";
        languagechange.style.height = "0";
    });
});

// document.querySelectorAll("#projects a").forEach(element => {
//     element.addEventListener("click", () => {
//         document.querySelectorAll("#projects a").forEach(e => {
//             e.classList.remove("highlight");
//         });
//         element.classList.add("highlight");
//     });
// });

time.addEventListener("click", () => {
    if (timechange.style.height != "50px") {
        timechange.style.height = "50px";
        languagechange.style.height = "0";
        changelog.style.right = "-300px";
    }
    else {
        timechange.style.height = "0";
    }
});

notification.addEventListener("click", () => {
    if (changelog.style.right != "0px") {
        changelog.style.right = "0px";
        languagechange.style.height = "0";
        timechange.style.height = "0";
    }
    else {
        changelog.style.right = "-300px";
    }
});

document.querySelector("#arrow").addEventListener("click", () => {
    if (languagechange.style.height != "50px") {
        languagechange.style.height = "50px";
        timechange.style.height = "0";
        changelog.style.right = "-300px";

    }
    else {
        languagechange.style.height = "0";
    }
});

document.querySelector("#windowsicon").addEventListener("click", () => {
    if (windowscontainer.style.height != "400px") {
        windowscontainer.style.height = "400px";
        windowscontainer.style.opacity = "1";
        windowscontainer.style.zIndex = "0";
    }
    else {
        windowscontainer.style.zIndex = "-1";
        windowscontainer.style.opacity = "0";
        windowscontainer.style.height = "300px";
    }
});

if (localStorage.getItem("seconds") == 1) {
    checkbox.checked = true;
    startTime(1);
}
else {
    startTime(0);
}
checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        clearInterval(change);
        startTime(1);
        localStorage.setItem("seconds", 1);
    }
    else {
        clearInterval(change);
        startTime(0);
        localStorage.setItem("seconds", 0);
    }
    console.log(localStorage.getItem("seconds"));
});

document.addEventListener("keydown", (event) => {
    if (event.altKey && event.key.toLowerCase() == "w") {
        if (bluescreen.style.display != "flex") {
            blueScreen();
        }
    }
});

let random = 0;
let randomTime = 0;
function blueScreen() {
    bluescreen.style.display = "flex";
    document.querySelector("#bluescreen h2").innerHTML = `${random}% complete`;
    if (random > 100) {
        document.querySelector("#bluescreen h2").innerHTML = `100% complete`;
        setTimeout(blackScreen, 3000);
        setTimeout(restarting, 5000);
        setTimeout(blackScreen2, 10000);
        setTimeout(reloading, 12000);
    }
    else {
        random += Math.floor(Math.random() * 10 + 1);
    }
    randomTime = Math.floor(Math.random() * 2000 + 150);
    setTimeout(blueScreen, randomTime);
}

function blackScreen() {
    document.querySelector("#bluescreen div#before").style.display = "none";
    bluescreen.style.backgroundColor = "black";
}

function restarting() {
    document.querySelector("#bluescreen div#after").style.display = "flex";
}

function blackScreen2() {
    document.querySelector("#bluescreen div#after img").style.display = "none";
    document.querySelector("#bluescreen div#after h3").style.display = "none";
    document.querySelector("#bluescreen div#after").style.backgroundColor = "black";
}

function reloading() {
    window.location.reload();
}

// function allowDrop(ev) {
//     ev.preventDefault();
// }

// function drop(ev) {
//     ev.preventDefault();
//     let data = ev.dataTransfer.getData("text");
//     console.log(data);
//     // ev.target.appendChild(document.getElementById(data));
//     // ev.target.appendChild(ev);
//     imageContainer.innerHTML += `
//         <div class="imgcontainer">
//             <img src="${data}" alt="defaultwallicon">
//         </div>`;
// }

const fileInput = document.querySelector(`input[type="file"]`);
const imageContainer = document.querySelector("#windowscontainer .images");
// const images = document.querySelector("#images");

let elementcount = imageContainer.childElementCount;
let imagesTab = [];
// if (localStorage.getItem("wallpapersTab") || imageContainer.childElementCount != elementcount) {
if (localStorage.getItem("wallpapersTab")) {
    elementcount = imageContainer.childElementCount;
    imagesTab = JSON.parse(localStorage.getItem("wallpapersTab"));
    for (let i = 0; i < imagesTab.length; i++) {
        imageContainer.innerHTML += `
            <div class="imgcontainer">
                <img src="${imagesTab[i]}" alt="defaultwallicon">
            </div>`;
    }
    // let infoTab = JSON.parse(qqq);
    // infoTab.push([tekst1.value, tekst2.value, data.value]);
    // infoTab_JSON = JSON.stringify(infoTab);
}

fileInput.addEventListener('change', (event) => {
    const selectedFiles = event.target.files;
    if (imageContainer.childElementCount < 12)
        for (let i = 0; i < selectedFiles.length; i++) {
            const reader = new FileReader();
            // const newImage = document.createElement("img");
            reader.onload = (e) => {
                // newImage.src = e.target.result;
                console.log(e.target.result);
                document.body.style.backgroundImage = `url(${e.target.result})`;
                imagesTab.push(e.target.result);
                console.log(imagesTab);
                localStorage.setItem("wallpapersTab", JSON.stringify(imagesTab));
                imageContainer.innerHTML += `
                <div class="imgcontainer">
                        <img src="${e.target.result}" alt="defaultwallicon">
                    </div>`;
            };
            reader.readAsDataURL(selectedFiles[i]);
            // const imgcontainer = document.createElement("div");
            // imgcontainer.classList.add(".imgcontainer");
            // const images = document.createElement("div");
            // imgcontainer.classList.add(".images");
            // images.appendChild(div);
            // const del = document.createElement("div");
            // del.classList.add(".delete");
            // imgcontainer.appendChild(del);
            // imgcontainer.appendChild(newImage);
        }
    document.querySelectorAll(`#windowscontainer div img:nth-child(n+${imageContainer.childElementCount})`).forEach(element => {
        element.addEventListener("click", () => {
            document.body.style.backgroundImage = `url(${element["src"]})`;
            console.log(`url(${element["src"]})`);
            localStorage.setItem("wallpaper", element["src"]);
        });
    });
});

document.querySelectorAll(`#windowscontainer div img:nth-child(-n+${imageContainer.childElementCount})`).forEach(element => {
    element.addEventListener("click", () => {
        document.body.style.backgroundImage = `url(${element["src"]})`;
        console.log(`url(${element["src"]})`);
        localStorage.setItem("wallpaper", element["src"]);
    });
});

// function a() {
//     document.querySelectorAll(".delete").forEach((btn, id) => {
//         btn.addEventListener("click", (e) => {
//             console.log(e.target, id);
//             // document.querySelectorAll(".imgcontainer")[id].remove();
//             // console.log(imagesTab[id])
//             imageContainer.innerHTML = `<div class="imgcontainer">
//                 <img src="img/wallpaper.jpg" alt="defaultwallicon">
//             </div>
//             <div class="imgcontainer">
//                 <img src="img/wallpaper1.jpg" alt="defaultwallicon">
//             </div>
//             <div class="imgcontainer">
//                 <img src="img/wallpaper2.jpg" alt="defaultwallicon">
//             </div>
//             <div class="imgcontainer">
//                 <img src="img/wallpaper3.jpg" alt="defaultwallicon">
//             </div>
//             <div class="imgcontainer">
//                 <img src="img/wallpaper4.jpg" alt="defaultwallicon">
//             </div>
//             <div class="imgcontainer">
//                 <img src="img/wallpaper5.jpg" alt="defaultwallicon">
//             </div>
//             <div class="imgcontainer">
//                 <img src="img/wallpaper6.jpg" alt="defaultwallicon">
//             </div>
//             <div class="imgcontainer">
//                 <img src="img/wallpaper7.jpg" alt="defaultwallicon">
//             </div>`;
//             imagesTab.splice(id, 1);
//             for (let i = 0; i < imagesTab.length; i++) {
//                 imageContainer.innerHTML += `
//             <div class="imgcontainer">
//                 <div class="delete"></div>
//                 <img src="${imagesTab[i]}" alt="defaultwallicon">
//             </div>`;
//             }
//         });
//     });
// }

// document.querySelectorAll(".delete").forEach((btn, id) => {
//     btn.addEventListener("click", (e) => {
//         console.log(e.target, id);
//         // document.querySelectorAll(".imgcontainer")[id].remove();
//         // console.log(imagesTab[id])
//         imageContainer.innerHTML = `<div class="imgcontainer">
//                 <img src="img/wallpaper.jpg" alt="defaultwallicon">
//             </div>
//             <div class="imgcontainer">
//                 <img src="img/wallpaper1.jpg" alt="defaultwallicon">
//             </div>
//             <div class="imgcontainer">
//                 <img src="img/wallpaper2.jpg" alt="defaultwallicon">
//             </div>
//             <div class="imgcontainer">
//                 <img src="img/wallpaper3.jpg" alt="defaultwallicon">
//             </div>
//             <div class="imgcontainer">
//                 <img src="img/wallpaper4.jpg" alt="defaultwallicon">
//             </div>
//             <div class="imgcontainer">
//                 <img src="img/wallpaper5.jpg" alt="defaultwallicon">
//             </div>
//             <div class="imgcontainer">
//                 <img src="img/wallpaper6.jpg" alt="defaultwallicon">
//             </div>
//             <div class="imgcontainer">
//                 <img src="img/wallpaper7.jpg" alt="defaultwallicon">
//             </div>`;
//         imagesTab.splice(id, 1);
//         for (let i = 0; i < imagesTab.length; i++) {
//             imageContainer.innerHTML += `
//         <div class="imgcontainer">
//             <div class="delete"></div>
//             <img src="${imagesTab[i]}" alt="defaultwallicon">
//         </div>`;
//         }
//     });
//     a();
// });

const projectLinks = document.querySelectorAll("#projects a");

// Function to open highlighted links in new tabs
function openHighlightedLinksInNewTabs() {
    projectLinks.forEach(element => {
        if (element.classList.contains("highlight")) {
            window.open(element.href, '_blank');
        }
    });
}


// Function to open highlighted links in new tabs
function openHighlightedLinksInNewTabs() {
    projectLinks.forEach(element => {
        if (element.classList.contains("highlight")) {
            window.open(element.href, '_blank');
        }
    })
}

let firstHighlightedIndex = -1; // To keep track of the first highlighted link
let isCtrlPressed = false;

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey) {
        isCtrlPressed = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (!event.ctrlKey) {
        isCtrlPressed = false;
    }
});

projectLinks.forEach((element, index) => {
    element.addEventListener("click", (event) => {
        if (event.shiftKey) {
            if (firstHighlightedIndex === -1) {
                firstHighlightedIndex = index; // Set the first highlighted link
            } else {
                if (!isCtrlPressed) {
                    // Deselect all links if Ctrl key is not pressed
                    projectLinks.forEach(e => {
                        e.classList.remove("highlight");
                    });
                }

                // Select all links between the first and last highlighted links
                for (let i = Math.min(firstHighlightedIndex, index); i <= Math.max(firstHighlightedIndex, index); i++) {
                    projectLinks[i].classList.add("highlight");
                }
                firstHighlightedIndex = -1; // Reset the first highlighted link
            }
            event.stopPropagation();
            event.preventDefault();
        } else {
            firstHighlightedIndex = index; // Set the first highlighted link
            if (!isCtrlPressed) {
                projectLinks.forEach(e => {
                    if (e !== element) {
                        e.classList.remove("highlight");
                    }
                });
            }
            element.classList.add("highlight");
        }
    });

    element.addEventListener("keydown", (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            openHighlightedLinksInNewTabs();
        }
    });
});


// Deselect all links when clicking on the desktop (body)
[document.querySelector("#press"), document.querySelector("footer")].forEach(element => {

    element.addEventListener('mousedown', (event) => {
        // Check if the clicked element is not a link
        if (!event.target.matches('#projects')) {
            projectLinks.forEach(element => {
                element.classList.remove('highlight');
            });
        }
    });
});


const desktop = document.querySelector('#press');
const projects = document.querySelector("#projects");



const selectionRectangle = document.createElement('div');
selectionRectangle.classList.add('desktop-selection-rectangle');
let isSelecting = false;
let startX, startY, endX, endY;
const selectedLinks = new Set();

desktop.addEventListener('mousedown', (event) => {
    isSelecting = true;
    startX = event.clientX;
    startY = event.clientY;
    selectionRectangle.style.left = startX + 'px';
    selectionRectangle.style.top = startY + 'px';
    selectionRectangle.style.width = '0';
    selectionRectangle.style.height = '0';
    document.body.appendChild(selectionRectangle);

    // Deselect all links when starting a new selection
    selectedLinks.forEach(link => {
        link.classList.remove('highlight');
    });
    selectedLinks.clear();
});

desktop.addEventListener('mousemove', (event) => {
    if (isSelecting) {
        endX = event.clientX;
        endY = event.clientY;
        const minX = Math.min(startX, endX);
        const minY = Math.min(startY, endY);
        const width = Math.abs(endX - startX);
        const height = Math.abs(endY - startY);

        selectionRectangle.style.left = minX + 'px';
        selectionRectangle.style.top = minY + 'px';
        selectionRectangle.style.width = width + 'px';
        selectionRectangle.style.height = height + 'px';

        // Check for intersection with links
        // const links = document.querySelectorAll('#projects a');
        projectLinks.forEach(link => {
            const linkRect = link.getBoundingClientRect();
            const selectionRect = selectionRectangle.getBoundingClientRect();

            if (
                linkRect.left < selectionRect.right &&
                linkRect.right > selectionRect.left &&
                linkRect.top < selectionRect.bottom &&
                linkRect.bottom > selectionRect.top
            ) {
                selectedLinks.add(link);
                link.classList.add('highlight');
            } else {
                selectedLinks.delete(link);
                link.classList.remove('highlight');
            }
        });
    }
});

projects.addEventListener('mousemove', (event) => {
    if (isSelecting) {
        endX = event.clientX;
        endY = event.clientY;
        const minX = Math.min(startX, endX);
        const minY = Math.min(startY, endY);
        const width = Math.abs(endX - startX);
        const height = Math.abs(endY - startY);

        selectionRectangle.style.left = minX + 'px';
        selectionRectangle.style.top = minY + 'px';
        selectionRectangle.style.width = width + 'px';
        selectionRectangle.style.height = height + 'px';

        // Check for intersection with links
        // const links = document.querySelectorAll('#projects a');
        projectLinks.forEach(link => {
            const linkRect = link.getBoundingClientRect();
            const selectionRect = selectionRectangle.getBoundingClientRect();

            if (
                linkRect.left < selectionRect.right &&
                linkRect.right > selectionRect.left &&
                linkRect.top < selectionRect.bottom &&
                linkRect.bottom > selectionRect.top
            ) {
                selectedLinks.add(link);
                link.classList.add('highlight');
            } else {
                selectedLinks.delete(link);
                link.classList.remove('highlight');
            }
        });
    }
});

desktop.addEventListener('mouseup', () => {
    isSelecting = false;
    document.body.removeChild(selectionRectangle);
});

projects.addEventListener('mouseup', () => {
    if (isSelecting)
        document.body.removeChild(selectionRectangle);
    isSelecting = false;
});

desktop.addEventListener('mousedown', () => {
    // Deselect all links when clicking on the desktop
    selectedLinks.forEach(link => {
        link.classList.remove('highlight');
    });
    selectedLinks.clear();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        // Open selected links in new tabs when Shift+Enter is pressed
        selectedLinks.forEach(link => {
            window.open(link.href, '_blank');
        });
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        // Deselect all links when the Escape key is pressed
        selectedLinks.forEach(link => {
            link.classList.remove('highlight');
        });
        selectedLinks.clear();
    }
});

// document.querySelector("#notepad").addEventListener("click", () => {
// });