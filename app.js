let slidesIds = [];
let translateXValue = "-100%";
let slides = document.querySelectorAll("[id*=slide-]");
let bottomBtnsDiv = document.querySelector(".bottom-btns");
let sliderSpeed = "1s";

slides.forEach((el) => {
	slidesIds.push(el.id);
	bottomBtnsDiv.innerHTML =
		bottomBtnsDiv.innerHTML + "<button key=" + el.id + "></button>";
});

let cpt = 0;
changeCurrentSlideOpacity();

const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
let currentSliderID = slidesIds[cpt];
showSlide(translateXValue);
function hideAllSlides(translateXValue) {
	document.querySelectorAll("[id*=slide-]").forEach((el) => {
		if (el.id != currentSliderID) {
			el.style = "transform:translateX(" + translateXValue + ")";
		} else {
			el.style =
				"transition:" +
				sliderSpeed +
				";transform:translateX(" +
				translateXValue +
				")";
		}
	});
}

function showSlide(translateXValue) {
	hideAllSlides(translateXValue);
	document.getElementById(slidesIds[cpt]).style =
		"transition:" + sliderSpeed + "; transform:translateX(0)";
	changeCurrentSlideOpacity();
}
function changeCurrentSlideOpacity() {
	document.querySelector("button[key=" + slidesIds[cpt] + "]").style =
		"opacity : 1;";
	document
		.querySelectorAll("button:not([key=" + slidesIds[cpt] + "])")
		.forEach((el) => {
			el.style = "";
		});
}

btnLeft.addEventListener("click", () => {
	currentSliderID = slidesIds[cpt];
	cpt--;
	if (cpt < 0) cpt = slidesIds.length - 1;

	showSlide(translateXValue);
});

btnRight.addEventListener("click", () => {
	currentSliderID = slidesIds[cpt];
	cpt++;
	if (cpt > slidesIds.length - 1) cpt = 0;
	translateXValue = "-100%";
	showSlide(translateXValue);
});
bottomBtnsDiv.addEventListener("click", (e) => {
	currentSliderID = slidesIds[cpt];
	if (e.target.hasAttribute("key")) {
		let key = e.target.getAttribute("key");
		if (key != slidesIds[cpt]) {
			hideAllSlides(translateXValue);
			document.getElementById(key).style =
				"transition:" +
				sliderSpeed +
				"; transform:translateX(0);transform-origin:right";
			for (let i = 0; i < slidesIds.length; i++) {
				const element = slidesIds[i];
				if (slidesIds[i] == key) {
					cpt = i;
				}
			}
			changeCurrentSlideOpacity();
		}
	}
});

// setInterval(() => {
// 	currentSliderID = slidesIds[cpt];
// 	if (cpt < slidesIds.length - 1) {
// 		cpt++;
// 	} else {
// 		cpt = 0;
// 	}
// 	showSlide("-100%");
// }, 3000);
