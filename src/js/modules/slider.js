function slider() {
    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total');
    let slideIndex = 1;


    showSlides(slideIndex);
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    }
    if (slides.length > 10) {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;

        }
        if (n < 1) {

            slideIndex = slides.length;
        }

        slides.forEach(item => item.style.display = 'none');
        slides[slideIndex - 1].style.display = 'block';

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        }
        if (slides.length > 10) {
            current.textContent = slideIndex;
        }
    }

    function plusSldes(n) {
        showSlides(slideIndex += n);

    }
    prev.addEventListener('click', () => {
        plusSldes(-1);
    });
    next.addEventListener('click', () => {
        plusSldes(1);
    });
}
export default slider;