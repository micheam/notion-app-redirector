const workspace = 'notion.app.redirector.workspace';
const autoClose = 'notion.app.redirector.autoclosetab';

/** @type {Promise} */
var getOptions = browser.storage.sync.get();
getOptions.then((options) => {
  const curr = new URL(window.location.href)
  const regex = new RegExp('^https?://.*\.notion\.so/' + options[workspace] + '/.*')
  if (!regex.test(curr.href)) {
    Promise.reject("url unmatched") 
  }
  return options

}).then((options) => {
  const curr = new URL(window.location.href)
  curr.protocol = 'notion:'
  window.location.assign(curr.href);
  return options

}).then((options) => {
  if (options[autoClose]) {
    window.close() 
  }

}).catch((reason) => console.error(reason));

