var view = require("ui/core/view");
var frameModule = require("ui/frame");
var colorModule = require("color");

var vmModule = require("./homeViewModel");

function pageLoaded(args) 
{
    var page = args.object;
    
    if (page.ios) 
    {
        page.ios.title = "WinDevUG";
        var appFrame = frameModule.topmost();
        var controller = appFrame.ios.controller;
        var navBar = controller.navigationBar;
        
        navBar.barTintColor  = new colorModule.Color("#FFA500").ios;
        navBar.tintColor = UIColor.whiteColor();
        navBar.titleTextAttributes = new NSDictionary([UIColor.whiteColor()], [NSForegroundColorAttributeName]);
        navBar.barStyle = UIBarStyle.UIStatusBarStyleLightContent;
        appFrame.ios.navBarVisibility = "always";
    }
}

function pageNavigatedTo (args) 
{
    var page = args.object;
    vmModule.FetchMeetups();
    vmModule.FetchSponsors();
    vmModule.FetchTweets();
    page.bindingContext = vmModule.meetupsObservable;
}

function meetupListItemTap(args)
{
    var appFrame = frameModule.topmost();
    var navigationParams = {
        moduleName: "components/meetupView/meetupView",
        context: {selectedMeetup: args.index},
        animated: true
    };
    appFrame.navigate(navigationParams);
}

exports.pageLoaded = pageLoaded;
exports.meetupListItemTap = meetupListItemTap;
exports.pageNavigatedTo = pageNavigatedTo;