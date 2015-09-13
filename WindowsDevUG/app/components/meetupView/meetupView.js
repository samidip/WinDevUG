var view = require("ui/core/view");
var frameModule = require("ui/frame");
var colorModule = require("color");

var vmModule = require("./meetupViewModel");

function pageLoaded(args) {
    var page = args.object;
    
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
}

exports.pageLoaded = pageLoaded;
exports.pageNavigatedTo  = pageNavigatedTo;
exports.ratingSubmission = ratingSubmission;