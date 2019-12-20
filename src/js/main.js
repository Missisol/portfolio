'use strict';

const message = `Привет. Меня зовут Марина. Я верстаю сайты с помощью HTML, CSS и JS.
Люблю минимализм и сложные задачи.`;
const postfixes = ['one', 'two', 'three', 'four', 'five'];
let counter = 0;
const src = 'assets/libs/luxon.min.js';
const iconWrap = document.querySelector('#icon-wrap');
const menuWrap = document.querySelector('#menu-wrap');
const anchors = document.querySelectorAll('.anchor');
const arrow = document.querySelector('.arrow');
const main = document.querySelector('.main');
const textContainer = document.querySelector('.main__text_greeting');
const images = document.querySelectorAll('.portfolio__image');
const second = document.querySelector('#second');
const minute = document.querySelector('#minute');
const hour = document.querySelector('#hour');
const day = document.querySelector('#day');
const month = document.querySelector('#month');
const year = document.querySelector('#year');
const spinner = document.querySelector('.main__spinner-wrap');

function currentYPosition() {
    if (window.pageYOffset) {
        return window.pageYOffset;
    }
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

function isVisibleTop(elem) {
    let coords = elem.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;
    return coords.top > 0 && coords.top < windowHeight;
}

function isVisibleBottom(elem) {
    let coords = elem.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;
    return coords.bottom < windowHeight && coords.bottom > 0;
}

function isVisibleBoth(elem) {
    let coords = elem.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;
    let topVisible = coords.top > 0 && coords.top < windowHeight;
    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
    return topVisible && bottomVisible;
}

function checkInitImagesVisibility() {
    for (let image of images) {
        if (isVisibleBoth(image) && !image.classList.contains('scale')) {
            image.classList.add('scale')
        } else if (!isVisibleBoth(image) && image.classList.contains('scale')) {
            image.classList.remove('scale')
        }
    }
}

function checkImageVisibility(str) {
    for (let image of images) {
        if (str === 'up') {
            for (let image of images) {
                if (isVisibleTop(image) && !isVisibleBottom(image)) {
                    image.classList.remove('scale')
                } else if (!isVisibleTop(image) && isVisibleBottom(image)) {
                    image.classList.add('scale')
                }
            }
        } else if (str === 'down') {
            for (let image of images) {
                if (isVisibleTop(image) && !isVisibleBottom(image)) {
                    image.classList.add('scale')
                } else if (!isVisibleTop(image) && isVisibleBottom(image)) {
                    image.classList.remove('scale')
                }
            }
        }
    }
}

function getScrollDirection() {
    let lastScrollPosition = 0;
    document.addEventListener('scroll', () => {
        let position = window.pageYOffset;
        position > lastScrollPosition ? checkImageVisibility('down') :
            checkImageVisibility('up');
        lastScrollPosition = position;
    })
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
    menuWrap.classList.contains('hidden') ? menuWrap.classList.remove('hidden') : null;
    iconWrap.classList.add('active');
    menuWrap.classList.add('visible');
    menuWrap.classList.remove('invisible');
    document.body.style.overflow = 'hidden';
}

function toggleSideMenu() {
    if (!!iconWrap) {
        iconWrap.addEventListener('click', () => iconWrap.classList.contains('active') ?
            closeMenu() : openMenu());
    }

    if (!!menuWrap) {
        menuWrap.addEventListener('click', () => closeMenu());
    }
}

function addEventListenersToAnchors() {
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

function typing() {
    textContainer.innerHTML = message.substring(0, counter);
    const timer = setTimeout('typing()', 50);
    counter === message.length ? clearTimeout(timer) : counter++;
}

function makeAnimation() {
    spinner.style.display = 'none';

    for (let postfix of postfixes) {
        const elem = document.querySelector(`.main__title-${postfix}`);
        elem.classList.add('animate-title');
    }
}

function getEndingForSecondsMinutes(num) {
    let ending = '';
    if (num >= 11 && num < 15) {
        ending = '';
    } else if (num % 10 === 1) {
        ending = 'у';
    } else if (num % 10 > 1 && num % 10 < 5) {
        ending = 'ы';
    } else {
        ending = '';
    }
    return ending;
}

function getEndingForHoursMonth(num, str) {
    let ending = '';
    if (num >= 11 && num < 15) {
        str === 'час' ? ending = 'ов' : ending = 'ев';
    } else if (num % 10 === 1) {
        ending = '';
    } else if (num % 10 > 1 && num % 10 < 5) {
        ending = 'а';
    } else {
        str === 'час' ? ending = 'ов' : ending = 'ев';
    }
    return ending;
}

function getTextForDays(num) {
    let text = '';
    if (num >= 11 && num < 15) {
        text = 'дней';
    } else if (num % 10 === 1) {
        text = 'день';
    } else if (num % 10 > 1 && num % 10 < 5) {
        text = 'дня';
    } else {
        text = 'дней';
    }
    return text;
}

function getTextForYears(num) {
    let text = '';
    if (num === 1) {
        text = 'год';
    } else if (num > 1 && num <= 4) {
        text = 'года';
    } else if (num < 1 || num > 4) {
        text = 'лет';
    }
    return text;
}

function getInterval() {
    let DateTime = luxon.DateTime;
    let Interval = luxon.Interval;
    let now = DateTime.local();
    let earlier = DateTime.local(2018, 6, 3);
    const i = Interval.fromDateTimes(earlier, now);
    return i.toDuration([
        'years', 'months', 'days', 'hours', 'minutes', 'seconds'
    ]).toObject();
}

function getAllTimes() {
    let interval = getInterval();

    const text = getTextForYears(interval.years);
    year.textContent = String(`${interval.years} ${text}`);

    const textMonth = 'месяц';
    const endingMonth = getEndingForHoursMonth(interval.months, textMonth);
    month.textContent = String(`${interval.months} ${textMonth}${endingMonth}`);

    const textDay = getTextForDays(interval.days);
    day.textContent = String(`${interval.days} ${textDay}`);

    const textHour = 'час';
    const endingHour = getEndingForHoursMonth(interval.hours, textHour);
    hour.textContent = String(`${interval.hours} ${textHour}${endingHour}`);

    const textMinute = 'минут';
    const endingMinute = getEndingForSecondsMinutes(interval.minutes);
    minute.textContent = String(`${interval.minutes} ${textMinute}${endingMinute}`);

    const textSecond = 'секунд';
    const endingSecond = getEndingForSecondsMinutes(Math.round(interval.seconds));
    second.textContent = String(`${Math.round(interval.seconds)} ${textSecond}${endingSecond}`);
}

function getSeconds() {
    const seconds = +getInterval().seconds;
    const text = 'секунд';
    const ending = getEndingForSecondsMinutes(Math.round(seconds));
    second.textContent = String(`${Math.round(seconds)} ${text}${ending}`);
}

function getMinutes() {
    const minutes = +getInterval().minutes;
    const text = 'минут';
    const ending = getEndingForSecondsMinutes(minutes);
    minute.textContent = String(`${minutes} ${text}${ending}`);
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error('error'));
        document.head.append(script);
    })
}

function init() {
    loadScript(src)
        .then(() => getAllTimes())
        .then(() => makeAnimation())
        .then(() => setTimeout('typing()', 800))
        .then(() => {
            setTimeout(function cb() {
                getSeconds();
                setTimeout(cb, 1000)
            }, 1000);

            setTimeout(function cb() {
                getMinutes();
                setTimeout(cb, 60000)
            }, 60000);
        })
        .catch(error => console.log('error'));

    toggleSideMenu();
    toggleVisibilityOfTheArrow();
    addEventListenersToAnchors();
    checkInitImagesVisibility();
    getScrollDirection();

    document.addEventListener('scroll', (e) => {
        toggleVisibilityOfTheArrow();
    });
}

window.onload = init;
