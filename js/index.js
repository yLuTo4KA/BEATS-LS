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
        console.log(e.target);
        menuOpen.style.display = 'none';
    }
})



