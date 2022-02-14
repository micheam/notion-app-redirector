const workspace = 'notion.app.redirector.workspace';
const autoClose = 'notion.app.redirector.autoclosetab';

/** @param {Event} e */
let saveOptions = (e) => {
  e.preventDefault();
  browser.storage.sync.set({
    [workspace]: document.querySelector('#workspace').value,
    [autoClose]: document.querySelector('#autoClose').checked
  });
}

const loadOptions = () => {
  /** @param {Promise} options */
  let setCurrentChoice = (options) => {
    document.querySelector('#workspace').value = options[workspace];
    document.querySelector('#autoClose').checked = options[autoClose];
  }

  /** @param {Error} err */
  let onError = (err) => console.log(`Error: ${err}`);

  /** @type {Promise} */
  let getting = browser.storage.sync.get();

  // Execute
  getting.then(setCurrentChoice).catch(onError)
}

document.addEventListener("DOMContentLoaded", loadOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
