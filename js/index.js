const wrapper = $('.wrapper');
const section = $('.section');
const openMenuButton = document.querySelector('.nav__hide')
const closeMenuButton = document.querySelector('.menu__close');
const menuOpen = document.querySelector('.menu__open');

var md = new MobileDetect(window.navigator.userAgent);

openMenuButton.addEventListener('click', function (e) {
    e.preventDefault();
    menuOpen.style.display = 'flex';
})

closeMenuButton.addEventListener('click', function (e) {
    e.preventDefault();
});

menuOpen.addEventListener('click', function (e) {
    const targets = e.target.classList
    if (!targets.contains('menu__open-list') && !targets.contains('menu__open-item') && !targets.contains('menu__open-link')) {
        menuOpen.style.display = 'none';
    }
})


////// accardeon

const openItem = item => {
    const container = item.closest('.teams__item');
    const contentBlock = container.find('.team__content');
    const nameBlock = container.find('.team__name');
    const textBlock = contentBlock.find('.team__info');
    const reqHeight = textBlock.height();

    // color



    container.addClass('active')
    nameBlock.addClass('team__name--active')
    contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
    const items = $(container).find('.team__content');
    const itemContainer = container.find('.teams__item');
    const nameContainer = container.find('.team__name');

    nameContainer.removeClass('team__name--active');
    itemContainer.removeClass('active');
    items.height(0);
}


$('.team__name').on('click', function (e) {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const container = $this.closest('.teams__list')
    const elemContainer = container.find('.teams__item');


    if (elemContainer.hasClass('active')) {
        closeEveryItem(container)
    } else {
        closeEveryItem(container)
        openItem($this)
    }
});

//// slider 
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

////// reviews

const findBlockAlias = (alias) => {
    return $('.review').filter((ndx, item) => {
        return $(item).attr('data-link') === alias;
    });
}

$('.reviews__link').on('click', function (e) {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr('data-open');
    const itemToShow = findBlockAlias(target);
    const curItem = $this.closest('.reviews__item');

    itemToShow.addClass('review--active').siblings().removeClass('review--active');
    curItem.addClass('reviews__item--active').siblings().removeClass('reviews__item--active');
})




////// form 


const myForm = document.querySelector('.form__order');
const sendForm = $('#buy');


const validateFields = function (form, fieldsArray) {
    fieldsArray.forEach(field => {
        field.removeClass('form__input--error')
        if (field.val().trim() === "") {
            field.addClass('form__input--error')
        }
    })
    const errorFields = form.find('.form__input--error');
    return errorFields.length == 0;
}
sendForm.on('click', function (e) {
    e.preventDefault();

    const form = $('.form');
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");
    const content = $('.modal__content');
    const isValid = validateFields(form, [name, phone, comment, to])
    content.removeClass('modal__content--error');
    if (isValid) {
        const request = $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val(),
            },
        });
        request.done(data => {
            content.text(data.message)
        });
        request.fail(data => {
            content.text('Произошла ошибка, попробуйте позднее.');
            content.addClass('modal__content--error');
        });
        request.always(data => {
            $.fancybox.open({
                src: "#modal",
                type: "inline"
            })
        })

    }

})
$('.app-submit-btn').on('click', function (e) {
    e.preventDefault();
    $.fancybox.close();
})


///// products accardeon
function mesureWidth(item){
    let reqItemWidth = 0;
    const screenWidth = $(window).width();
    const container = item.closest('.products-menu');
    const titlesBlocks = container.find('.products-menu__title');
    const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

    const textContainer = item.find('.products-menu__container');
    const paddingL = parseInt(textContainer.css('padding-left'));
    const paddingR = parseInt(textContainer.css('padding-right'));
    
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if(isMobile){
        reqItemWidth = screenWidth - titlesWidth;
    }else{
        reqItemWidth = screenWidth / 2.2;
    }
    return{
            container: reqItemWidth,
            textContainer: reqItemWidth - paddingL - paddingR
    }
}
function closeEveryItemInContainer(container){
    const items = container.find('.products-menu__item');
    const content = container.find('.products-menu__content');
    
    items.removeClass('active')
    content.width(0);
}
function openProducts(item){
    const hiddenContent = item.find('.products-menu__content');
    const reqWidth = mesureWidth(item);
    const textBlock = item.find('.products-menu__container');
    item.addClass('active')
    hiddenContent.width(reqWidth.container);
    textBlock.width(reqWidth.textContainer);

}
$('.products-menu__title').on('click', function(e){
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest('.products-menu__item');
    const itemOpened = item.hasClass('active');
    const container = $this.closest('.products-menu');
    if(itemOpened){
        closeEveryItemInContainer(container)
    }else{
        closeEveryItemInContainer(container)
        openProducts(item);
    }
    
})
$('.products-menu__content').on('click', function(e){
    e.preventDefault();
    const targets = e.target.classList
    if(!targets.contains('products-menu__content-text')){
        closeEveryItemInContainer($('.products-menu'));
    }
})


