var everliveModule = require("../../baas/everlive.all.min");
var observableModule = require("data/observable");

var meetupDetailsObservable = new observableModule.Observable();

var everliveHook = new everliveModule({
    apiKey: global.everliveApiKey,
    scheme: "https"
});

var selectedMeetupIndex;
var selectedMeetup;
var selectedSpeaker;

function FetchMeetup(){
    selectedMeetup = global.appWideMeetupList[this.selectedMeetupIndex];
    meetupDetailsObservable.set("meetupImageURL", selectedMeetup.ImageURL);
    meetupDetailsObservable.set("meetupTopic", selectedMeetup.Topic);
    meetupDetailsObservable.set("meetupAbstract", selectedMeetup.Abstract);
    meetupDetailsObservable.set("meetupSpecials", selectedMeetup.Specials);
}

function FetchSpeaker(){
    var speakerLookup = everliveHook.data('Speakers');
    speakerLookup.getById(selectedMeetup.SpeakerId)
                 .then(function(data){
                      selectedSpeaker = data.result;
        			  meetupDetailsObservable.set("speakerName", selectedSpeaker.Name);
                      meetupDetailsObservable.set("speakerTwitter", selectedSpeaker.Twitter);
                      meetupDetailsObservable.set("speakerBio", selectedSpeaker.Bio);
        			  meetupDetailsObservable.set("speakerImageURL", selectedSpeaker.ImageURL);
                 });
}

function InitializeRatings(){
    meetupDetailsObservable.set("contentRating", 0);
    meetupDetailsObservable.set("speakerRating", 0);
    meetupDetailsObservable.set("logisticsRating", 0);
    meetupDetailsObservable.set("meetupFeedback", "");
}

function SubmitRatings(){
    var ratingsHandle = everliveHook.data('Ratings');
    ratingsHandle.create({'MeetupId': selectedMeetup.Id,
        				  'ContentRating': meetupDetailsObservable.contentRating, 
                          'SpeakerRating': meetupDetailsObservable.speakerRating,
                          'LogisticsRating': meetupDetailsObservable.logisticsRating,
                          'Feedback': meetupDetailsObservable.meetupFeedback})
            .then(function(data){
               
            });
}

exports.meetupDetailsObservable = meetupDetailsObservable;
exports.selectedMeetupIndex = selectedMeetupIndex;
exports.FetchMeetup = FetchMeetup;
exports.FetchSpeaker = FetchSpeaker;
exports.InitializeRatings = InitializeRatings;
exports.SubmitRatings = SubmitRatings;