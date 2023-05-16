{
    let textParallaxSection = document.querySelector('[data-text-parallax]');
    if (textParallaxSection) {
        let cover = textParallaxSection.querySelector('.text-parallax__cover');
        let body = textParallaxSection.querySelector('.text-parallax__body');
        let bg = textParallaxSection.querySelector('.text-parallax__bg');

        ScrollTrigger.create({
            trigger: cover,
            pin: cover,
            start: () => `top top`,
            end: () => `+=${body.offsetHeight - cover.offsetHeight}`,
            pinSpacing: false
        });

        if(bg) {
            ScrollTrigger.create({
                trigger: bg,
                pin: bg,
                start: () => `top top`,
                end: () => `+=${body.offsetHeight - bg.offsetHeight}`,
                pinSpacing: false
            });
        }
    }
}