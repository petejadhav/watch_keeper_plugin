function displayListItem(title, url, date) {
    var ul = document.getElementById("watch_list");
    var li = document.createElement("li");
    var link = document.createElement("a");
    link.setAttribute('href', url)
    link.appendChild(document.createTextNode(title + " - " + date));
    li.appendChild(link);
    ul.appendChild(li);
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
