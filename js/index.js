const openMenuButton = document.querySelector('.nav__hide')
const closeMenuButton = document.querySelector('.menu__close');

openMenuButton.addEventListener('click', function(){
    const menuOpen = document.querySelector('.menu__open');
    menuOpen.style.display = 'flex';
})

closeMenuButton.addEventListener('click', function(){
    const menuOpen = document.querySelector('.menu__open');
    menuOpen.style.display = 'none';
})
