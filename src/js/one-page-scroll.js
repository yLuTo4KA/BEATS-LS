(function(){
    var currentSection = 0;
let inScroll = false;
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
    setTimeout(() => {
        inScroll = false;
    }, 1300)
};
/// Mobile scroll /// 

wrapper.on('wheel', function (e) {
    e.preventDefault();
    if (inScroll === false) {
        inScroll = true;
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

    }

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
$(window).on('keydown', function (e) {
    const tagName = e.target.tagName.toLowerCase();
    if (tagName != 'input' && tagName != 'textarea') {
        switch (e.keyCode) {
            case 38: // prev
                e.preventDefault()
                if (currentSection >= 1) {
                    currentSection--;
                    sectionChange();
                }
                break;
            case 40: // next 
            e.preventDefault()
                if (currentSection < (section.length - 1)) {
                    currentSection++;
                    sectionChange();
                }
                break;
        }
    }
})
$('.fixed-menu__link').on('click', function (e) {
    const $this = $(e.currentTarget);
    const target = $this.attr('data-section');
    currentSection = target;
    sectionChange();
})

$('[data-scroll-to]').on('click', function (e) { 
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr('data-scroll-to');
    const reqSection = $(`[data-section-id=${target}]`)
    currentSection = reqSection.index();
    menuOpen.style.display = 'none';
    sectionChange();
 })

})()