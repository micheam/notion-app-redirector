const wsKey = 'notion.app.redirector.workspace';

/** 
 * @param {string} ws 
 * @param {URL} curr 
 * */
const check = (ws, curr) => {
  const regex = new RegExp('^https?://.*\.notion\.so/' + ws + '/.*')
  console.log(regex.source)
  return regex.test(curr.href)
}

/** @param {URL} curr */
const handle = (curr) => {
  curr.protocol = 'notion:'
  return curr
}

/**
 * @param {Promise} result
 */
const exec = (result) => {
  const curr = new URL(window.location.href)
  if (check(result[wsKey], curr)) {
    window.location.assign(handle(curr).href);
    window.setTimeout(()=> window.close(), 3000)
  }
}

/** @type {Promise} */
var getWS = browser.storage.sync.get(wsKey);
getWS.then(exec).catch((reason) => console.error(reason));

