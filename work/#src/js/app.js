@@include('files/utils.js');
@@include('files/dynamic_adapt.js');

class ScaleSpeedPlugin extends SmoothScrollbar.ScrollbarPlugin {
	transformDelta(delta) {
		const { speed } = this.options;

		return {
			x: delta.x * speed,
			y: delta.y * speed,
		};
	}
}

ScaleSpeedPlugin.pluginName = 'scaleSpeed';
ScaleSpeedPlugin.defaultOptions = {
	speed: 1,
}

class SmoothScroll {
	constructor() {
		this.utils = new Utils();
	}

	init() {

		gsap.registerPlugin(ScrollTrigger);

		if (!this.utils.isMobile()) {
			SmoothScrollbar.use(ScaleSpeedPlugin);

			// Init smooth scrollbar
			const view = document.getElementById('smooth-wrapper');
			const scrollbar = SmoothScrollbar.init(view, {
				renderByPixels: false,
				damping: 0.075, plugins: {
					scaleSpeed: {
						speed: this.utils.isSafari() ? 1.5 : 0.85,
					},
				},
			});

			window.pageSmoothScroll = {
				listOfUpdateFunctions: [],
				update: () => {
					ScrollTrigger.refresh();
					this.initScrollParallax();
	
					let id = setInterval(() => {
						ScrollTrigger.refresh();
						scrollbar.update();
					}, 20);
	
					setTimeout(() => {
						clearInterval(id);
					}, 200)

					
					if(window.pageSmoothScroll.listOfUpdateFunctions.length) {
						window.pageSmoothScroll.listOfUpdateFunctions.forEach(f => f()); 
					}
				}
			};

			this.initScrollParallax();

			let parallaxImages = document.querySelectorAll('img[data-speed]');
			if (parallaxImages.length) {
				parallaxImages.forEach(parallaxImage => {
					let parent = parallaxImage.parentElement;
					gsap.to(parallaxImage, {
						y: (parallaxImage.offsetHeight - parent.offsetHeight),
						scrollTrigger: {
							trigger: parent,
							scrub: true,
							start: 'top bottom',
							end: 'bottom top',
						}
					});
				})
			}

			return scrollbar;
		}

	}

	initScrollParallax() {
		// let scrollParalaxElements = document.querySelectorAll('[data-scroll-parallax]:not(.handling)');
		// if (scrollParalaxElements.length) {
		// 	scrollParalaxElements.forEach(el => {
		// 		el.classList.add('handling');
		// 		if (!this.utils.isMobile()) {
		// 			let [value, startEl, startScreen, endEl, endScreen] = el.dataset.scrollParallax.split(',');
		// 			gsap.to(el, {
		// 				y: value,
		// 				duration: 1,
		// 				scrollTrigger: {
		// 					trigger: el.closest('[data-scroll-parallax-trigger]'),
		// 					scrub: 1,
		// 					start: `${startEl} ${startScreen}`,
		// 					end: `${endEl} ${endScreen}`,
		// 					//markers: true
		// 				}
		// 			});
		// 		}
		// 	})
		// }
	}
}


class App {
	constructor(utils, dynamicAdapt) {
		this.utils = utils;
		this.dynamicAdapt = dynamicAdapt;
		this.smoothScroll = new SmoothScroll();
	}

	init() {
		window.addEventListener('DOMContentLoaded', () => {
			document.body.classList.add('page-loaded');

			if (this.utils.isMobile()) {
				document.body.classList.add('mobile');
			}

			if (this.utils.iOS()) {
				document.body.classList.add('mobile-ios');
			}

			if (this.utils.isSafari()) {
				document.body.classList.add('safari');
			}

			@@include('../components/parallax-cover-section/parallax-cover-section.js');

			this.smoother = this.smoothScroll.init();

			this.utils.replaceToInlineSvg('.img-svg');
			this.dynamicAdapt.init();
			this.headerHandler();
			this.popupHandler();
			this.initSmoothScroll();
			this.inputMaskInit();
			this.tabsInit();
			this.selectInit();
			this.spollerInit();
			this.componentsBeforeLoad();
		});



		window.addEventListener('load', () => {
			this.slidersInit();
			this.componentsAfterLoad();
		});

	}

	headerHandler() {
		@@include('../components/header/header.js');
	}

	popupHandler() {
		@@include('../components/popup/popup.js');
	}

	slidersInit() {
		@@include('../components/carousel/carousel.js');
		@@include('../components/instagram/instagram.js');
		@@include('../components/reviews/reviews.js');
		@@include('../components/about-team/about-team.js');
		@@include('../components/other-articles/other-articles.js');
	}


