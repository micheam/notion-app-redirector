const workspace = 'notion.app.redirector.workspace';
const autoClose = 'notion.app.redirector.autoclosetab';
const cancelled = 'notion.app.redirector.cancelled';

/** @type {Promise} */
var getOptions = browser.storage.sync.get();
getOptions.then((options) => {
  const curr = new URL(window.location.href)
  const regex = new RegExp('^https?://.*\.notion\.so/' + options[workspace] + '/.*')
  return regex.test(curr.href) ? options : Promise.reject(cancelled) 

}).then((options) => {
  const curr = new URL(window.location.href)
  curr.protocol = 'notion:'
  window.location.assign(curr.href);
  return options

}).then((options) => {
  if (options[autoClose]) {
    window.close() 
  }

}).catch((reason) => {
  if (reason !== cancelled) { console.error(reason) }
});

