(function(){
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
})()