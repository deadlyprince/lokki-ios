/**
 * SMS Composer plugin for PhoneGap
 * window.plugins.SMSComposer
 * 
 * @constructor
 */

(function(cordova) {

    var platform = ((window.device) ? window.device.platform : "browser");
    // only ios yet
    if (platform !== "iOS" && platform !== "Android" && platform !== "Win32NT") {
        return;
    };

    console.log("Creating SMS composer");
    function SMSComposer() {
        this.resultCallback = null;
    }

    SMSComposer.ComposeResultType = {
        Cancelled:0,
        Sent:1,
        Failed:2,
        NotSent:3
    };

    SMSComposer.prototype.showSMSComposer = function(toRecipients, body) {
        console.log("Composing SMS message");
        var args = {};
        if(toRecipients) {
            args.toRecipients = toRecipients;
        }

        if(body) {
            args.body = body;
        }

        cordova.exec(function() {}, function() {}, "SMSComposer", "showSMSComposer",[args]);
    };

    SMSComposer.prototype.showSMSComposerWithCB = function(cbFunction,toRecipients,body) {
        this.resultCallback = cbFunction;
        this.showSMSComposer.apply(this,[toRecipients,body]);
    };

    SMSComposer.prototype._didFinishWithResult = function(res) {
        this.resultCallback(res);
    };

    cordova.addConstructor(function() {

        if(!window.plugins) {
            window.plugins = {};
        }
        window.plugins.smsComposer = new SMSComposer();
    });
})(window.cordova || window.Cordova);