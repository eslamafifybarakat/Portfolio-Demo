// Start Settings

//Check If There's Local Storage Color Option
let mainColor = localStorage.getItem("color-option");
if (mainColor !== null) {
  // console.log("Local Storage Is Not Empty You Can Set One To Root Now");
  // console.log("color-option")
  document.documentElement.style.setProperty("--main-color", mainColor);

  //Remove Active Class From All Colors List Items
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    //Add Active Class On Element With Data-Color === Local Storage Item.
    if (element.dataset.color === mainColor) {
      //Add Active Class On This Element
      element.classList.add("active");
    }
  });
}

//Random Background option
let backgroundOption = true;

//Variable To Control The Background Interval
let backgroundInterval;

//Check If There's Local Storage Random Background Item Selected
let backgroundLocalItem = localStorage.getItem("background-option");

//Check If Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  //Remove Active Class From All Span
  document.querySelectorAll(".random-background span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-background .yes ").classList.add("active");
  } else {
    document.querySelector(".random-background .no ").classList.add("active");
  }
}

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-cog").onclick = function () {
  //Toggle Fa-spin For Rotating On Self
  this.classList.toggle("fa-spin");

  // Toggle Spin Open On Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");

  // ------------------------------------------Switch Colors---------------------------------------------------
  let colorsLi = document.querySelectorAll(".colors-list li");

  //Loop On All List Items
  colorsLi.forEach((colorLi) => {
    //Click On Every List Items
    colorLi.addEventListener("click", (e) => {
      //Set Color On Root
      // console.log(e.target.dataset.color);
      document.documentElement.style.setProperty(
        "--main-color",
        e.target.dataset.color
      );

      //Set Color On Local Storage
      localStorage.setItem("color-option", e.target.dataset.color);

      //Remove Active Class From All Children
      handleActive(e);
    });
  });

  // ----------------------- Switch Random Background Option ---------------------------------
  let randomBackEl = document.querySelectorAll(".random-background span");

  //Loop On All Span
  randomBackEl.forEach((span) => {
    //Click On Every Span
    span.addEventListener("click", (e) => {
      //Remove Active Class From All Children
      handleActive(e);

      //Controls
      if (e.target.dataset.background === "yes") {
        backgroundOption = true;
        randomizeImgs();
        localStorage.setItem("background-option", true);
      } else {
        backgroundOption = false;
        clearInterval(backgroundInterval);
        localStorage.setItem("background-option", false);
      }
    });
  });
};

//Select Landing Page Element
let landingPage = document.querySelector(".landing");
//Get Array Of Images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

//Function To Randomize Images
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      //Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      //Change Background Image URL
      landingPage.style.backgroundImage =
        'url("images/' + imgsArray[randomNumber] + '")';
    }, 5000);
  }
}
randomizeImgs();

// ----------------------- Show Or Hide Bullets Option ---------------------------------

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
    handleActive(e);
  });
});

// ----------------------- Rest All Settings ----------------------------------

document.querySelector(".rest-options").onclick = function () {
  //Clear All Website Data At Local Storage

  // localStorage.clear();

  //Clear Specific Website Settings Website At Local Storage

  local = localStorage.removeItem("color-option");
  local = localStorage.removeItem("background-option");
  local = localStorage.removeItem("bullets-option");
  local = localStorage.removeItem("darkMode");
  window.location.reload();
};

// End Settings

//Start Nav Bullets

//Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

scrollToSomewhere(allBullets);

//End Nav Bullets

//Start Nav Bullets

//Select Header
const allLinks = document.querySelectorAll(".links-header a");

scrollToSomewhere(allLinks);

//End Header

// Start Skills

$(document).ready(function () {
  $(".skill-icons")
    .children(".active")
    .each(function (i) {
      var row = $(this);
      setTimeout(function () {
        row.css("background", mainColor ? mainColor : "#cc5040");
      }, 100 * i);
    });
});
// End Skills

//Start Our Gallery

//Create Popup With The Image Image
let ourGallery = document.querySelectorAll(".our-gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //Create Overlay Element
    let overlay = document.createElement("div");

    //Add Class To Overlay
    overlay.className = "popup-overlay";

    //Append Overlay To Body
    document.body.appendChild(overlay);

    //Create Popup box
    let popupBox = document.createElement("div");

    //Add Class Popup box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      //Create Heading Image
      let imageHeading = document.createElement("h3");

      //Create Text For imageHeading
      let imgText = document.createTextNode(img.alt);

      //Append The Text To The Heading
      imageHeading.appendChild(imgText);

      //Append The Heading To The Popup Box
      popupBox.appendChild(imageHeading);
    }

    //Create The Image
    let popupImage = document.createElement("img");

    //Set Image Source
    popupImage.src = img.src;

    //Add Image To Popup Box
    popupBox.appendChild(popupImage);

    //Append The Popup Box To body
    document.body.appendChild(popupBox);

    //Create The Close Button Span
    let closeButton = document.createElement("span");

    //Create The Close Button text
    let closeButtonText = document.createTextNode("X");

    //Append Text To Close Button
    closeButton.appendChild(closeButtonText);

    //Add Class To Close Button
    closeButton.className = "close-button";

    //Add Close Button To Popup Box
    popupBox.appendChild(closeButton);
  });
});

//Close Popup Button
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    //Remove The Current Popup
    e.target.parentNode.remove();

    //Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

//End Our Gallery

//Function Navigation Scrolling
function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

//Function Handle Active State
function handleActive(ev) {
  //Remove Active Class From All Colors List Items
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  //Add Active Class On Self
  ev.target.classList.add("active");
}

//Start Nav Bar Toggle Menu Icon

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(
  ".landing .header-area .links-container ul"
);

toggleBtn.addEventListener("click", (e) => {
  //Stop Propagation
  e.stopPropagation();

  //Add Class "Open" To Links
  tLinks.classList.toggle("open");
});

//Click Anywhere Outside Menu & Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    //Check If Menu Is Open
    if (tLinks.classList.contains("open")) {
      //Toggle Class "menu-active" On Button
      toggleBtn.classList.toggle("menu-active");

      //Add Class "Open" To Links
      tLinks.classList.toggle("open");
    }
  }
});

//Stop Propagation On Menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};

// Start Scroll Top
let span = document.querySelector(".up");

window.onscroll = function () {
  this.scrollY >= 1000
    ? span.classList.add("show")
    : span.classList.remove("show");
};

span.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// End Scroll Top

//Dark Mode

/* Body */
const body = document.querySelector("body");


// Dark Mode Action
let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector(".dark-mode-button");

// Enable Dark Mode
const enableDarkMode = () => {
  body.classList.add("dark-mode");
  localStorage.setItem("darkMode", "enabled");
};

// Disable Dark Mode
const disableDarkMode = () => {
  body.classList.remove("dark-mode");
  localStorage.setItem("darkMode", null);
};

if (darkMode == "enabled") {
  enableDarkMode();
}

// Desktop Button
darkModeToggle.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

// Footer button, optional. This is for if you have a second dark mode toggle button
//in the footer, just make sure the button is inside the footer tag, and it will be
//linked to this function.

