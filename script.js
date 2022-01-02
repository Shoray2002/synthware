const sun = document.querySelector(".sun");
const skybarDiv = document.querySelector(".skybars");
const sky = document.querySelector(".sky");
const ground = document.querySelector(".ground");
const vertical = document.getElementById("vertical");
const mountainWrapper = document.querySelector(".mountain-wrapper");

makeVerticalGroundHr();
makeHorizontalGroundHr();
makeSunBars();
makeSkyBars();
createMountains();

function makeHorizontalGroundHr() {
  for (let hor = 1; hor <= 20; hor++) {
    ground.innerHTML += `<hr class="horizontal-hr" data="hor ${hor}">`;
  }
}

function makeVerticalGroundHr() {
  for (let vert = 1; vert <= 20; vert++) {
    vertical.innerHTML += `<hr class="vertical-hr" data="vert ${vert}">`;
  }
}

function makeSunBars() {
  for (let bar = 1; bar <= 20; bar++) {
    sun.innerHTML += `<hr class="sunbar-hr" data="sunbar ${bar}">`;
  }
}

function makeSkyBars() {
  for (let skybar = 1; skybar <= 20; skybar++) {
    skybarDiv.innerHTML += `<hr class="skybar-hr" data="${skybar}">`;
  }
}

function createMountains() {
  for (m = 1; m <= 4; m++) {
    const newRow = document.createElement("div");
    newRow.classList.add("mountain-row");

    for (mo = 1; mo <= 5; mo++) {
      const newMountain = document.createElement("hr");
      newMountain.classList.add("mountain");
      newRow.appendChild(newMountain);
    }

    mountainWrapper.appendChild(newRow);
  }
}

setInterval(() => {
  sky.classList.add("sky-animate-thunder");

  setTimeout(() => {
    sky.classList.remove("sky-animate-thunder");
  }, 2000);
}, 9000);

(function () {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  let deadline = "April 9, 2022 00:00:00",
    countDown = new Date(deadline).getTime(),
    x = setInterval(function () {
      let now = new Date().getTime(),
        distance = countDown - now;
      (document.getElementById("days").innerText = Math.floor(distance / day)),
        (document.getElementById("hours").innerText = Math.floor(
          (distance % day) / hour
        )),
        (document.getElementById("minutes").innerText = Math.floor(
          (distance % hour) / minute
        )),
        (document.getElementById("seconds").innerText = Math.floor(
          (distance % minute) / second
        ));

      //do something later when date is reached
      if (distance < 0) {
        let headline = document.getElementById("headline"),
          countdown = document.getElementById("countdown"),
          content = document.getElementById("content");

        headline.innerText = "HAPPY NEW SEMESTER";
        countdown.style.display = "none";
        content.style.display = "block";

        clearInterval(x);
      }
      //seconds
    }, 0);
})();



//
// ---Retro Button---
//
var buttons = document.querySelectorAll('.btn');

for(var i = 0; i < buttons.length; i++) {
  // Click
  buttons[i].addEventListener('mousedown', function() {
    this.classList.add('btn-active');
  });
  buttons[i].addEventListener('mouseup', function() {
    this.classList.remove('btn-active');
  });

  // Hover
  buttons[i].addEventListener('mouseleave', function() {
    this.classList.remove('btn-center', 'btn-right', 'btn-left', 'btn-active');
  });

  buttons[i].addEventListener("mousemove", function(e) {
    var leftOffset = this.getBoundingClientRect().left;
    var btnWidth = this.offsetWidth;
    var myPosX = e.pageX;
    var newClass = "";
    // if on left 1/3 width of btn
    if(myPosX < (leftOffset + .3 * btnWidth) ) {
      newClass = 'btn-left'
    } else {
      // if on right 1/3 width of btn
      if(myPosX > (leftOffset + .65 * btnWidth) ) {
        newClass = 'btn-right';
      } else {
        newClass = 'btn-center';
      }
    }
    // remove prev class
    var clearedClassList = this.className.replace(/btn-center|btn-right|btn-left/gi, "").trim();
    this.className = clearedClassList + " " + newClass;
  });
}




