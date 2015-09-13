var everliveModule = require("../../baas/everlive.all.min");
var observableModule = require("data/observable");

var everliveHook = new everliveModule({
    apiKey: global.everliveApiKey,
    scheme: "https"
});

var bindableMeetupItems = [];
var meetupsList = everliveHook.data('Meetups');
meetupsList.get()
        .then(function(data){
    	   for(var i = 0; i < data.result.length; i++){
                 bindableMeetupItems.push(data.result[i]);
                 global.appWideMeetupList.push(data.result[i]);
              }
        });

var meetupsObservable = new observableModule.Observable();
meetupsObservable.set("bindableMeetupItems", bindableMeetupItems);

exports.meetupsObservable = meetupsObservable;