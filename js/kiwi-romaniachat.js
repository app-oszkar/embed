/* KiwiChat
 * https://kiwichat.eu.org
 * Embed helper script
 * v1.0.2
 */
console.log('Kiwi RomaniaChat Embed Script');

window.onload = function() {
    var scripts = document.getElementsByTagName('script');
    for (i=0; i<scripts.length; i++) {
        /**
         * Getting element
         */
        var ins = scripts[i].previousElementSibling;
        if (ins && ins.tagName == 'INS' && ins.getAttribute('id')) {
            var insID = ins.getAttribute('id');
            /**
             * Getting if a device is a mobile
             */
        var xs = (screen.width < 768);
            /**
             * Getting type & base URI
             */
        var baseURI = "https://kiwi.romaniachat.eu";
            /**
             * Getting height
             */
        var heightAuto = false;
        var height;
            if (ins.hasAttribute('data-height')) {
                height = parseInt(ins.getAttribute('data-height'));
            } else {
                /**
                 * If height is not set, we calculate with window innser height
                 */
                height = window.innerHeight;
                heightAuto = true;
            }
            /**
             * Getting params
             */
	    var port = '8443';
            var theme = "default";
            var nick = null;
            var chan = null;
            if (ins.hasAttribute('data-theme')) {
                theme = encodeURIComponent(ins.getAttribute('data-theme'));
            }
            if (ins.hasAttribute('data-nick')) {
                nick = encodeURIComponent(ins.getAttribute('data-nick'));
            }
            if (ins.hasAttribute('data-chan')) {
                chan = ins.getAttribute('data-chan');
            }
            /**
             * Generating URI & load
             */
            var URI = baseURI;
			if (port) {
            URI = URI += ':' + port + '/';
              }
            URI = URI + "?theme=" + theme;
            if (nick) {
                URI = URI + "&nick=" + nick;
            }
            if (chan) {
                list = chan.split(',');
                var chanlist = '';
                for (i=0; i<list.length; i++) {
                    if (i > 0) {
                        chanlist = chanlist + ',';
                    }
                    if (list[i].startsWith('#')) {
                        chanlist = chanlist + '#' + encodeURIComponent(list[i].replace('#', ''));
                    } else {
                        chanlist = chanlist + '#' + encodeURIComponent(list[i]);
                    }
                }
                URI = URI + "&chan=" + chanlist;
            }
            console.log('Loading Chat Romania Webchat: '+URI);
            if (xs) {
                /**
                 * If it is a mobile, we redirect
                 */
                window.location.href = URI;
            } else {
                /**
                 * Otherwise, we replace the tag with an IFRAME
                 */
                var iframe = document.createElement('iframe');
                iframe.setAttribute('id', insID);
		iframe.setAttribute('width', '100%');
                iframe.setAttribute('style', 'border:0px;margin:0px;padding:0px;left:0;top:0;position:absolute;');
                iframe.setAttribute('src', URI);
                iframe.setAttribute('height', height);
                if (heightAuto == false) {
                iframe.setAttribute('data-height', height);
                }
                var parent = ins.parentNode;
                parent.replaceChild(iframe, ins);
                console.log('Loaded Chat Romania Webchat sucessfully!');
            }
        } else {
            console.warn('insID not found');
        }
    }
}

window.onresize = function () {
    if (insID) {
        /**
         * Getting element
         */
        var ins = document.getElementById(insID);
        if (ins) {
            var height = ins.getAttribute('data-height');
            if (height) {
            } else {
                /**
                 * As it is set as auto, we resize it
                 */
                height = window.innerHeight;
                ins.setAttribute('height', height);
                console.log('Resized Chat Romania Webchat successfully!');
            }
        } else {
            console.warn('insID not found');
        }
    } else {
        console.warn('insID not set');
    }
}
