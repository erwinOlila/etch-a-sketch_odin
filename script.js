function makeDivs(h, u) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.height = `${h/u}`;
    square.textContent = " ";
    square.addEventListener('mouseenter', function(e) {
        e.target.style.backgroundColor = colorful ? `rgba(${rndm(255)},${rndm(255)},${rndm(255)},1)` : erase ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)';
    })

    return square; 
}


let counter = 10;
let colorful = false;
let erase = false;

const container = document.querySelector('.container');
container.gridGap = '0';
container.style.border = '1px solid black';

const width = container.clientWidth + 1;
const height = container.clientHeight + 1;

const slider = document.querySelector('#slider');
const sliderValue = document.querySelector('#sliderValue');
sliderValue.textContent = slider.value;

const colors = document.querySelectorAll('button:not(#clear)');
const clear = document.querySelector('#clear');

colors.forEach(color => {
    if (color.id === 'black') {
        color.classList.add('hover');
    }
    color.addEventListener('click', setColor);
})

function setColor() {
    colors.forEach(color => {
        color.classList.remove('hover');
    });

    this.classList.add('hover');
    if (this.id === 'colorful') {
        colorful = true;
    } else {
        colorful = false;
        if (this.id === 'erase') {
            erase = true;
        } else {
            erase = false;
        }
    }
}

function rndm(max) {
    return Math.floor((Math.random() * max) + 1);
}

slider.addEventListener('input', setSquares);
clear.addEventListener('click', setSquares);
let counts = slider.value;

container.style.gridTemplateColumns = `repeat(${counts}, ${width/counts}px)`;
let firstDivs = Array(Math.pow(counts,2)).fill().map(function() {
    return makeDivs(height, counts);
})
container.replaceChildren(...firstDivs); 
container.style.gridTemplateColumns = `repeat(${counts}, ${width/counts}px)`;

function setSquares() {
    let value = 0;
    if(this.value) {
        value = this.value;
    } else {
        value = slider.value;
    }
    

    let divs_array = Array(Math.pow(value,2)).fill().map(function() {
        return makeDivs(height, value);
    });

    container.replaceChildren(...divs_array);
    container.style.gridTemplateColumns = `repeat(${value}, ${width/value}px)`;
    sliderValue.textContent = value;
}


