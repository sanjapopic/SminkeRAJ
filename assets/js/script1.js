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


const proizvodi = document.querySelectorAll(".proizvodi");


proizvodi.forEach(proizvod => {
    proizvod.addEventListener("click", function() {
        const tekstContainer = this.nextElementSibling;
        const isOpen = tekstContainer.classList.contains("show");

        // Prvo zatvaram sve otvorene tekst kontejnere
        proizvodi.forEach(p => {
            const container = p.nextElementSibling;
            if (container.classList.contains("show") && container !== tekstContainer) {
                container.classList.remove("show"); 
                const plusSpan = p.querySelector(".plus"); 
                plusSpan.classList.remove("rotate"); 
            }
        });

        // Ako je trenutni kontejner već otvoren, zatvaramo ga; inače, otvaramo ga
        if (isOpen) {
            tekstContainer.classList.remove("show"); 
            const plusSpan = this.querySelector(".plus"); 
            plusSpan.classList.remove("rotate"); 
        } else {
            tekstContainer.classList.add("show"); 
            const plusSpan = this.querySelector(".plus"); 
            plusSpan.classList.add("rotate"); 
        }
    });
});



// Slider image-list

//Upravljanje povlačenjem klizača na scrollbar-u.

const slider = () => {
    const imageList = document.querySelector(".slider-wrapper1 .images-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper1 .button");
    const sliderScrollbar = document.querySelector(".t-content .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;


    //Ažurirana pozicija klizača prilikom pomeranja miša
    scrollbarThumb.addEventListener("mousedown", (e) =>  {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width  - scrollbarThumb.offsetWidth;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // Uklanjanje event listeners na mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Dodavanje event listeers za interakciju povlačenjem
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });


    // Slajd 
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAlmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAlmount, behavior: "smooth"});
        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }

    //Ažuriranje pozicijue klizača na scrollbar-u na osnovu pomeranja slika
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    });
}
// Kada se ucita cela stranica onda se poziva funkcija slajder
window.addEventListener("load", slider);
