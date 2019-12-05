'use strict';

function toggleSideMenu() {
    const iconWrap = document.querySelector('#icon-wrap');
    const menuWrap = document.querySelector('#menu-wrap');
    const menu = document.querySelector('#menu');

    iconWrap.addEventListener('click', () => {

        if (iconWrap.classList.contains('active')) {

            iconWrap.classList.remove('active');
            menuWrap.classList.add('invisible');

            document.body.style.overflow = 'auto';
        } else {
            iconWrap.classList.add('active');
            menuWrap.classList.remove('invisible');

            document.body.style.overflow = 'hidden';
        }
    })

}


window.onload = toggleSideMenu;
