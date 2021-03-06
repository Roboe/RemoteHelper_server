RemoteHelper = (function setUpJobStatusQuerier() {
    "use strict";

    if (!('EventSource' in window)) return;

    var helpJobDoneStatus = false;
    var source = new EventSource('/api/stream');


    source.addEventListener('open', function() {
        console.log('Opened connection');
    });

    // TODO: Add origin attribute?
    source.addEventListener('jobcomplete', function(e) {
        var eventData = JSON.parse(e.data);
        helpJobDoneStatus = eventData.done;

        // Tell the user to get the f*ck out
        // close the stream, we no longer need it
        source.close();
    });

    source.addEventListener('error', function(e) {
        if (e.readyState === EventSource.CLOSED) {
            console.log('Connection was closed');
        }
    });


    return {
        isHelpJobDone: function() {
            return helpJobDoneStatus;
        }
    };
}());
