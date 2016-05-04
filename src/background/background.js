/**
 * @fileoverview This is the code that runs in the background, as one instance for all Chrome tabs.
 *
 * This can communicate with the 'content.js' script that runs on each page matching https://www.salesforce.com/*"
 *
 * Note that we need to keep track of the state data from each tab separately.
 */
// areSettingsLoaded = airtableAPIClient.loadSettings();
// 
// 
// var iconBackgroundImageSrc = 'icons/airtable-icon-32.png',
//     // This background process runs for all tabs, so we need to keep track of the state of each tab independently
//     stateByTabId = {};
// 
// /**
//  * Listen to the content script
//  */
// 
// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//     console.log('request', request);
//     var tabId = sender.tab.id;
// 
//     // First signal from the content page when it's loading
//     if (request.status === 'loading') {
//       //open new page  
//       // chrome.tabs.create({url: 'https://jobhuk.com'});
//       // Show page action icon in address bar
//         chrome.pageAction.show(tabId);
//         iconManager.setLoadingIcon(tabId, iconBackgroundImageSrc);
//         chrome.pageAction.setTitle({tabId: tabId, title: 'Retrieving LinkedIn and Your Jobhuk Account records…'});
// 
//      } else if (request.status === 'scraping_success') {
//         var stateOfTab = stateByTabId[tabId];				
//         //	alert(JSON.stringify(request.scrapedData));
//         //send this data server and save it under user profile.
//         console.log('scrapeddata',request.scrapedData.name);
// 		iconManager.setSuccessIcon(tabId, iconBackgroundImageSrc);
// 		chrome.pageAction.setTitle({tabId: tabId, title: 'salesforce contact was successfully imported'});
// 
//         //        iconManager.setUploadIcon(tabId, iconBackgroundImageSrc);
//         sendResponse('success');
// 
// 
// //                iconManager.setErrorIcon(tabId, iconBackgroundImageSrc);
// //                chrome.pageAction.setTitle({tabId: tabId, title:'Error during contacts loading'});
// //                sendResponse('error');
//      } else if (request.status === 'scraping_error') {
//         iconManager.setErrorIcon(tabId, iconBackgroundImageSrc);
//         chrome.pageAction.setTitle({tabId: tabId, title:'Error during scraping'});
//         sendResponse('success');
//     } else {
//         sendResponse('error');
//     }
// });
// 
// console.log('setup clicked page action');
// 
// /**
//  * Listen to the user clicking on the page action icon in the address bar
//  */

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    var activeTab = tabs[0];
	    chrome.tabs.sendMessage(activeTab.id, {status:'start'});
	  });	
	iconManager.setLoadingIcon(tabId, iconBackgroundImageSrc);
	chrome.pageAction.setTitle({tabId: tabId, title: 'Importing salesforce contacts'});
	 
	//return;
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.status === "done" ) {
      console.log('done');
      iconManager.setSuccessIcon(tabId, iconBackgroundImageSrc);
	  chrome.pageAction.setTitle({tabId: tabId, title: 'salesforce contact was successfully imported'});
	
    }
  }
);
