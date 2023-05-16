{
    let textParallaxSection = document.querySelector('[data-text-parallax]');
    if (textParallaxSection) {
        let cover = textParallaxSection.querySelector('.text-parallax__cover');
        let body = textParallaxSection.querySelector('.text-parallax__body');

        ScrollTrigger.create({
            trigger: cover,
            pin: cover,
            start: () => `top top`,
            end: () => `+=${body.offsetHeight - cover.offsetHeight}`,
            pinSpacing: false
        });
    }
}