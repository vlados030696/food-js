import {closeModal, openModal} from './modal';

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
        openModal();

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
            closeModal();
        }, 4000);
    }
}
export default forms;