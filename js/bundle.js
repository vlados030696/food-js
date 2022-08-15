/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

   

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {

            result.textContent = '0';
            return;

        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);

        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }

        });

    }
    initLocalSettings('#gender', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big', 'calculating__choose-item_active');

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {

                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));

                }
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);

                calcTotal();
            });
        });

    }
    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '2px solid red';
            } else {
                input.style.border = '2px solid lightgreen';
            }
            if (input.value === '') {
                input.style.border = '';

            }

            switch (input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;
        this.changeToUAH();
    }

    changeToUAH() {
        this.price = this.price * this.transfer;
    }

    render() {
        const element = document.createElement('div');

        if (this.classes.length === 0) {
            this.classes = "menu__item";
            element.classList.add(this.classes);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }

        element.innerHTML = `
              <img src=${this.src} alt=${this.alt}>
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.descr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
              </div>
          `;
        this.parent.append(element);
    }
}
/*   
                            Шаблонизация через MenuCard */
const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        new Error(`Could not load ${url}, status code ${res.status}`);
    }
    return await res.json();
};

getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({
            img,
            altimg,
            title,
            descr,
            price
        }) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();

        });

    });


/*                     БЕЗ ШАБЛОНА  */
// getResource('http://localhost:3000/menu')
//     .then(data => createCard(data));

// function createCard(data) {
//     data.forEach(({img, altimg, title, descr, price}) => {
//         const element = document.createElement('div');

//         element.classList.add("menu__item");

//         element.innerHTML = `
//             <img src=${img} alt=${altimg}>
//             <h3 class="menu__item-subtitle">${title}</h3>
//             <div class="menu__item-descr">${descr}</div>
//             <div class="menu__item-divider"></div>
//             <div class="menu__item-price">
//                 <div class="menu__item-cost">Цена:</div>
//                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
//             </div>
//         `;
//         document.querySelector(".menu .container").append(element);
//     });
// }

/*   new MenuCard(
      "img/tabs/vegy.jpg",
      "vegy",
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      9,
      ".menu .container"
  ).render();

  new MenuCard(
      "img/tabs/post.jpg",
      "post",
      'Меню "Постное"',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
      14,
      ".menu .container"
  ).render();

  new MenuCard(
      "img/tabs/elite.jpg",
      "elite",
      'Меню “Премиум”',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      21,
      ".menu .container"
  ).render(); */
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");


function forms() {
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPpostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'

            },
            body: data

        });
        return await res.json();
    };

    function bindPpostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                  display: block;
                  margin: 0 auto;
              `;
            form.insertAdjacentElement('afterend', statusMessage);
            /* POST BY FETCH */
            const formData = new FormData(form);
            /*   const object = {};
              formData.forEach(function(value, key){
                  object[key] = value;
              }); */
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            postData('http://localhost:3000/requests', json)

                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();

                }).catch(() => {
                    showThanksModal(message.failure);

                }).finally(() => {
                    form.reset();

                });

            /* POST BY XMLHttpRequest */
            /*  const request = new XMLHttpRequest();
              request.open('POST', 'js/server.php');
              request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
              const formData = new FormData(form);
  
              const object = {};
              formData.forEach(function(value, key){
                  object[key] = value;
              });
              const json = JSON.stringify(object);
  
              request.send(json);
  
              request.addEventListener('load', () => {
                  if (request.status === 200) {
                      console.log(request.response);
                      showThanksModal(message.success);
                      statusMessage.remove();
                      form.reset();
                  } else {
                      showThanksModal(message.failure);
                  }
              }); */
        });
    }



    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
              <div class="modal__content">
                  <div class="modal__close" data-close>×</div>
                  <div class="modal__title">${message}</div>
              </div>
          `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)();
        }, 4000);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
    function tabs() {
        const tabs = document.querySelectorAll(".tabheader__item"),
            tabsContent = document.querySelectorAll(".tabcontent"),
            tabsParent = document.querySelector(".tabheader__items");


        function hideTabContent() {

            tabsContent.forEach(item => {
                //item.style.display = "none";
                item.classList.add('hide');
                item.classList.remove('show');

            });

            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');

            });
        }

        function showTabContent(i = 0) {
            //tabsContent[i].style.display = "block";
            tabsContent[i].classList.add('show', 'tabcontent__animation');
            tabsContent[i].classList.remove('hide');
            //tabsContent[i].classList.add("tabcontent__animation")
            tabs[i].classList.add('tabheader__item_active');

        }



        hideTabContent();
        showTabContent();

        tabsParent.addEventListener('click', (event) => {
            const target = event.target;

            if (target && target.classList.contains("tabheader__item")) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }

        });
    }
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");











window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('.modal', modalTimerId), 50000);

    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2022-10-11');

    });
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map