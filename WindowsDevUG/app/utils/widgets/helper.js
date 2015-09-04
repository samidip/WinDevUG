'use strict';
var frame = require('ui/frame');

function platformInit(page) {
    var top = frame.topmost(),
        ios = top.ios,
        android = top.android;

    if (android) {
        android.defaultAnimatedNavigation = true;
    }

    if (ios) {
        ios.navBarVisibility = 'never';
        // Restore back swipe gesture
        if (top.canGoBack()) {
            page.ios.navigationController.interactivePopGestureRecognizer.delegate = page.ios;
        }
    }
}

function back() {
    frame.topmost().goBack();
}

function navigate(location) {
    frame.topmost().navigate(location);
}

exports.back = back;
exports.navigate = navigate;
exports.platformInit = platformInit;
