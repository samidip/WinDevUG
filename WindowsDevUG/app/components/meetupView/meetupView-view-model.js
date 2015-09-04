'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;

ViewModel = new Observable({

    pageTitle: 'Meetups',

    listItems: [],
    // additional properties

});

// START_CUSTOM_CODE_meetupView
// END_CUSTOM_CODE_meetupView
module.exports = ViewModel;