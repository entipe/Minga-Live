define(['smoothscroll-polyfill', './fittext.js'],function (smoothscroll) {

    const NAV_LINK_CLASS = '.js-nav-link';
    const NAV_CLASS = '.js-nav';
    const NAV_LANG_CLASS = '.js-nav-lang';
    const NAV_LANG_TOGGLE_CLASS = '.js-nav-lang-toggle';
    const NAV_TOGGLE_CLASS = '.js-nav-toggle';
    const NAV_SCROLL_CLASS = '.js-page-scroll';
    const SCROLL_BEHAVIOR = 'smooth';

    /**
    * Main init function, all start here
    * @return void
    **/
    const init = function () {
        smoothscroll.polyfill();
        listen();

        window.fitText(document.querySelector('.js-title'), 0.8, {minFontSize: 60});
        window.fitText(document.querySelector('.js-subtitle'), 2, {minFontSize: 20, maxFontSize: 40});

    }

    /**
    * Main listener function, all listen here
    * @return void
    **/
    const listen = function () {
        let $navLinkList = document.querySelectorAll(NAV_SCROLL_CLASS);

        for (var i = $navLinkList.length - 1; i >= 0; i--) {
            $navLinkList[i].addEventListener('click', onClickNav);
        }

        document.querySelector(NAV_TOGGLE_CLASS).addEventListener('click', toggleNavXS);
        document.querySelector(NAV_LANG_TOGGLE_CLASS).addEventListener('click', toggleNavLang);
    }

    /**
    * Toggle lang navigation
    * @param e Event | Click Event
    * @return void
    **/
    const toggleNavLang = function (e) {
        document.querySelector(NAV_LANG_CLASS).classList.toggle('is-active');

        e.preventDefault();
    }

    /**
    * Toggle mobile navigation
    * @param e Event | Click Event
    * @return void
    **/
    const toggleNavXS = function (e) {

        document.querySelector(NAV_CLASS).classList.toggle('is-active');
        document.querySelector(NAV_TOGGLE_CLASS).classList.toggle('is-active');

        e.preventDefault();
    }

    /**
    * User click on a nav link
    * @param e Event | Click Event
    * @return void
    **/
    const onClickNav = function (e) {

        let anchor = getAnchor(e.currentTarget.href);

        window.scroll({
            top: getOffset(document.querySelector(anchor)).top,
            left: 0,
            behavior: SCROLL_BEHAVIOR
        });

        //hide nav on mobile click
        hideNav()

        e.preventDefault();
    }

    const hideNav = function () {
        document.querySelector(NAV_TOGGLE_CLASS).classList.remove('is-active');
        document.querySelector(NAV_CLASS).classList.remove('is-active');
    }

    /**
    * Get anchor from full URL
    * @param string | str
    * @return string
    **/
    const getAnchor = function (str) {
        return str.substring(str.lastIndexOf('#'));
    }

    /**
    * Get offset position of an HTML Element
    * @param el HTMLElement
    * @return {top: number, left: number}
    **/
    const getOffset = function (el) {
        let rect = el.getBoundingClientRect()
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    init();
});