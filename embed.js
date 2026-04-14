(function() {
    if (window.ksRunnerInit) return;

    // This line gets patched up by the cloud
    var pxtConfig = {
    "relprefix": "/MakeCode-Arcade/",
    "verprefix": "",
    "workerjs": "/MakeCode-Arcade/worker.js",
    "monacoworkerjs": "/MakeCode-Arcade/monacoworker.js",
    "gifworkerjs": "/MakeCode-Arcade/gifjs/gif.worker.js",
    "serviceworkerjs": "/MakeCode-Arcade/serviceworker.js",
    "typeScriptWorkerJs": "/MakeCode-Arcade/tsworker.js",
    "pxtVersion": "12.2.24",
    "pxtRelId": "localDirRelId",
    "pxtCdnUrl": "/MakeCode-Arcade/",
    "commitCdnUrl": "/MakeCode-Arcade/",
    "blobCdnUrl": "/MakeCode-Arcade/",
    "cdnUrl": "/MakeCode-Arcade/",
    "targetVersion": "0.0.0",
    "targetRelId": "",
    "targetUrl": "",
    "targetId": "arcade",
    "simUrl": "/MakeCode-Arcade/simulator.html",
    "simserviceworkerUrl": "/MakeCode-Arcade/simulatorserviceworker.js",
    "simworkerconfigUrl": "/MakeCode-Arcade/workerConfig.js",
    "partsUrl": "/MakeCode-Arcade/siminstructions.html",
    "runUrl": "/MakeCode-Arcade/run.html",
    "docsUrl": "/MakeCode-Arcade/docs.html",
    "multiUrl": "/MakeCode-Arcade/multi.html",
    "asseteditorUrl": "/MakeCode-Arcade/asseteditor.html",
    "isStatic": true,
    "kioskUrl": "/MakeCode-Arcade/kiosk.html",
    "teachertoolUrl": "/MakeCode-Arcade/teachertool.html",
    "tutorialtoolUrl": "/MakeCode-Arcade/tutorialtool.html",
    "skillmapUrl": "/MakeCode-Arcade/skillmap.html",
    "multiplayerUrl": "/MakeCode-Arcade/multiplayer.html",
    "authcodeUrl": "/MakeCode-Arcade/authcode.html"
};

    var scripts = [
        "/MakeCode-Arcade/highlight.js/highlight.pack.js",
        "/MakeCode-Arcade/marked/marked.min.js",
    ]

    if (typeof jQuery == "undefined")
        scripts.unshift("/MakeCode-Arcade/jquery.js")
    if (typeof jQuery == "undefined" || !jQuery.prototype.sidebar)
        scripts.push("/MakeCode-Arcade/semantic.js")
    if (!window.pxtTargetBundle)
        scripts.push("/MakeCode-Arcade/target.js");
    scripts.push("/MakeCode-Arcade/pxtembed.js");

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
