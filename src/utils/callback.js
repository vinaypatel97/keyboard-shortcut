import React from 'react';

export const callbackFn = {
    turnGreen: (desc) => {
        const elm = document.getElementById('displayBox');
        const content = elm.getElementsByClassName('content')[0];
        content.innerHTML = desc;
        elm.style.backgroundColor = 'green';
    },
    turnRed: (desc) => {
        const elm = document.getElementById('displayBox');
        const content = elm.getElementsByClassName('content')[0];
        content.innerHTML = desc;
        elm.style.backgroundColor = 'red';
    },
    turnYellow: (desc) => {
        const elm = document.getElementById('displayBox');
        const content = elm.getElementsByClassName('content')[0];
        content.innerHTML = desc;
        elm.style.backgroundColor = 'yellow';
    },
}