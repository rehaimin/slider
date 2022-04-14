let slidesIds = [];
let translateXValue = "-100vw";
let slides = document.querySelectorAll("[id*=slide-]");
let bottomBtnsDiv = document.querySelector(".bottom-btns");

slides.forEach((el) => {
	slidesIds.push(el.id);
	bottomBtnsDiv.innerHTML =
		bottomBtnsDiv.innerHTML + "<button key=" + el.id + "></button>";
});

let cpt = 0;
changeCurrentSlideOpacity();

const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");

function hideAllSlides(translateXValue) {
	document.querySelectorAll("[id*=slide-]").forEach((el) => {
		el.style = "transform:translateX(" + translateXValue + ")";
	});
	console.log(
		document.querySelector("[id*=slide-]").getBoundingClientRect().left
	);
}

function showSlide(translateXValue) {
	hideAllSlides(translateXValue);
	document.getElementById(slidesIds[cpt]).style =
		"transition:.5s; transform:translateX(0)";
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
	cpt--;
	if (cpt < 0) cpt = slidesIds.length - 1;
	showSlide(translateXValue);
});

btnRight.addEventListener("click", () => {
	cpt++;
	if (cpt > slidesIds.length - 1) cpt = 0;
	translateXValue = "100vw";
	showSlide(translateXValue);
});
bottomBtnsDiv.addEventListener("click", (e) => {
	if (e.target.hasAttribute("key")) {
		let key = e.target.getAttribute("key");
		console.log(key);
		if (key != slidesIds[cpt]) {
			hideAllSlides(translateXValue);
			document.getElementById(key).style =
				"transition:.5s; transform:translateX(0)";
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
// 	if (cpt < slidesIds.length - 1) {
// 		cpt++;
// 	} else {
// 		cpt = 0;
// 	}
// 	showSlide("-100vw");
// }, 5000);
