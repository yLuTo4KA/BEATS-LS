(function(){
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
})()