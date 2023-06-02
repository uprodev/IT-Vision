{
    let textParallaxSections = document.querySelectorAll('[data-text-parallax]');
    if (textParallaxSections) {
        textParallaxSections.forEach(textParallaxSection => {
            let cover = textParallaxSection.querySelector('.text-parallax__cover');
            let body = textParallaxSection.querySelector('.text-parallax__body');
            let bg = textParallaxSection.querySelector('.text-parallax__bg');
            let textElements = textParallaxSection.querySelectorAll('.text-parallax__body p');
    
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

            if(textElements.length) {
                textElements.forEach(textElement => {
                    ScrollTrigger.create({
                        trigger: textElement,
                        onUpdate: (e) => {
                            let progress = (e.progress * 2);
                            let value = progress > 1 ? 2 - progress : progress;
                            gsap.to(textElement, {
                                opacity: value,
                                duration: 0
                            })
                        }
                    });
                })
            }
        });
    }
}