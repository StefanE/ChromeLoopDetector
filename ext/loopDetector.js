
// Run our kitten generation script as soon as the document's DOM is ready.
//document.addEventListener('DOMContentLoaded', function () {
//});


var key = "visits";

var opt = {
  type: 'basic',
  title: 'Surf Loop detected!',
  message: 'You have entered a surf loop!',
  priority: 0,
  //items: [{ title: '', message: ''}],
  iconUrl:'/loopWarning.png'
};

var loopTime = 60000 * 20;

localStorage.setItem(key,"{}");


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    //Get history
    var retrievedObject = localStorage.getItem(key);
    var map = JSON.parse(retrievedObject)
    //is current URL in map?
    //If yes give notification
    var lastVisit = map[request.url];
    if(lastVisit) {
      var allowedTimeEntry = Date.now() - loopTime;

      //if it's less than loopTime ago we last visited this page
      if(allowedTimeEntry < lastVisit) {
        chrome.notifications.create(allowedTimeEntry.toString(), opt, function(id) {});
      }

    } 
    //not visited before add it now
    else {
      map[request.url] = Date.now();
      localStorage.setItem(key,JSON.stringify(map));
    }

    //Cleanup of old entries some place

    //chrome.notifications.create('loopDetected', opt, function(id) {});
  });