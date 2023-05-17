{
    let videoBanner = document.querySelector('[data-video-banner]');
    if(videoBanner) {
        let video = videoBanner.querySelector('video');
        let playBtn = videoBanner.querySelector('.video-banner__icon-play');
        if(video) {
            if(document.documentElement.clientWidth < 768) {
                video.pause();

                playBtn.addEventListener('click', () => {
                    playBtn.classList.add('d-none');
                    video.setAttribute('controls', true);
                    video.play();
                })
            }
        }
    }
}