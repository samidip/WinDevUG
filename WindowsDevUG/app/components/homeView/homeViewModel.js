var everliveModule = require("../../baas/everlive.all.min");
var observableModule = require("data/observable");

var meetupsObservable = new observableModule.Observable();

var everliveHook = new everliveModule(
{
    apiKey: global.everliveApiKey,
    scheme: "https"
});

if (global.appWideMeetupList.legth > 0)
{
    meetupsObservable.set("bindableMeetupItems", global.appWideMeetupList);
}
else
{
    var bindableMeetupItems = [];;
    var meetupsList = everliveHook.data('Meetups');
    meetupsList.get()
              .then(function(data){
               for(var i = 0; i < data.result.length; i++)
               {
                     bindableMeetupItems.push(data.result[i]);
                     global.appWideMeetupList.push(data.result[i]);
               }
            });
    meetupsObservable.set("bindableMeetupItems", bindableMeetupItems);
}

function FetchMeetups()
{
   
}

function FetchSponsors()
{
    var sponsorsList = [
        {"Name":"Telerik", "Image":"~/resources/TelerikLogo.png", "URL":"http://www.telerik.com/"},
        {"Name":"Improving", "Image":"~/resources/ImprovingLogo.jpg", "URL":"http://www.improvingenterprises.com/"},
        {"Name":"Microsoft","Image": "~/resources/MicrosoftLogo.jpg", "URL":"https://www.microsoft.com/en-us/"},
        {"Name":"Pluralsight", "Image":"~/resources/PluralsightLogo.jpeg", "URL":"http://www.pluralsight.com/"},
        {"Name":"Infragistics", "Image":"~/resources/InfraLogo.JPG", "URL":"http://www.infragistics.com/"},
        {"Name":"ComponentOne", "Image":"~/resources/C1Logo.png", "URL":"http://www.componentone.com/"},
        {"Name":"Live360", "Image":"~/resources/Live360Logo.jpg", "URL":"https://live360events.com/Home.aspx"}
    ];
    meetupsObservable.set("bindableSponsorItems", sponsorsList);
}

function FetchTweets()
{
    var twitterEmbed = '<a class="twitter-timeline" data-dnt="true" href="https://twitter.com/windowsdevug" data-widget-id="645221322654527488">Tweets by @windowsdevug</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>';
	meetupsObservable.set("bindableTwitterFeed", twitterEmbed);
}

exports.meetupsObservable = meetupsObservable;
exports.FetchMeetups = FetchMeetups;
exports.FetchSponsors = FetchSponsors;
exports.FetchTweets = FetchTweets;