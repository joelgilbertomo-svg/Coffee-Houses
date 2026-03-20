document.addEventListener("DOMContentLoaded", function () {

    let index = 0;

    const slider = document.querySelector(".slider-contenedor");
    const slides = document.querySelectorAll(".cafe1");
    const nextBtn = document.querySelector(".slider .next");
    const prevBtn = document.querySelector(".slider .prev");

    function moverSlider() {
        slider.style.transform = "translateX(-" + (index * 100) + "%)";
    }

    nextBtn.addEventListener("click", function () {
        index++;
        if (index >= slides.length) index = 0;
        moverSlider();
    });

    prevBtn.addEventListener("click", function () {
        index--;
        if (index < 0) index = slides.length - 1;
        moverSlider();
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") nextBtn.click()
        if (e.key === "ArrowLeft") prevBtn.click()
    });

    setInterval(function (){
        index++;
        if (index >= slides.length) index = 0;
        moverSlider();
    }, 10000)
});