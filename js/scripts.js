/*!
* Start Bootstrap - Creative v7.0.6 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

      const images = new Array(3);

      let currentIndex = 0;
      const glitchImages = document.querySelectorAll(".glitch-image");

      function updateCarousel() {
        glitchImages.forEach((image, index) => {
          if (index === currentIndex) {
            image.classList.add("current");
          } else {
            image.classList.remove("current");
          }
        });
      }

        function startCarousel() {
          setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
          }, 15000);
        }

      startCarousel();




    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        const brandLogo = document.body.querySelector('.brand-logo');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
            brandLogo.classList.remove('active')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
            brandLogo.classList.add('active')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

          // Activate SimpleLightbox plugin for portfolio items
          new SimpleLightbox({
              elements: '#portfolio a.portfolio-box img'
          });

    const canvas = document.createElement('canvas');
    const container = document.getElementById('canvas-container');
    container.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });


    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);



});

const modal = document.getElementById('modal');
const fullImage = document.getElementById('full-image');

const thumbnails = document.querySelectorAll('.gallery a');

// / set cookie expiration time to the past
var expires = new Date(0).toUTCString();

// set cookie value and SameSite attribute
document.cookie = "mycookie=myvalue; expires=" + expires + "; SameSite=None";

// Initialize a variable to keep track of the current image index
let currentImageIndex = 0;

// Loop through the thumbnails and add a click event listener
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', function(event) {
    event.preventDefault();
    const imageSrc = this.getAttribute('data-image');
    fullImage.src = imageSrc;
    modal.style.display = 'block';
    currentImageIndex = index;
    document.body.style.overflow = 'hidden';
  });
});

// When the user clicks on the "Next" button, show the next image
const nextBtn = document.querySelector('.next');
nextBtn.addEventListener('click', function() {
  currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
  const nextImageSrc = thumbnails[currentImageIndex].getAttribute('data-image');
  fullImage.src = nextImageSrc;
});

// When the user clicks on the "Previous" button, show the previous image
const prevBtn = document.querySelector('.prev');
prevBtn.addEventListener('click', function() {
  currentImageIndex = (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
  const prevImageSrc = thumbnails[currentImageIndex].getAttribute('data-image');
  fullImage.src = prevImageSrc;
});


const stopAllVideos = () => { 
  var iframes = document.querySelectorAll('iframe');


  Array.prototype.forEach.call(iframes, iframe => { 

    iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', 
  func: 'stopVideo' }), '*');
 });
}


// close modal when user clicks outside of it
const closeBtn = document.querySelector('.close');
window.onclick = function(event) {
  if (event.target == modal || event.target == closeBtn) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    stopAllVideos();
  }
};


// ---------------------------------------ENABLE COUNTDOWN TIMER BELOW ---------------------------------------------

// Set the date we're counting down to
// var countDownDate = new Date("May 6, 2023 12:00:00").getTime();

// // Update the count down every 1 second
// var x = setInterval(function() {

//   // Get today's date and time
//   var now = new Date().getTime();

//   // Find the distance between now and the count down date
//   var distance = countDownDate - now;

//   // Calculate days, hours, minutes and seconds
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//   // Output the result in an element with id="countdown"
//   document.querySelector("#countdown .days").textContent = days;
//   document.querySelector("#countdown .hours").textContent = hours;
//   document.querySelector("#countdown .minutes").textContent = minutes;
//   document.querySelector("#countdown .seconds").textContent = seconds;

//   // If the count down is over, show a message
//   if (distance < 0) {
//     clearInterval(x);
//     document.querySelector("#countdown").innerHTML = "Event has ended.";
//   }
// }, 1000);


// const openEventDetails = document.querySelector('.open_event_details');
// const modalContainer = document.querySelector('.event_modal-container');
// const closeModal = document.querySelector('.close-event_modal');

// openEventDetails.addEventListener('click', function() {
//   modalContainer.style.display = 'flex';
// });

// closeModal.addEventListener('click', function() {
//   modalContainer.style.display = 'none';
// });

// ---------------------------------------------------------------- END COUNTDOWN TIMER ---------------------------------------------

