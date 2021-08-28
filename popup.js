function displayListItem(title, url, date) {
    var ul = document.getElementById("watch_list");
    var li_str = `<a href='{url}'>{title} - {date}</a> <button class='{title}' id="replace-btn">Replace</button> <button class='{title}' id="remove-btn">Remove</button>`
    li_str = li_str.replaceAll('{url}',url).replaceAll('{title}',title).replaceAll('{date}',date)
    var li = document.createElement("li");
    li.setAttribute('id',title);
    li.innerHTML = li_str;
    ul.appendChild(li);
}

async function replace(e){
    console.log(e);
    var className = e.target.className

    document.getElementById(className).remove();
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.storage.sync.get(['watch_list'], function(result) {
        var list = result['watch_list']
        console.log(list);
        var newObj = {'date':new Date().toISOString().slice(0, 10), 'url':tab.url, 'title':tab.title}
        list[list.findIndex(obj => obj.title == className)] = newObj
        chrome.storage.sync.set({ 'watch_list': list });
        displayListItem(newObj['title'], newObj['url'], newObj['date']);
    });
    
    console.log("removed")

}

function remove(e){
    console.log(e)
    var className = e.target.className

    document.getElementById(className).remove();

    chrome.storage.sync.get(['watch_list'], function(result) {
        var list = result['watch_list']
        console.log(list);
        list.splice(list.findIndex(obj => obj.title == className),1)
        chrome.storage.sync.set({ 'watch_list': list });
    });

    console.log("removed")
}

function createNewList(name){

}

function appendWatchList(title, url, date){
    chrome.storage.sync.get(['watch_list'], function(result) {
        var list = result['watch_list']
        console.log(list);
        list.push({'date':date, 'url':url, 'title':title})
        chrome.storage.sync.set({ 'watch_list': list });
        displayListItem(title, url, date);
    });
}

window.onload = () => {
    console.log("popup loaded");
    // add items to list display
    chrome.storage.sync.get(['watch_list'], function(result) {
        console.log(result['watch_list']);
        result['watch_list'].forEach(element => {
            displayListItem(element.title, element.url, element.date);
        });
    });
}

document.getElementById("get_title").addEventListener("click", async (e) => {
    console.log("clicked");
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log(tab.title);
    console.log(tab.url);
    //displayListItem(tab.title, tab.url, "2021-01-01");
    appendWatchList(tab.title, tab.url, new Date().toISOString().slice(0, 10));
})

document.body.addEventListener('click', async (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
      return;
    }
  
    if(event.target.id=='replace-btn')
        replace(event);
    else if(event.target.id=='remove-btn')
        remove(event);
  })
  
