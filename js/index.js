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


///// color accardeon

$('.color__button-open').on('click', function (e) {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const container = $this.closest('.color__list');
    const elemContainer = container.find('.color__item');
    const $thisContainer = $this.closest('.color__item');
    const content = container.find('.color__content');
    const $thisContent = $thisContainer.find('.color__content');



    if (elemContainer.hasClass('active')) {
        content.width(0);
        elemContainer.removeClass('active')
    } else {
        $thisContainer.addClass('active');
        $thisContent.width($('.color__text').width());
    }

});


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

if(md.phone() == null){  
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
}else{
    $(function() {      
        wrapper.swipe( {
          swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            wrapper.on('wheel', function (e) {
                e.preventDefault();
              });
            if(direction == 'up'){
                if(currentSection < (section.length -1)){
                    currentSection++;
                    
                }
            }else if(direction == 'down'){
                if(currentSection >= 1){
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


// MOBILE SCROLL //


////// player 

let player;
const playerContainer = $('.player');
const volumeButton = $('.player__volume-button');
let eventsInit = () => {
    $('.player__start').on('click', function (e) {
        e.preventDefault();
        const btn = $(e.currentTarget);

        if (playerContainer.hasClass('paused')) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    });
    $('.player__playback').on('click', function (e) {
        e.preventDefault();
        const bar = $(e.currentTarget);
        const clickedPos = e.originalEvent.layerX;
        const newButtonPos = (clickedPos / bar.width()) * 100;
        const newPlaybackPosSec = (player.getDuration() / 100) * newButtonPos;

        console.log(clickedPos)
        player.seekTo(newPlaybackPosSec)
    });
    $('.player__volume-button--off').on('click', function (e) {
        e.preventDefault();

        const muteButton = $(e.currentTarget);
        muteButton.toggleClass('active');
        if (muteButton.hasClass('active')) {
            player.mute();
        } else {
            player.unMute();
        }
        console.log(volume);
    });
    $('.player__volume').on('click', function (e) {
        e.preventDefault();

        const volumeBar = $(e.currentTarget);
        const clickedVolPos = e.originalEvent.layerX;

        volumeButton.css({
            left: `${clickedVolPos}%`
        })
        player.setVolume(clickedVolPos);


    });
    $('.player__splash').on('click', function(e){
        e.preventDefault();

        player.playVideo();
    })

}
const onPlayerReady = () => {
    let interval;
    if (typeof interval != "undefiend") {
        clearInterval(interval);
    }
    const durationSec = player.getDuration();


    interval = setInterval(() => {
        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;
        $('.player__playback-button').css({
            left: `${completedPercent}%`
        });


    })
};

const onPlayerStateChange = event => {
    // -1 – воспроизведение видео не началось
    // 0 – воспроизведение видео завершено
    // 1 – воспроизведение
    // 2 – пауза
    // 3 – буферизация
    // 5 – видео находится в очереди
    switch(event.data){
        case 1: 
            playerContainer.addClass('active');
            playerContainer.addClass('paused');
            break;
        case 2:
            playerContainer.removeClass('active');
            playerContainer.removeClass('paused');
            break;
        
    }
    volume = player.getVolume();

    volumeButton.css({
        left: `${volume}%`
    })

    
}
function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '500',
        width: '864',
        videoId: 'YYRxpjXPu3Q',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 0,
            autoplay: 0,
            modestbranding: 0,
            rel: 0,
            showinfo: 0,
        }
    });
};
eventsInit();



/// map


let myMap;

function init(){
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
    let myCollection = new ymaps.GeoObjectCollection({},{
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
