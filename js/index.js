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

$('.reviews__link').on('click', function(e){
    e.preventDefault();
    
    $(this).parent().addClass('reviews__item--active');
    $('.reviews__item').not($(this).parent()).removeClass('reviews__item--active');
    if(this.id == 1){
        $('.review--1').css('display', 'flex');
        $('.review--2').css('display', 'none');
        $('.review--3').css('display', 'none');   
    }else if(this.id == 2){
        $('.review--2').css('display', 'flex');
        $('.review--1').css('display', 'none');
        $('.review--3').css('display', 'none');
    }else if(this.id == 3){
        $('.review--3').css('display', 'flex');
        $('.review--1').css('display', 'none');
        $('.review--2').css('display', 'none');
    };

    
});