	tabsInit() {
		let tabsContainers = document.querySelectorAll('[data-tabs]');
		if (tabsContainers.length) {
			tabsContainers.forEach(tabsContainer => {
				let triggerItems = tabsContainer.querySelectorAll('[data-tab-trigger]');
				let contentItems = Array.from(tabsContainer.querySelectorAll('[data-tab-content]'));
				let select = tabsContainer.querySelector('[data-tab-select]');

				const getContentItem = (id) => {
					if (!id.trim()) return;
					return contentItems.filter(item => item.dataset.tabContent === id)[0];
				}

				if (triggerItems.length && contentItems.length) {
					// init
					let activeItem = tabsContainer.querySelector('.tab-active[data-tab-trigger]');
					if (activeItem) {
						activeItem.classList.add('tab-active');
						getContentItem(activeItem.dataset.tabTrigger).classList.add('tab-active');
					} else {
						triggerItems[0].classList.add('tab-active');
						getContentItem(triggerItems[0].dataset.tabTrigger).classList.add('tab-active');
					}

					triggerItems.forEach(item => {
						item.addEventListener('click', () => {
							item.classList.add('tab-active');
							getContentItem(item.dataset.tabTrigger).classList.add('tab-active');

							triggerItems.forEach(i => {
								if (i === item) return;

								i.classList.remove('tab-active');
								getContentItem(i.dataset.tabTrigger).classList.remove('tab-active');
							})

							// update locomotive scroll
							let id = setInterval(() => {
								window.locomotivePageScroll.update();
							}, 20);
							setTimeout(() => {
								clearInterval(id);
							}, 200)
						})
					})
				}

				if (select) {
					select.addEventListener('change', (e) => {
						getContentItem(e.target.value).classList.add('tab-active');

						contentItems.forEach(item => {
							if (getContentItem(e.target.value) === item) return;

							item.classList.remove('tab-active');
						})
					})
				}
			})
		}
	}

	spollerInit() {
		let spollers = document.querySelectorAll('[data-spoller]');
		if (spollers.length) {
			spollers.forEach(spoller => {
				let isOneActiveItem = spoller.dataset.spoller.trim() === 'one' ? true : false;
				let triggers = spoller.querySelectorAll('[data-spoller-trigger]');
				if (triggers.length) {
					triggers.forEach(trigger => {
						let parent = trigger.parentElement;
						let content = trigger.nextElementSibling;

						// init
						if (trigger.classList.contains('active')) {
							content.style.display = 'block';
							parent.classList.add('active');
						}

						trigger.addEventListener('click', (e) => {
							e.preventDefault();
							parent.classList.toggle('active');
							trigger.classList.toggle('active');
							content && this.utils.slideToggle(content);

							if (isOneActiveItem) {
								triggers.forEach(i => {
									if (i === trigger) return;

									let parent = i.parentElement;
									let content = i.nextElementSibling;

									parent.classList.remove('active');
									i.classList.remove('active');
									content && this.utils.slideUp(content);
								})
							}
						})
					})
				}
			})
		}
	}

	inputMaskInit() {
		let items = document.querySelectorAll('[data-mask]');
		if (items.length) {
			items.forEach(item => {
				let maskValue = item.dataset.mask;
				let input = item.querySelector('input[type="text"]');

				if (input) {
					Inputmask(maskValue, {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
					}).mask(input);
				}
			})
		}
	}

	initSmoothScroll() {
		let anchors = document.querySelectorAll('a[href*="#"]:not([data-popup="open-popup"])');
		if (anchors.length) {
			let header = document.querySelector('.header');

			anchors.forEach(anchor => {
				if (!anchor.getAttribute('href').match(/#\w+$/gi)) return;

				let id = anchor.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');

				anchor.addEventListener('click', (e) => {
					let el = document.querySelector(`#${id}`);

					if (el) {
						e.preventDefault();
						let top = Math.abs(document.body.getBoundingClientRect().top) + el.getBoundingClientRect().top;

						if (header) {
							top = top - header.clientHeight;
						}

						window.scrollTo({
							top: top - 20,
							behavior: 'smooth',
						})
					}
				})

			})
		}
	}

	selectInit() {
		@@include('../components/select/select.js');
	}

	componentsBeforeLoad() {
		@@include('../components/text-parallax/text-parallax.js');
		@@include('../components/stats/stats.js');
		@@include('../components/work-head/work-head.js');
		@@include('../components/footer/footer.js');
		@@include('../components/input-file/input-file.js');
		@@include('../components/video-banner/video-banner.js');
		@@include('../components/works/works.js');

		if (!this.utils.isMobile()) {
			@@include('../js/plugins/mouse-magnetic.js');
			@@include('../components/buttons/buttons.js');
		}

	}

	componentsAfterLoad() {

	}

}

let app = new App(new Utils(), new DynamicAdapt('max'));
app.init();


