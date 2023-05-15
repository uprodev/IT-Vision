{
    let textParallaxSection = document.querySelector('[data-text-parallax]');
    if(textParallaxSection) {
        let content = textParallaxSection.querySelector('.text-parallax__body');

        gsap.to(content,{
            y:`-${content.clientHeight - textParallaxSection.clientHeight + (textParallaxSection.clientHeight / 4)}`,
            duration: 1,
            //ease: 'none',
            scrollTrigger: {
                trigger: textParallaxSection,
                start: 'top center',
                end: 'bottom center',
                scrub: 2,
            }
        })
    }
}