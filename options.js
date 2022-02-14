const wsKey = 'notion.app.redirector.workspace';

/** @param {Event} e */
const saveOptions = (e) => {
  e.preventDefault();
  browser.storage.sync.set({
    [wsKey]: document.querySelector('#workspace').value
  });
}

const loadOptions = () => {
  /** @param {Promise} result */
  const setCurrentChoice = (result) => {
    document.querySelector('#workspace').value = result[wsKey];
  }

  /** @param {Error} err */
  const onError = (err) => console.log(`Error: ${err}`);

  /** @type {Promise} */
  const getting = browser.storage.sync.get(wsKey);

  getting.then(setCurrentChoice).catch(onError)
}

document.addEventListener("DOMContentLoaded", loadOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
