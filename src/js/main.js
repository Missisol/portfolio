'use strict';
const iconWrap = document.querySelector('#icon-wrap');
const menuWrap = document.querySelector('#menu-wrap');

function closeMenu() {
    iconWrap.classList.remove('active');
    menuWrap.classList.remove('visible');
    menuWrap.classList.add('invisible');
    document.body.style.overflow = 'auto';
}

function openMenu() {
    iconWrap.classList.add('active');
    menuWrap.classList.remove('invisible');
    menuWrap.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function toggleSideMenu() {

    iconWrap.addEventListener('click', () => iconWrap.classList.contains('active') ?
        closeMenu() : openMenu());

    menuWrap.addEventListener('click', () => {
        closeMenu();
    });
}


window.onload = toggleSideMenu;
