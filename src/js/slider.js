(function(){
    $('.slider__hide-info-btn').on('click', function (e) {
        e.preventDefault();
    });
    $('.arrow').on('click', function (e) {
        e.preventDefault();
    });
    
    
    
    $(document).ready(function () {
        $('.slider').slick({
            prevArrow: $('.slider__btn--left'),
            nextArrow: $('.slider__btn--right')
        });
    });
    
})()