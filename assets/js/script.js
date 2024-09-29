// Responsive MENU

const mobileMenu = () => {
    let menu = document.querySelector('nav ul');
    let btn = document.querySelector('.bottom-content button');

    if (btn.innerText === 'MENU') {
        menu.style.display = 'block';
        menu.style.borderRadius = '10px';
        btn.innerText = 'CLOSE';
    }

    else {
        menu.style.display = 'none';
        menu.style.borderRadius = '0';
        btn.innerText = 'MENU';

    }

}


// Animacija 

let textTag = document.querySelector('.tekst p');
let text = textTag.innerText;
console.log(text);

let splittedText = text.split("");
console.log(splittedText); // Provera

textTag.innerHTML = '';

for (let i = 0; i < splittedText.length; i++) {     
    if (splittedText[i] == " ") {
        splittedText[i] = "&nbsp;";
    }
    textTag.innerHTML += `<span>${splittedText[i]}</span>`;                


}

let span = document.querySelectorAll('span');

span.classList = 'fadeMove';

let k = 0;
let spans = document.querySelectorAll('.tekst p span');

let interval = setInterval(() => {
    let singleSpan = span[k];

    singleSpan.className = 'fadeMove';
    k++;

    if (k === spans.length) {
        clearInterval(interval);
    }
}, 70);


// Slider


let rBtn = document.querySelector('#right-btn');
let lBtn = document.querySelector('#left-btn');
let pictures = document.querySelectorAll('.slider-images img');

let imgNum = 0;

const displayNone = () => {
    pictures.forEach(img => {
        img.style.display = 'none';
    });
}


const moveRight = () => {
    displayNone();
    imgNum++;

    if (imgNum === pictures.length) {
        imgNum = 0;
    }
    pictures[imgNum].style.display = 'block';
}


const moveLeft = () => {
    displayNone();
    imgNum--;

    if (imgNum === -1) {
        imgNum = pictures.length -1;
    }
    pictures[imgNum].style.display = 'block';
}

lBtn.addEventListener('click', moveLeft);

// Animacija 

document.addEventListener("DOMContentLoaded", () => {
    const quote = document.querySelector(".quote1");

    const observerOptions = {
        root: null, 
        threshold: 0.1 // 10% elementa vidljivo
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Dodajem klase za animaciju
                quote.style.opacity = 1; 
                quote.style.transform = 'translateX(0)'; 
                observer.unobserve(quote); 
            }
        });
    }, observerOptions);

    observer.observe(quote); 
});






