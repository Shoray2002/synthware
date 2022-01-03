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

var buttons = document.querySelectorAll(".btn");
var wrapper=document.querySelector(".btn-content");
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("mousedown", function () {
    this.classList.add("btn-active");
  });
  buttons[i].addEventListener("mouseup", function () {
    this.classList.remove("btn-active");
  });

  buttons[i].addEventListener("mouseleave", function () {
    this.classList.remove("btn-center", "btn-right", "btn-left", "btn-active");
  });

  buttons[i].addEventListener("mousemove", function (e) {
    var leftOffset = this.getBoundingClientRect().left;
    var btnWidth = this.offsetWidth;
    var myPosX = e.pageX;
    var newClass = "";
    // if on left 1/3 width of btn
    if (myPosX < leftOffset + 0.3 * btnWidth) {
      newClass = "btn-left";
    } else {
      // if on right 1/3 width of btn
      if (myPosX > leftOffset + 0.65 * btnWidth) {
        newClass = "btn-right";
      } else {
        newClass = "btn-center";
      }
    }
    // remove prev class
    var clearedClassList = this.className
      .replace(/btn-center|btn-right|btn-left/gi, "")
      .trim();
    this.className = clearedClassList + " " + newClass;
  });
}

// if its night
if (new Date().getHours() > 18 || new Date().getHours() < 6) {
  document.querySelector("#retrobg").classList.toggle("retrobg-shutdown");
  document.getElementById("logo").src = "night.svg";
} else {
  console.log("Enjoy the day");
}


wrapper.addEventListener("click", function () {
 document.querySelector("#retrobg").classList.toggle("retrobg-shutdown");
 console.log("clicked");
});
