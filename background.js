chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ 'watchkeeper_lists':['watch_list'] });
  chrome.storage.sync.set({ 'watch_list':[{'date':'2021-08-01', 'url':'https://qwe.com', 'title':'qwe'}] });
  console.log('Initialized empty watch list');
});