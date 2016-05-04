/**
 * @fileoverview This is the code that will run in the context of the content of a page
 * and can interact with the DOM.
 *
 * In manifest.json, we declare that we want this code to run only on the pages matching "https://www.linkedin.com/*"
 */

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.status === "start" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");
	  startScraping();
    }
  }
);

function startScraping() {
    // Add as contact before to be able to expand the profile correctly 
     last_page =  +$('#x-auto-46').text().split('of ')[1];
     console.log("lastpage",last_page);
      addAsContact(function() {
		var asyncLoop = function(o){
		    var i=-1,
		        length = o.length;

		    var loop = function(){
		        i++;
		        if(i==length){o.callback(); return;}
		        o.functionToLoop(loop, i);
		    } 
		    loop();//init
		}
		
		asyncLoop({
		    length : last_page,
		    functionToLoop : function(loop, i){
		        setTimeout(function(){
			       scrapDataAndSendItToBackgroundScript();
			       $('#x-auto-47 > tbody > tr:nth-child(2) > td.x-btn-mc > em > button').click();
		            console.log('Iteration ' +i);
		            loop();
		        },3000);
		    },
		    callback : function(){
		         console.log('All done!');
		    }    
		});
    // expandProfile(scrapDataAndSendItToBackgroundScript);
    });   
		
}

function addAsContact(callback) {
    console.log('addAsContact');
    artoo.autoExpand({
        expand: '.save-to-contacts a',
        isExpanding: function($) {
            return $('#relationship-container').length === 0;
        },
        limit: 1,
        timeout: 3000,
        done: callback
    });
}




function scrapDataAndSendItToBackgroundScript() {
	
    console.log('scrapDataAndSendItToBackgroundScript');
  //*[@id="x-auto-47"]/tbody/tr[2]/td[2]/em/button/img 
    
		var scrapedData = artoo.scrapeTable('#gwt_sfdclistview table.x-grid3-row-table', {
		  headers: 'first',
		  done: artoo.saveCsv
		});	
        
	   	console.log(scrapedData);
		console.log(JSON.stringify(scrapedData));
	    console.log('scrapedData', scrapedData);
	  chrome.runtime.sendMessage({"status": "done"});
   // var scrapedData = artoo.scrapeOne('#gwt_sfdclistview ',{
   //   	   reclist: {sel: '.x-grid3-body',
   //        scrape: {iterator: '.x-grid3-row', data: {
   // 	        name: {sel:'.x-grid3-td-lastname .GJOP1FMOO', method:'text'},	
   // 	        email: {sel:'.x-grid3-td-lastname .gwt-Anchor', method: 'text'},
   //         	phone: {sel:'.x-grid3-td-lastname .gwt-HTML', method: 'text'},
   // 			company: {sel:'.x-grid3-cell-inner .x-grid3-col-companyName', method: 'text'},
   // 			title: {sel:'.x-grid3-cell-inner .x-grid3-col-title', method: 'text'}, 
   // 			city: {sel:'.x-grid3-cell-inner .x-grid3-col-city', method: 'text'},
   // 			state: {sel:'.x-grid3-cell-inner .x-grid3-col-stateCode', method: 'text'},
   // 			country: {sel:'.x-grid3-cell-inner .x-grid3-col-countryName', method: 'text'},
   // 			updated: {sel:'.x-grid3-cell-inner ,x-grid3-col-lastUpdated', method: 'text'}          
   // 	        }
   // 	      } 
   //       }
   //   });
   
    // if (scrapedData === null) {
    //     chrome.extension.sendMessage({status:'scraping_error', scrapedData: scrapedData}, function(response) {
    //         console.log('response', response);
    //     });
    // } else {
    //     chrome.extension.sendMessage({status:'scraping_success', scrapedData: scrapedData}, function(response) {
    //         console.log('response', response);
    //     });
    // }
}
