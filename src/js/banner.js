define(function () {
  const CONTAINER = '.js-banner';
  const CHILD = '.js-banner-child';
  const TRANSITION_DELAY = 5000;
  let $bannerContainer;
  let $bannerItemList;
  let visibleIndex = 0;
  let nextIndex = 0;

  const init = function () {
    $bannerContainer = document.querySelector(CONTAINER);

    if (!$bannerContainer) {
      return;
    }

    $bannerItemList = $bannerContainer.querySelectorAll(CHILD);

    setNextItem();
    wait(TRANSITION_DELAY);
  }

  const addListenerMulti = function(el, s, fn) {
    s.split(' ').forEach(e => el.addEventListener(e, fn));
  }

  const removeListenerMulti = function(el, s, fn) {
    s.split(' ').forEach(e => el.removeEventListener(e, fn));
  }

  var wait = function (delay) {
    //forceHeight()
    setTimeout(transition, delay);
  }

  var forceHeight = function() {
    $bannerContainer.style.height = getHeight() + 'px';
  }

  var transition = function () {
    getNextItem().classList.add('tr-in');
    getVisibleItem().classList.add('tr-out');
    
    addListenerMulti(getVisibleItem(), 'transitionend webkitTransitionEnd oTransitionEnd', endTransition);
  }

  const endTransition = function (e) {

    if(e.currentTarget.dataset.triggered && e.currentTarget.dataset.triggered === 'true') return;
    e.currentTarget.dataset.triggered = true;

    removeListenerMulti(getVisibleItem(), 'transitionend webkitTransitionEnd oTransitionEnd', endTransition);

    getVisibleItem().classList.remove('tr-out','tr-active');
    getVisibleItem().classList.add('off');

    removeListenerMulti(getNextItem(), 'transitionend webkitTransitionEnd oTransitionEnd', endTransition);
    getNextItem().dataset.triggered = false;

    getNextItem().classList.remove('off','tr-in');
    getNextItem().classList.add('tr-active');

    setVisibleItem(nextIndex);
    setNextItem();
    wait(TRANSITION_DELAY);
  }

  var getVisibleItem = function () {
    return $bannerItemList[visibleIndex];
  }

  var setVisibleItem = function (index) {
    visibleIndex = index;
  }

  var getNextItem = function () {
    return $bannerItemList[nextIndex];
  }

  var setNextItem = function () {
    nextIndex += 1;

    if (nextIndex >= $bannerItemList.length) {
      nextIndex = 0;
    }
  }


  var getHeight = function () {
    return $bannerContainer.offsetHeight;
  }

  init();
});
