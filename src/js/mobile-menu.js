(function(){
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
    
    
})()