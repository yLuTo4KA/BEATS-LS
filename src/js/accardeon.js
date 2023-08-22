(function(){
    
const openItem = item => {
    const container = item.closest('.teams__item');
    const contentBlock = container.find('.team__content');
    const nameBlock = container.find('.team__name');
    const textBlock = contentBlock.find('.team__info');
    const reqHeight = textBlock.height();

    container.addClass('active');
    nameBlock.addClass('team__name--active');
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
    const container = $this.closest('.teams__list');
    const elemContainer = container.find('.teams__item');
    const contentBlock = $this.siblings('.team__content'); // Находим соседний элемент .team__content

    if (contentBlock.height() === 0) {
        closeEveryItem(container);
        openItem($this);
    } else {
        closeEveryItem(container);
    }
});
})()