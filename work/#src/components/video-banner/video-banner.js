{
    let videoBanners = document.querySelectorAll('[data-video-banner]');
    if(videoBanners.length) {
        videoBanners.forEach(async videoBanner => {
            let video = videoBanner.querySelector('video');
            if(video) {
                await video.pause();
                ScrollTrigger.create({
                    trigger: video,
                    start: 'top bottom',
                    end: 'bottom top',
                    onEnter: () => {
                        video.play();
                    },
                    onLeave: () => {
                        video.pause();
                    },
                    onEnterBack: () => {
                        video.play();
                    },
                    onLeaveBack: () => {
                        video.pause();
                    }
                })
            }
        })
    }
}