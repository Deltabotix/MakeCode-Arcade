(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/pxt-arcade/",
    "verprefix": "",
    "workerjs": "/pxt-arcade/worker.js",
    "monacoworkerjs": "/pxt-arcade/monacoworker.js",
    "gifworkerjs": "/pxt-arcade/gifjs/gif.worker.js",
    "serviceworkerjs": "/pxt-arcade/serviceworker.js",
    "typeScriptWorkerJs": "/pxt-arcade/tsworker.js",
    "pxtVersion": "12.2.24",
    "pxtRelId": "localDirRelId",
    "pxtCdnUrl": "/pxt-arcade/",
    "commitCdnUrl": "/pxt-arcade/",
    "blobCdnUrl": "/pxt-arcade/",
    "cdnUrl": "/pxt-arcade/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetUrl": "",
    "targetId": "arcade",
    "simUrl": "/pxt-arcade/simulator.html",
    "simserviceworkerUrl": "/pxt-arcade/simulatorserviceworker.js",
    "simworkerconfigUrl": "/pxt-arcade/workerConfig.js",
    "partsUrl": "/pxt-arcade/siminstructions.html",
    "runUrl": "/pxt-arcade/run.html",
    "docsUrl": "/pxt-arcade/docs.html",
    "multiUrl": "/pxt-arcade/multi.html",
    "asseteditorUrl": "/pxt-arcade/asseteditor.html",
    "isStatic": true,
    "kioskUrl": "/pxt-arcade/kiosk.html",
    "teachertoolUrl": "/pxt-arcade/teachertool.html",
    "tutorialtoolUrl": "/pxt-arcade/tutorialtool.html",
    "skillmapUrl": "/pxt-arcade/skillmap.html",
    "multiplayerUrl": "/pxt-arcade/multiplayer.html",
    "authcodeUrl": "/pxt-arcade/authcode.html"
};

    var scripts = [
        "/pxt-arcade/highlight.js/highlight.pack.js",
        "/pxt-arcade/marked/marked.min.js",
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/pxt-arcade/jquery.js")
    if (typeof jQuery == "undefined" || !jQuery.prototype.sidebar)
        scripts.push("/pxt-arcade/semantic.js")
    if (!window.pxtTargetBundle)
        scripts.push("/pxt-arcade/target.js");
    scripts.push("/pxt-arcade/pxtembed.js");

    var pxtCallbacks = []

    window.ksRunnerReady = function(f) {
        if (pxtCallbacks == null) f()
        else pxtCallbacks.push(f)
    }

    window.ksRunnerWhenLoaded = function() {
        pxt.docs.requireHighlightJs = function() { return hljs; }
        pxt.setupWebConfig(pxtConfig || window.pxtWebConfig)
        pxt.runner.setInitCallbacks(pxtCallbacks)
        pxtCallbacks.push(function() {
            pxtCallbacks = null
        })
        pxt.runner.init();
    }

    scripts.forEach(function(src) {
        var script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.head.appendChild(script);
    })

} ())
