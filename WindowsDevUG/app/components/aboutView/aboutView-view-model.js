'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;

ViewModel = new Observable({

    pageTitle: 'About',

    contactUrl: 'mailto:windowsdevug@live.com',

    twitterUrl: 'https://twitter.com/windowsdevug',

    events: {
        openUrl: 'openUrl'
    },

    onContactTap: function() {
        this.notify({
            eventName: this.events.openUrl,
            url: this.get('contactUrl')
        });
    },

    onTwitterTap: function() {
        this.notify({
            eventName: this.events.openUrl,
            url: this.get('twitterUrl')
        });
    },

    // additional properties

});

// START_CUSTOM_CODE_aboutView
// END_CUSTOM_CODE_aboutView
module.exports = ViewModel;