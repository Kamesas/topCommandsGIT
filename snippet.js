select.getElementsByTagName('option')[0].remove();

if (select) {
  if ('createEvent' in document) {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('change', false, true);
    evt.value = '0';
    select.dispatchEvent(evt);
  } else {
    select.fireEvent('onchange');
  }
}



Object.keys(OlbSession).forEach(function (item) {
      var current = OlbSession[item];
      
      console.log('%c - - - - - [ keys ]  - - - - - ', 'color: green; font-size: 16px;', '\n', current);
      return current

    });
