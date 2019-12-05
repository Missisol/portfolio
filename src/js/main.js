'use strict';

const iconWrap = document.querySelector('#icon-wrap');
const menuWrap = document.querySelector('#menu-wrap');
const anchors = document.querySelectorAll('.anchor');
const arrow = document.querySelector('.arrow');
const main = document.querySelector('.main');

function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

function elmYPosition(eID) {
    const elm = document.querySelector(eID);
    let y = elm.offsetTop;
    let node = elm;
    while (node.offsetParent && node.offsetParent !== document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    }
    return y;
}

function smoothScroll(eID) {
    const startY = currentYPosition();
    const stopY = elmYPosition(eID) - 24;
    const distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY);
        return;
    }
    let speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    let step = Math.round(distance / 25);
    let leapY = stopY > startY ? startY + step : startY - step;
    let timer = 0;
    if (stopY > startY) {
        for (let i = startY; i < stopY; i += step) {
            setTimeout(`window.scrollTo(0, ${leapY})`, timer * speed);
            leapY += step;
            if (leapY > stopY) leapY = stopY;
            timer++;
        }
        return;
    }
    for (let i = startY; i > stopY; i -= step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY -= step;
        if (leapY < stopY) leapY = stopY;
        timer++;
    }
}

function toggleVisibilityOfTheArrow() {
    let coords = main.getBoundingClientRect();

    coords.top > 0 ? arrow.style.opacity = '0'
        : arrow.style.opacity = '1';
}

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

function checkForScrolling() {
    for (let anchor of anchors) {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;
            const id = target.getAttribute('href');
            (id && id !== '#') ? smoothScroll(id) : null;
        })
    }

    arrow.addEventListener('click', () => {
        smoothScroll('#home');
    })

}

function init() {
    toggleSideMenu();
    checkForScrolling();
    toggleVisibilityOfTheArrow();

    document.addEventListener('scroll', () => {
        toggleVisibilityOfTheArrow();
    });
}

window.onload = init;
