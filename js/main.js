window.onload = function () {
	let prev = document.querySelector('.btn-slider-prev');
	let next = document.querySelector('.btn-slider-next');
	let slider = document.querySelector('.slider');
	let dots = document.querySelectorAll('.reviews-gallery li');
	let review = document.querySelectorAll('.reviews .review');

	// clone one slider
	function cloneSlider() {
		let firstSlider = slider.firstElementChild.cloneNode(true);
		slider.appendChild(firstSlider);
	}
	cloneSlider();

	// dots
	[].forEach.call(dots, (dot, i) => {
		dot.addEventListener('click', () => {
			clickDot(i);
		}, false);
	});

	// inline style widght for all wrap slider
	function addStyleWidght() {

		[].forEach.call(slider.children, (slide) => {
			slide.style.width = slider.clientWidth + 'px';
		})
	}
	addStyleWidght();

	if (next) {
		next.addEventListener('click', nextSlider, false);
	}
	if (prev) {
		prev.addEventListener('click', prevSlider, false);
	}

	// basic
	let widthOnePhoto = slider.clientWidth;
	let widthPhoto = slider.clientWidth;
	let allWidthSlider = slider.children.length * widthOnePhoto;
	slider.style.width = allWidthSlider + "px";
	let offset = 0;
	let pos = 0;
	let loop;
	let step = 20; // adjustment speed move slide
	let activeDot = 0;

	function nextSlider() {
		pos -= step;
		offset += step;

		slider.style.transform = "translate3d(" + pos + "px, 0, 0)";
		loop = window.requestAnimationFrame(nextSlider);

		changeActiveDot();

		checkoutWidthOneSleder();

		if (pos < -(allWidthSlider - widthOnePhoto)) {
			slider.style.transform = "translate3d(0, 0, 0)";
			pos = 0;
			offset = 0;
		}
	}

	function prevSlider() {
		pos += step;
		offset += step;

		slider.style.transform = "translate3d(" + pos + "px, 0, 0)";
		loop = window.requestAnimationFrame(prevSlider);

		changeActiveDot();

		checkoutWidthOneSleder();

		if (pos == step) {
			slider.style.transform = "translate3d(" + -(allWidthSlider - widthOnePhoto) + "px, 0, 0)";
			pos = -(allWidthSlider - widthOnePhoto);
			offset = 0;
		}
	}

	function changeActiveDot() {

		for (let i = 0; i < dots.length; i++) {
			if (pos == -(widthPhoto * i)) {
				activeDot = i;
				break;
			}
		}
	}

	function checkoutWidthOneSleder() {
		if (offset == widthOnePhoto) {
			window.cancelAnimationFrame(loop);
			offset = 0;
			widthOne = widthOnePhoto;
		}
	}

	function clickDot(index) {
		widthOnePhoto = slider.parentElement.clientWidth;

		if (activeDot == index) return;

		if (pos <= -(allWidthSlider - widthOnePhoto) && index == 0) {
			index = 0;
			slider.style.transform = "translate3d(0, 0, 0)";
			pos = 0;
			activeDot = index;
			return;
		}
		if (index > activeDot) {
			widthOnePhoto = (index - activeDot) * widthOnePhoto;
			nextSlider();
		} else {
			widthOnePhoto = (activeDot - index) * widthOnePhoto;
			prevSlider();
		}

		// change review main photo
		[].forEach.call(review, (item) => {
			item.style.visibility = 'hidden';
		});
		review[index].style.visibility = 'visible';
	}



	// Modal
	const cartBtn = document.querySelector('.wrap-cart');
	const modal = document.querySelector('.cart_totals');
	// bar
	const bar = document.querySelector('.bars');
	const submenu = document.querySelector('.submenu');
	const times = document.querySelector('.close-submenu');

	if (times) {
		times.addEventListener('click', () => {
			submenu.style.right = '100%';
			document.body.style.height = 'auto';
			document.body.style.overflow = 'visible';
		})
	}

	if (bar) {
		bar.addEventListener('click', () => {
			submenu.style.right = 0;
			document.body.style.height = '100vh';
			document.body.style.overflow = 'hidden';

			cartBtn.classList.remove('show-modal');

			modal.style.display = "none";
			header.classList.remove('showCart');
			logo.classList.remove('move-logo');

		}, false)
		let li = document.querySelectorAll('.submenu li');
		[].forEach.call(li, (item) => {
			item.addEventListener('click', () => {
				document.body.style.height = 'auto';
				document.body.style.overflow = 'visible';
				submenu.style.right = '100%';
			}, false)
		})
	}

	// MODAL CART
	const close = document.querySelector('.close');
	const logo = document.querySelector('.benner-logo img');
	const header = document.querySelector('header');
	const btnBuy = document.querySelector('.banner-btn button')
	const btnMenu = document.querySelector('.menu-btn button');

	function switchModal() {
		cartBtn.classList.toggle('show-modal');

		if (cartBtn.classList.contains('show-modal')) {
			modal.style.display = "block";
			header.classList.add('showCart');
			logo.classList.add('move-logo');
			submenu.style.right = '100%'; // none

			document.body.style.overflow = 'hidden';

		} else {
			modal.style.display = "none";
			header.classList.remove('showCart');
			logo.classList.remove('move-logo');

			document.body.style.overflow = 'visible';
		}
	}
	cartBtn.addEventListener('click', switchModal, false);
	btnBuy.addEventListener('click', switchModal, false);
	if(btnMenu.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
		setTimeout(switchModal, 700);
	}))

	console.log(document.querySelector('.close')); // bug без него не работает close

	close.addEventListener('click', () => {
		modal.style.display = "none";
		cartBtn.style.display = 'flex';
		cartBtn.classList.remove('show-modal');
		logo.classList.remove('move-logo');

		document.body.style.overflow = 'visible';

		header.classList.remove('showCart');
	});




	// FOOD-PROGRAM-SLIDER
	const menuLeft = document.querySelector('.menu-wrap_left');
	const menuRight = document.querySelector('.menu-wrap_right');

	let foodIndex = 1;
	if (menuLeft && menuRight && screen.width < 768) showDivs(foodIndex);
	if (menuLeft) menuLeft.addEventListener('click', foodLeft, false);
	if (menuRight) menuRight.addEventListener('click', foodRight, false);

	function foodLeft() {
		foodIndex -= 1;
		showDivs(foodIndex)
	}

	function foodRight() {
		foodIndex += 1;
		showDivs(foodIndex);
	}

	function showDivs(n) {
		let i;
		let x = document.querySelectorAll('.menu-active > .food-menu');
		if (n > x.length) foodIndex = 1;
		if (n < 1) foodIndex = x.length;

		for (i = 0; i < x.length; i++) {
			x[i].classList.remove('food-active');
		}
		x[foodIndex - 1].classList.add('food-active');
	}

	const foodList = document.querySelectorAll('.food-list li');
	const menuWrap = document.querySelectorAll('.menu-wrap');

	[].forEach.call(foodList, (item, i) => {
		item.addEventListener('click', () => {
			[].forEach.call(foodList, (i) => {
				i.classList.remove('food-list_active');
			});
			item.classList.add('food-list_active');

			[].forEach.call(menuWrap, (item) => {
				item.classList.remove('menu-active');
			});
			menuWrap[i].classList.add('menu-active');
		})
	})




	// program-selection-SLIDER
	const progLeft = document.querySelector('.program-wrap_left');
	const progRight = document.querySelector('.program-wrap_right');

	let programmIndex = 1;
	if (progLeft && progRight && screen.width < 768) showProgSelect(programmIndex);
	if (progLeft) progLeft.addEventListener('click', progSelectLeft, false);
	if (progRight) progRight.addEventListener('click', progSelectRight, false);

	function progSelectLeft() {
		programmIndex -= 1;
		showProgSelect(programmIndex)
	}

	function progSelectRight() {
		programmIndex += 1;
		showProgSelect(programmIndex);
	}

	function showProgSelect(n) {
		let i;
		let dots = document.querySelectorAll('.program-wrap_dots li');
		let x = document.querySelectorAll('.program-selection > li');
		if (n > x.length) {
			programmIndex = 1
		}
		if (n < 1) {
			programmIndex = x.length
		}
		for (i = 0; i < x.length; i++) {
			x[i].style.display = "none";
		}
		[].forEach.call(dots, (dot) => {
			dot.style.background = '#b7b7b7';
		});
		dots[programmIndex - 1].style.background = '#555555';
		x[programmIndex - 1].style.display = "block";
		if (x[programmIndex - 1].childElementCount) {
			let subMenu = x[programmIndex - 1].childNodes[1];
			subMenu.style.display = "block";
		}
	}


	// MENU-CARDS-SLIDER
	const menuCardLeft = document.querySelector('.menuWrap-card_left');
	const menuCardRight = document.querySelector('.menuWrap-card_right');
	const menuDots = document.querySelectorAll('.menuWrap-card_dots li');

	let menuCardIndex = 1;
	if (menuCardLeft && menuCardRight && screen.width < 768) showMenuCardSelect(menuCardIndex);
	if (menuCardLeft) menuCardLeft.addEventListener('click', menuCardSelectLeft, false);
	if (menuCardRight) menuCardRight.addEventListener('click', menuCardSelectRight, false);

	function menuCardSelectLeft() {
		menuCardIndex -= 1;
		showMenuCardSelect(menuCardIndex)
	}

	function menuCardSelectRight() {
		menuCardIndex += 1;
		showMenuCardSelect(menuCardIndex);
	}

	function showMenuCardSelect(n) {
		let i;
		let x = document.querySelectorAll('.menu-cards > .menu-card');

		if (n > x.length) {
			menuCardIndex = 1
		}
		if (n < 1) {
			menuCardIndex = x.length
		}
		for (i = 0; i < x.length; i++) {
			x[i].style.display = "none";
		}
		[].forEach.call(menuDots, (dot) => {
			dot.style.background = '#b7b7b7';
		});
		menuDots[menuCardIndex - 1].style.background = '#555555';
		x[menuCardIndex - 1].style.display = "block";
		if (x[menuCardIndex - 1].childElementCount) {
			let subMenu = x[menuCardIndex - 1].childNodes[1];
			subMenu.style.display = "block";
		}
	}



	// DESERT-CARDS-SLIDER
	const desertCardLeft = document.querySelector('.dessert-cards_left');
	const desertCardRight = document.querySelector('.dessert-cards_right');
	const desertDots = document.querySelectorAll('.dessert-cards_dots li');

	let desertCardIndex = 1;
	if (desertCardLeft && desertCardRight && screen.width < 768) showDesertCard(desertCardIndex);
	if (desertCardLeft) desertCardLeft.addEventListener('click', desertCardSelectLeft, false);
	if (desertCardRight) desertCardRight.addEventListener('click', desertCardSelectRight, false);

	function desertCardSelectLeft() {
		desertCardIndex -= 1;
		showDesertCard(desertCardIndex)
	}

	function desertCardSelectRight() {
		desertCardIndex += 1;
		showDesertCard(desertCardIndex);
	}

	function showDesertCard(n) {
		let i;
		let x = document.querySelectorAll('.dessert-cards_active > .dessert-card');

		if (n > x.length) desertCardIndex = 1;
		if (n < 1) desertCardIndex = x.length;

		for (i = 0; i < x.length; i++) {
			x[i].classList.remove('dessert-card_active');
			// x[i].style.display = "none";//dessert-card_active
		}
		[].forEach.call(desertDots, (dot) => {
			dot.style.background = '#b7b7b7';
		});
		desertDots[desertCardIndex - 1].style.background = '#555555';
		// x[desertCardIndex - 1].style.display = "block";
		x[desertCardIndex - 1].classList.add('dessert-card_active');

		if (x[desertCardIndex - 1].childElementCount) {
			let subMenu = x[desertCardIndex - 1].childNodes[1];
			subMenu.style.display = "block";
		}
	}

	const dessertList = document.querySelectorAll('.dessert-menu li');
	const dessertCards = document.querySelectorAll('.dessert-cards');

	[].forEach.call(dessertList, (item, i) => {
		item.addEventListener('click', () => {
			[].forEach.call(dessertList, (i) => {
				i.classList.remove('dessert-menu_active');
			});
			item.classList.add('dessert-menu_active');

			[].forEach.call(dessertCards, (item) => {
				item.classList.remove('dessert-cards_active');
			});
			dessertCards[i].classList.add('dessert-cards_active');
		})
	})


}