async function getChromeStore(
  storeKey: string
) {
  const store =
    await chrome.storage.sync.get(
      storeKey
    );

  if (!(storeKey in store)) {
    await chrome.storage.sync.set({
      [storeKey]: {}
    });
  }

  return store[storeKey];
}

export default getChromeStore;
