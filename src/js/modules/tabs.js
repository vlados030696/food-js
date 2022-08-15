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
    export default tabs;