import "../styles/style.css";
import "../styles/reset.css";

const photoArray = document.querySelectorAll("li");

const buttons = document.querySelectorAll("div [data-carousel-button]");

const imageInterval = (function () {
  const interval = setInterval(() => {
    document.querySelector(".nextArrow").click();
  }, 5000);

  return { interval };
})();

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const offset = button.dataset.carouselButton == "next" ? 1 : -1;

    const active = document.querySelector('[data-active="true"]');
    const activeIndex = Array.from(photoArray).indexOf(active);

    const allImageRadioInputs = document.querySelectorAll(
      'input[type=radio][name="image"'
    );

    allImageRadioInputs.forEach((circle) => {
      circle.onchange = (e) => {
        photoArray.forEach((photo) => {
          photo.setAttribute("data-active", "false");
        });
        photoArray[
          Array.from(allImageRadioInputs).indexOf(e.target)
        ].setAttribute("data-active", "true");
        allImageRadioInputs[
          Array.from(allImageRadioInputs).indexOf(e.target)
        ].checked = true;
      };
    });

    if (activeIndex == 0 && offset == -1) {
      photoArray[activeIndex].setAttribute("data-active", "false");
      photoArray[photoArray.length - 1].setAttribute("data-active", "true");
      allImageRadioInputs.forEach(() => {
        allImageRadioInputs[allImageRadioInputs.length - 1].checked = true;
      });
    } else if (activeIndex == photoArray.length - 1 && offset == 1) {
      photoArray[activeIndex].setAttribute("data-active", "false");
      photoArray[0].setAttribute("data-active", "true");
      allImageRadioInputs.forEach(() => {
        allImageRadioInputs[0].checked = true;
      });
    } else {
      photoArray[activeIndex].setAttribute("data-active", "false");
      photoArray[activeIndex + offset].setAttribute("data-active", "true");
      allImageRadioInputs.forEach(() => {
        allImageRadioInputs[activeIndex + offset].checked = true;
      });
    }
  });
});

const allCircles = document.createElement("div");
allCircles.classList.add("allImageRadio");

photoArray.forEach((image) => {
  const circle = document.createElement("input");
  circle.setAttribute("type", "radio");
  circle.setAttribute("name", "image");
  circle.setAttribute(
    "data-indexOfImage",
    `${Array.from(photoArray).indexOf(image)}`
  );

  const frame = document.querySelector(".frame");
  allCircles.appendChild(circle);
  allCircles.querySelector('[data-indexOfimage="0"]').checked = true;
  frame.appendChild(allCircles);
});
