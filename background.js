chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ 'watch_list':[{'date':'2021-08-01', 'url':'https://qwe.com', 'title':'qwe'}] });
  console.log('Initialized empty watch list');
});