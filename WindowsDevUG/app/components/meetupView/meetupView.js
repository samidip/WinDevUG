var view = require("ui/core/view");
var frameModule = require("ui/frame");
var colorModule = require("color");

var vmModule = require("./meetupViewModel");
var thankYouLabel;
var contentRatingSlider, speakerRatingSlider, logisticsRatingSlider, feedbackTextView;

function pageLoaded(args) {
    var page = args.object;
    thankYouLabel = view.getViewById(page, "thanksLabel");
    contentRatingSlider = view.getViewById(page, "contentRatingSlider");
    speakerRatingSlider = view.getViewById(page, "speakerRatingSlider");
    logisticsRatingSlider = view.getViewById(page, "logisticsRatingSlider");
    feedbackTextField = view.getViewById(page, "feedbackTextField");
    
    if (page.ios) {
        page.ios.title = "Meetups";
        var appFrame = frameModule.topmost();
        var controller = appFrame.ios.controller;
        var navBar = controller.navigationBar;

        navBar.barTintColor  = new colorModule.Color("#FFA500").ios;
        navBar.tintColor = UIColor.whiteColor();
        navBar.titleTextAttributes = new NSDictionary([UIColor.whiteColor()], [NSForegroundColorAttributeName]);
        navBar.barStyle = UIBarStyle.UIStatusBarStyleLightContent ;
        appFrame.ios.navBarVisibility = "always";
    }
}

function pageNavigatedTo (args) {
    var page = args.object;
    vmModule.selectedMeetupIndex = JSON.stringify(page.navigationContext.selectedMeetup);
    vmModule.FetchMeetup();
    vmModule.FetchSpeaker();
    vmModule.InitializeRatings();
    
    page.bindingContext = vmModule.meetupDetailsObservable;
}

function ratingSubmission (args){
    vmModule.SubmitRatings();
    
    var submitButton = args.object;
    submitButton.opacity = ".2";
    thankYouLabel.visibility = "visible";
    contentRatingSlider.opacity = ".2";
    speakerRatingSlider.opacity = ".2";
    logisticsRatingSlider.opacity = ".2";
    feedbackTextField.opacity = ".2";
}

exports.pageLoaded = pageLoaded;
exports.pageNavigatedTo  = pageNavigatedTo;
exports.ratingSubmission = ratingSubmission;