/// onePageScroll 
var currentSection = 0;
let sectionChange = function () {
    let thisSection = section[currentSection]


    const fixedMenuItem = $('.fixed-menu__item');
    const $thisFixedMenuItem = fixedMenuItem[currentSection]

    $('.fixed-menu__item').removeClass('fixed-menu__item--active')
    section.removeClass('active');
    $(thisSection).addClass('active');
    $($thisFixedMenuItem).addClass('fixed-menu__item--active')

    var translateY = -currentSection * 100;
    wrapper[0].style.transform = `translateY(${0, translateY}vh)`;

};
/// Mobile scroll /// 

wrapper.on('wheel', function (e) {
    e.preventDefault();

    var delta = event.deltaY;
    if (delta > 0) {
        if (currentSection < (section.length - 1)) {
            currentSection++;
        }
    } else if (delta < 0) {
        if (currentSection >= 1) {
            currentSection--;
        }

    }

    sectionChange();

});
if (md.phone() != null) {
    $(function () {
        wrapper.swipe({
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                wrapper.on('wheel', function (e) {
                    e.preventDefault();
                });
                if (direction == 'up') {
                    if (currentSection < (section.length - 1)) {
                        currentSection++;

                    }
                } else if (direction == 'down') {
                    if (currentSection >= 1) {
                        currentSection--;
                    }
                }
                sectionChange();
            }
        });
    });
}


$('.fixed-menu__link').on('click', function (e) {
    const $this = $(e.currentTarget);
    const target = $this.attr('data-section');
    currentSection = target;
    sectionChange();
})




////// player 

const player = document.getElementById('video-player');
const playerContainer = $('.player');
const volumeButton = $('.player__volume-button');

volumeButton.css({
    left: `${player.volume * 100}%`
})

function volumeChangeIndicator(muted) { 
    
    if(!muted){
        $('.player__volume-indicator').css({
            width: `${player.volume * 100}%`
        })
    }else{
        $('.player__volume-indicator').css({
            width: `${0}%`
        })
    }
 }

function playVideo() {
    if (player.paused) {
        playerContainer.addClass('paused');
        playerContainer.removeClass('active');
        player.play();
    } else {
        playerContainer.addClass('active');
        playerContainer.removeClass('paused');
        player.pause();
    }
};


$('.player__start').on('click', function (e) {
    e.preventDefault();
    playVideo();
});
$('.player__splash').on('click', function (e) {
    e.preventDefault();
    playVideo();
})
$('.player__playback').on('click', function (e) {
    e.preventDefault();

    const bar = $(e.currentTarget);
    const clickedPos = e.originalEvent.layerX;
    const newBtnPos = (clickedPos / bar.width()) * 100;
    const newPlaybackPos = (player.duration / 100) * newBtnPos;
    
    player.currentTime = newPlaybackPos;
})

function onPlayerReady() {
    let interval;
    if (typeof interval != "undefined") {
        clearInterval(interval);
    }
    const durationSec = player.duration;
    interval = setInterval(() => {
        const completedSec = player.currentTime;
        const completedPercent = (completedSec / durationSec) * 100;
        $('.player__playback-button').css({
            left: `${completedPercent}%`
        })
        $('.player__playback-indicator').css({
            width: `${completedPercent}%`
        })
        if (player.ended) {
            playerContainer.addClass('active');
            playerContainer.removeClass('paused');
            player.pause();
        }
        volumeChangeIndicator(player.muted)
    })

}
$('.player__volume-button--off').on('click', function (e) { 
    e.preventDefault();

    const muteBtn = $(e.currentTarget);
    muteBtn.toggleClass('active')
    if(muteBtn.hasClass('active')){
        player.muted = true;
        volumeButton.css({
            left: `0%`
        })
    }else{
        player.muted = false;
        volumeButton.css({
            left: `${player.volume * 100}%`
        })
        
    }
 });
 
 $('.player__volume').on('click', function (e) {
    e.preventDefault();

    const volBar = $(e.currentTarget);
    const clickedVolBarPos = e.originalEvent.layerX;
    const clickedVolBarPosMs = clickedVolBarPos / 100
    

    volumeButton.css({
        left: `${clickedVolBarPos}%`
    })
    player.volume = clickedVolBarPosMs;

});
onPlayerReady();



let myMap;

function init() {
    myMap = new ymaps.Map('map', {
        center: [51.124295, 71.456133],
        zoom: 12,
        controls: ['typeSelector', 'zoomControl']
    });
    const coords = [
        [51.124295, 71.456133],
        [51.089407, 71.418265],
        [51.148425, 71.420914],
        [51.178351, 71.419548]
    ];
    let myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: './img/icons/decoration/marker.svg',
        icon_imagesize: [58, 73],
        iconImageOffset: [-3, -42]
    })
    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    })
    myMap.geoObjects.add(myCollection);
    myMap.behaviors.disable('scrollZoom');


}



ymaps.ready(init);
