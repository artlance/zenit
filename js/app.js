document.addEventListener('DOMContentLoaded', function() {

    function preventDefaultListener(e) { e.preventDefault(); }

    //remove no-js
    classie.remove(document.body, 'no-js');

    //ie class
    function msieversion() {
        let ua = window.navigator.userAgent;
        let msie = ua.indexOf("MSIE ");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            classie.add(document.body, 'ie');
        }
        return false;
    }
    msieversion();

    //scroll top
    window.addEventListener('scroll', function() {
        let scrollTopValue = document.documentElement.scrollTop;
        let pageElementClass = document.getElementById('page');
        if ( scrollTopValue > 0 ) {
            classie.add(pageElementClass, 'page_header_fixed');
        } else {
            classie.remove(pageElementClass, 'page_header_fixed');
        }
    });

    //dialog menu
    let menuModal = document.getElementById('menu__modal');
    if (menuModal) {
        let menuTrigger = document.getElementById('header__toggle'),
            menuModalJS = new DialogFx(menuModal, {
                onOpenDialog: function () {
                    classie.add(document.documentElement, 'modal__menu__opened');
                },
                onCloseDialog: function () {
                   classie.remove(document.documentElement, 'modal__menu__opened');
                }
            });
        menuTrigger.addEventListener('click', menuModalJS.toggle.bind(menuModalJS));
        menuTrigger.addEventListener('click', preventDefaultListener);
    }

    //cart remove
    let removeButton = document.querySelectorAll('.cart__item__remove');
    for (let i = 0; i < removeButton.length; i++) {
        removeButton[i].addEventListener('click', cartRemove);
        removeButton[i].addEventListener('click', preventDefaultListener);
    }
    function cartRemove() {
        let thisParent = this.closest('.cart__item');
        thisParent.remove();
        let parentsLength = document.querySelectorAll('.cart__item');
        if (!parentsLength.length) {
            let contentElement = document.getElementsByClassName('cart__content__first');
            classie.add(contentElement[0], 'hidden');
            let navigationElement = document.getElementsByClassName('cart__navigation__first');
            classie.add(navigationElement[0], 'hidden');
            let emptyElement = document.getElementsByClassName('cart__empty');
            classie.remove(emptyElement[0], 'hidden');
        }
    }

    //quantity change
    let quantityButtons = document.querySelectorAll('.button__quantity');
    for (let i = 0; i < quantityButtons.length; i++) {
        quantityButtons[i].addEventListener('click', quantityChange);
        quantityButtons[i].addEventListener('click', preventDefaultListener);
    }
    function quantityChange() {
        let thisParent = this.closest('.cart__item__quantity'),
            thisMinus = thisParent.getElementsByClassName('button__quantity__minus')[0],
            thisInput = thisParent.getElementsByClassName('input__quantity')[0],
            thisValue = parseInt(thisInput.value);
        if (this.classList.contains('button__quantity__plus')) {
            thisInput.value = thisValue + 1;
            classie.remove(thisMinus, 'button__quantity__disabled');
        } else if (thisValue > 1) {
            thisInput.value = thisValue - 1;
            if (thisValue == 2) {
                classie.add(this, 'button__quantity__disabled');
            }
        }
    }

    //dialog contract
    let contractModal = document.getElementById('modal__contract');
    if (contractModal) {
        let contractTrigger = document.getElementById('link__contract'),
            contractModalJS = new DialogFx(contractModal);
        contractTrigger.addEventListener('click', contractModalJS.toggle.bind(contractModalJS));
        contractTrigger.addEventListener('click', preventDefaultListener);
    }

    //cart navigation
    const cartStepFirst = document.getElementsByClassName('cart__column__first')[0],
          cartStepSecond = document.getElementsByClassName('cart__column__second')[0],
          cartStepThird = document.getElementsByClassName('cart__column__third')[0];
          cartElement = document.getElementsByClassName('cart')[0];

    let cartGoFirst = document.querySelectorAll('.button__go__first');
        cartGoSecond = document.querySelectorAll('.button__go__second');
        cartGoThird = document.querySelectorAll('.button__go__third');

    for (let i = 0; i < cartGoFirst.length; i++) {
        cartGoFirst[i].addEventListener('click', function() {
            classie.add(cartStepFirst, 'cart__column__active');
            classie.remove(cartStepFirst, 'cart__column__passed');
            classie.remove(cartStepSecond, 'cart__column__active');
            classie.remove(cartElement, 'cart__active__second');
            classie.remove(cartElement, 'cart__active__third');
            window.scrollTo({ top: 0, behavior: 'smooth'});
        });
        cartGoFirst[i].addEventListener('click', preventDefaultListener);
    }

    for (let i = 0; i < cartGoSecond.length; i++) {
        cartGoSecond[i].addEventListener('click', function() {
            classie.remove(cartStepFirst, 'cart__column__active');
            classie.add(cartStepFirst, 'cart__column__passed');
            classie.add(cartStepSecond, 'cart__column__active');
            classie.remove(cartStepSecond, 'cart__column__passed');
            classie.remove(cartStepThird, 'cart__column__active');
            classie.add(cartElement, 'cart__active__second');
            classie.remove(cartElement, 'cart__active__third');
            window.scrollTo({ top: 0, behavior: 'smooth'});
        });
        cartGoSecond[i].addEventListener('click', preventDefaultListener);
    }

    for (let i = 0; i < cartGoThird.length; i++) {
        cartGoThird[i].addEventListener('click', function() {
            classie.remove(cartStepSecond, 'cart__column__active');
            classie.add(cartStepSecond, 'cart__column__passed');
            classie.add(cartStepThird, 'cart__column__active');
            classie.remove(cartElement, 'cart__active__second');
            classie.add(cartElement, 'cart__active__third');
            window.scrollTo({ top: 0, behavior: 'smooth'});
        });
        cartGoThird[i].addEventListener('click', preventDefaultListener);
    }

    //tabs
    let myTabs = document.querySelectorAll('.gallery__thumbs__item');
    function myTabClicks(tabClickEvent) {
        for (let i = 0; i < myTabs.length; i++) {
            classie.remove(myTabs[i], 'active');
        }
        let clickedTab = tabClickEvent.currentTarget;
        classie.add(clickedTab, 'active');
        tabClickEvent.preventDefault();
        let myContentPanes = document.querySelectorAll('.gallery__photo');
        for (let i = 0; i < myContentPanes.length; i++) {
            classie.remove(myContentPanes[i], 'active');
        }
        let anchorReference = tabClickEvent.target;
        let activePaneId = anchorReference.getAttribute('href');
        let activePane = document.querySelector(activePaneId);
        classie.add(activePane, 'active');
    }
    for (let i = 0; i < myTabs.length; i++) {
        myTabs[i].addEventListener('click', myTabClicks)
    }

    //readmore
    let wordsNum = 9;
    let docWidth = document.body.clientWidth;
    if (docWidth > 1239) {
        wordsNum = 99999;
    }
    $readMoreJS.init({
        target: '.product__description p',
        numOfWords: wordsNum,
        toggle: true,
        moreLink: 'Подробнее',
        lessLink: 'Скрыть'
    });

    //mask
    let maskPhone = document.querySelectorAll('.input__tel');
    for (let i = 0; i < maskPhone.length; i++) {
        VMasker(maskPhone[i]).maskPattern('+9 (999) 999-99-99');
    }

    let maskNum = document.querySelectorAll('.input__num');
    for (let i = 0; i < maskNum.length; i++) {
        VMasker(maskNum[i]).maskPattern('99');
    }

    //countdown
    let clock = document.getElementById('clock');
    if (clock) {
        const getRemainingTime = deadline => {
            let now = new Date(),
                remainTime = (new Date(deadline) - now + 1000) / 1000,
                remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
                remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
                remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
                remainDays = Math.floor(remainTime / (3600 * 24));

            return {
                remainSeconds,
                remainMinutes,
                remainHours,
                remainDays,
                remainTime
            }
        };
        const countdown = (deadline, elem) => {
            const el = document.getElementById(elem);
            const timerUpdate = setInterval(() => {
                let t = getRemainingTime(deadline);
                el.innerHTML = `${t.remainHours} : ${t.remainMinutes} : ${t.remainSeconds}`;

                if (t.remainTime <= 1) {
                    clearInterval(timerUpdate);
                    classie.add(document.getElementsByClassName('page__status')[0], 'page__status__disabled');
                }
                classie.remove(document.getElementsByClassName('page__status')[0], 'page__status__none');

            }, 100)
        };
        countdown('Sep 21 2018 23:26:40 GMT+0300', 'clock');
    }

    //order
    let orderToggle = document.getElementById('order__toggle');
    if (orderToggle) {
        function orderShow() {
            classie.toggle(document.getElementsByClassName('order__panel__wrapper')[0], 'order__panel__open');
        }
        orderToggle.addEventListener('click', orderShow);
        orderToggle.addEventListener('click', preventDefaultListener);
    }


}); //DOMContentLoaded

window.addEventListener('load', function () {

    //catalog
    let catalogNavigation = document.getElementsByClassName('catalog__navigation')[0];
    if (catalogNavigation) {
        let catalogNavigationOffset = catalogNavigation.getBoundingClientRect().left,
            catalogActive = document.getElementsByClassName('catalog__menu__active')[0],
            catalogActiveOffset = catalogActive.getBoundingClientRect().left;
        let catalogNavigationScroll = parseInt(catalogActiveOffset) + parseInt(catalogNavigationOffset) - 17;
        catalogNavigation.scrollTo({ left: catalogNavigationScroll, behavior: 'smooth'});
    }

}, false);


