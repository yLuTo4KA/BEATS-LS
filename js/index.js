const wrapper = $('.wrapper');
const section = $('.section');
const openMenuButton = document.querySelector('.nav__hide')
const closeMenuButton = document.querySelector('.menu__close');
const menuOpen = document.querySelector('.menu__open');
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
}
var currentSection = 0;
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
$('.fixed-menu__link').on('click', function (e) {
    const $this = $(e.currentTarget);
    const target = $this.attr('data-section');
    currentSection = target;
    sectionChange();
})