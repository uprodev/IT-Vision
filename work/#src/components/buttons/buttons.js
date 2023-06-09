{ 
    //data-magnetic data-cursor="-lg"
    let buttons = document.querySelectorAll('.header__logo a, .header__button, [data-hover-text], .social a, .product-head__link, .video-banner__icon-play, .work-preview-card__label, .reviews__btn-next');
    if(buttons.length) {
        buttons.forEach(btn => {
            btn.setAttribute('data-cursor', '-lg');

            const style = getComputedStyle(btn);
            
            console.log(style.transform);
            if(style.transform === 'none') {
                btn.setAttribute('data-magnetic', '');
            }
        })
    }
}