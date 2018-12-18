define(function() {
	const MENU_CLASS = '.js-nav';
	let $menu;

	const init = function () {
		$menu = document.querySelector(MENU_CLASS);
		if ($menu) listen();
		onScroll();
	}

	const listen = function () {
		// When the user scrolls the page, execute myFunction
		let waiting = false, endScrollHandle;
		document.addEventListener('scroll', () => {
			 if (waiting) {
		        return;
		    }
		    waiting = true;

		    // clear previous scheduled endScrollHandle
		    clearTimeout(endScrollHandle);

		    onScroll();

		    setTimeout(function () {
		        waiting = false;
		    }, 100);

		    // schedule an extra execution of scroll() after 200ms
		    // in case the scrolling stops in next 100ms
		    endScrollHandle = setTimeout(onScroll, 200);
		});
	}

	const onScroll = function () {
		let i;
	    let currLink;
	    let refElement;
	    const links = $menu.querySelectorAll('a[href^="#"]');
	    const scrollPos = window.scrollY || document.documentElement.scrollTop;

	    $menu.classList.toggle('is-scrolled', scrollPos > 100);

	    for (i = 0; i < links.length; i += 1) {
	      currLink = links[i];
	      refElement = document.querySelector(currLink.getAttribute('href'));

	      if (
	        refElement.offsetTop <= scrollPos &&
	        (refElement.offsetTop + refElement.clientHeight) > scrollPos
	      ) {
	        currLink.classList.add('active');
	      } else {
	        currLink.classList.remove('active');
	      }
	}
	}

	init();
});