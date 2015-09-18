var everliveModule = require("../../baas/everlive.all.min");
var observableModule = require("data/observable");

var meetupsObservable = new observableModule.Observable();

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
meetupsObservable.set("bindableMeetupItems", bindableMeetupItems);

var sponsorsList = [
    {"Name":"Telerik", "Image":"~/resources/TelerikLogo.png", "URL":"someUrl"},
    {"Name":"Improving", "Image":"~/resources/ImprovingLogo.jpg", "URL":"someUrl"},
    {"Name":"Microsoft","Image": "~/resources/MicrosoftLogo.jpg", "URL":"someUrl"},
    {"Name":"Infragistics", "Image":"~/resources/InfraLogo.JPG", "URL":"someUrl"},
    {"Name":"ComponentOne", "Image":"~/resources/C1Logo.png", "URL":"someUrl"},
    {"Name":"Pluralsight", "Image":"~/resources/PluralsightLogo.jpeg", "URL":"someUrl"},
    {"Name":"Live360", "Image":"~/resources/Live360Logo.jpg", "URL":"someUrl"}
];
meetupsObservable.set("bindableSponsorItems", sponsorsList);


exports.meetupsObservable = meetupsObservable;