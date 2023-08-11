const openMenuButton = document.querySelector('.nav__hide')
const closeMenuButton = document.querySelector('.menu__close');
const menuOpen = document.querySelector('.menu__open');
openMenuButton.addEventListener('click', function(e){
    e.preventDefault();
    menuOpen.style.display = 'flex';
})

closeMenuButton.addEventListener('click', function(e){
   e.preventDefault();
});

menuOpen.addEventListener('click', function(e){
    const targets = e.target.classList
    if(!targets.contains('menu__open-list') && !targets.contains('menu__open-item') && !targets.contains('menu__open-link')){
        menuOpen.style.display = 'none';
    }
})


////// accardeon


$('.team__name').on('click', function(e){
    e.preventDefault();
    $('.team__content').not($(this).parent()).removeClass('team__content--active');
    $(e.target).parent().toggleClass('team__content--active');


    // $('.team__info').not($(this).next()).slideUp(1000);
    // $(this).next().slideToggle(1000);
    // console.log($(this).next())
});

//// slider 
$('.slider__hide-info-btn').on('click', function(e){
    e.preventDefault();
});
$('.arrow').on('click', function(e){
    e.preventDefault();
});

    

$(document).ready(function(){
    $('.slider').slick({
        prevArrow: $('.slider__btn--left'),
        nextArrow: $('.slider__btn--right')
    });
  });

////// reviews


let slideIndex = 1;

function showSlide(index) {
    $(`.review--${index}`).css('display', 'flex');
    $('.reviews__item').removeClass('reviews__item--active');
    $(`.reviews__link#${index}`).parent().addClass('reviews__item--active');
}

function hideAllSlides() {
    $('.review--1, .review--2, .review--3').css('display', 'none');
}

$('.reviews__link').on('click', function(e) {
    e.preventDefault();

    hideAllSlides();
    const id = parseInt(this.id);
    slideIndex = id;
    showSlide(id);
});

function nextSlide() {
    hideAllSlides();
    slideIndex = (slideIndex % 3) + 1;
    showSlide(slideIndex);
}

setInterval(nextSlide, 3000);
