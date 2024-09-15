var bmiInput = document.getElementById('bmiInput');
var pbfInput = document.getElementById('pbfInput');
var nameInput = document.getElementById('nameInput');

pbfInput.value = 17.5;
bmiInput.value = 22;

const containerWidth = 400;
const shapeHeight = 100;
var ratio, fontSize;

function onResize() {
    const width = window.innerWidth;

    // https://getbootstrap.com/docs/5.0/layout/breakpoints/#available-breakpoints
    if (width >= 1400) { // Very large desktops and full HD monitors
        ratio = 0.8
        fontSize = '16px';
    } else if (width >= 1200) { // Larger desktops and wide screens
        ratio = 0.8
        fontSize = '16px';
    } else if (width >= 992) { // Laptops and desktops
        ratio = 0.6
        fontSize = '18px';
    } else if (width >= 768) { // Tablets and small laptops
        ratio = 0.6
        fontSize = '18px';
    } else if (width >= 576) { // Larger mobile devices and small tablets
        ratio = 0.8
        fontSize = '16px';
    } else { // Mobile phones in portrait mode
        ratio = 1.2
        fontSize = '13px';
    }

    document.querySelectorAll('.container').forEach(function (container) {
        container.style.width = containerWidth / ratio + 'px';
    });

    document.querySelectorAll('.shape').forEach(function (shape) {
        shape.style.height = shapeHeight / ratio + 'px';
        shape.style.fontSize = fontSize;
    });

    drawPoint(pbfInput.value, bmiInput.value);
}

document.getElementById('redirect').addEventListener('click', function () {
    window.open('https://whatismybodytype.com/', '_self');
});

function setCustomListener(field) {
    field.addEventListener('input', function () {
        if (field.value < 0) {
            field.value = 0
        }

        if (field.value > 100) {
            field.value = 100
        }

        drawPoint(pbfInput.value, bmiInput.value);
    });
}

function drawPoint(pbf, bmi) {
    const point = document.getElementById('point');
    point.style.left = getPBF(pbf) + 'px';
    point.style.bottom = getBMI(bmi) + 'px';
}

function getPBF(pbf) {
    var pbfInPx = 0

    if (pbf < 5) {
        pbf = 5;
    } else if (pbf > 25) {
        pbf = 25;
    }

    pbfInPx = 20 * pbf - 100;
    pbfInPx = pbfInPx / ratio
    return pbfInPx - 5;
}

function getBMI(bmi) {
    var bmiInPx = 0

    if (bmi < 15) {
        bmi = 15;
    } else if (bmi > 28) {
        bmi = 28;
    }

    if (bmi <= 22) {
        bmiInPx = (bmi - 15) * 100 / 3.5
    } else {
        bmiInPx = (bmi - 22) * 100 / 3 + 200
    }

    bmiInPx = bmiInPx / ratio
    return bmiInPx - 5;
}

setCustomListener(pbfInput);
setCustomListener(bmiInput);

window.addEventListener('resize', onResize);
onResize();