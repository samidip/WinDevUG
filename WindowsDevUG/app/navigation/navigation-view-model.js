'use strict';
var menuItems,
    observable = require('data/observable'),
    navigationViewModel = new observable.Observable();

menuItems = [{
    "title": "Meetups",
    "modulePath": "components/meetupView/meetupView",
    "icon": "~/images/icons/organize.png"
}, {
    "title": "About",
    "modulePath": "components/aboutView/aboutView",
    "icon": "~/images/icons/info.png"
}];

navigationViewModel.set('menuItems', menuItems);
navigationViewModel.set('backButtonHidden', true);

module.exports = navigationViewModel;