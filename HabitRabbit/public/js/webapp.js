var main = () => {

    var $menuToggle = $('.menu-toggle'),
        $grid = $('.container'),
        $topLogo = $('.topbar-logo'),
        $sidebar = $('.left-sidebar');
    
    $menuToggle.on('click', () => {
        $grid.toggleClass('small');
        $topLogo.toggleClass('small');
        $sidebar.toggleClass('small');
    })

}

window.addEventListener('load',function(){
    $('body').addClass('loaded');
});

$(document).ready(main);