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
