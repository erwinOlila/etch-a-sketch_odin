function makeDivs(h, u) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.height = `${h/u}`;
    square.textContent = " ";
    square.addEventListener('mouseenter', function(e) {
        e.target.style.backgroundColor = 'black';
    })

    return square; 
}


const width = 720;
const height = 720;

const container = document.querySelector('.container');
container.gridGap = '0';
container.style.border = '1px solid black';

const slider = document.querySelector('#slider');
const sliderValue = document.querySelector('#sliderValue');
sliderValue.textContent = slider.value;

slider.addEventListener('input', setSquares);
let counts = slider.value;

container.style.gridTemplateColumns = `repeat(${counts}, ${width/counts}px)`;
let firstDivs = Array(Math.pow(counts,2)).fill().map(function() {
    return makeDivs(height, counts);
})
container.replaceChildren(...firstDivs); 
container.style.gridTemplateColumns = `repeat(${counts}, ${width/counts}px)`;

function setSquares(e) {
    const value = this.value;

    let divs_array = Array(Math.pow(value,2)).fill().map(function() {
        return makeDivs(height, value);
    });

    container.replaceChildren(...divs_array);
    container.style.gridTemplateColumns = `repeat(${value}, ${width/value}px)`;
    sliderValue.textContent = this.value;
}


