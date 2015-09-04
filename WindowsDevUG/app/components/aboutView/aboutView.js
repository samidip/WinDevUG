'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),

    platform = require('platform'),
    frame = require('ui/frame'),
    image = require("ui/image"),
    // additional requires

    viewModel = require('./aboutView-view-model');

function onOpenUrl(data) {
    var url = data.url;

    if (!url) {
        return;
    }

    if (platform.device.os === platform.platformNames.ios) {
        var nsUrl = NSURL.URLWithString(url),
            sharedApp = UIApplication.sharedApplication();

        if (sharedApp.canOpenURL(nsUrl)) {
            sharedApp.openURL(nsUrl);
        }
    } else if (platform.device.os === platform.platformNames.android) {
        var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(url)),
            activity = frame.topmost().android.activity;
        activity.startActivity(android.content.Intent.createChooser(intent, "share"));
    }
}
// additional functions

function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;
    // additional pageLoaded

    if (isInit) {
        isInit = false;

        viewModel.on(viewModel.events.openUrl, onOpenUrl);
        // additional pageInit

    }
}

// START_CUSTOM_CODE_aboutView
// END_CUSTOM_CODE_aboutView
exports.pageLoaded = pageLoaded;