define(function() {
  const ITEM_CLASS = '.js-item-date';
  const ITEM_CONTAINER_CLASS = '.js-item-date-container';
  const ITEM_EMPTY_CLASS = '.js-item-date-empty';
  const CURRENT_DATE = new Date();
  const $itemContainer = document.querySelector(ITEM_CONTAINER_CLASS);
  const MAX_ITEM = 10;


  let $itemList;

  const init = function () {
    $itemList = getItemList();

    $itemList.forEach(item => {
      let date = new Date(parseInt(item.getAttribute('data-date')) * 1000);
      if (date < CURRENT_DATE) {
        $itemContainer.removeChild(item);
      }
    });

    $itemList = getItemList();
    if ($itemList.length > MAX_ITEM) {
      for (let i = MAX_ITEM; i < $itemList.length; i++) {
        $itemList[i].classList.remove('is-active');
      }
    } else {
      document.querySelector('.js-view-more-button-container').classList.add('hidden');

      if ($itemList.length === 0) {
        document.querySelector(ITEM_EMPTY_CLASS).classList.remove('hidden');
      }
    }
  }

  const getItemList = function () {
    return document.querySelectorAll(ITEM_CLASS);
  }

  init();
});
