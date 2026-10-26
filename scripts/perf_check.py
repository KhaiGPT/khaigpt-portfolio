import asyncio, json, subprocess, sys, time, urllib.request
import websockets

URL = sys.argv[1]
PORT = 9333
import os
EXTRA = os.environ.get("EXTRA", "").split()
OBS = """
window.__m={lcp:0,cls:0,shifts:[]};window.__e=[];addEventListener("error",e=>__e.push(String(e.message)));addEventListener("unhandledrejection",e=>__e.push(String(e.reason)));
new PerformanceObserver(l=>{for(const e of l.getEntries()){window.__m.lcp=e.startTime;window.__m.lcpEl=e.element&&(e.element.dataset.art||e.element.tagName+'.'+e.element.className)}}).observe({type:'largest-contentful-paint',buffered:true});
new PerformanceObserver(l=>{for(const e of l.getEntries()) if(!e.hadRecentInput){window.__m.cls+=e.value;window.__m.shifts.push([Math.round(e.startTime),e.value,(e.sources||[]).map(s=>s.node&&s.node.className||s.node&&s.node.nodeName).join('|')])}}).observe({type:'layout-shift',buffered:true});
"""
READ = """JSON.stringify({lcp:Math.round(__m.lcp),lcpEl:__m.lcpEl,cls:+__m.cls.toFixed(4),shifts:__m.shifts,
fcp:Math.round((performance.getEntriesByName('first-contentful-paint')[0]||{}).startTime||0),
load:Math.round(performance.getEntriesByType('navigation')[0].loadEventEnd),
dcl:Math.round(performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd),
ttfb:Math.round(performance.getEntriesByType('navigation')[0].responseStart),
bytes:performance.getEntriesByType('resource').reduce((a,r)=>a+(r.transferSize||0),0)+performance.getEntriesByType('navigation')[0].transferSize,
gl:document.documentElement.dataset.gl||null, paints:performance.getEntriesByType('paint').map(p=>p.name+':'+Math.round(p.startTime)), res:performance.getEntriesByType('resource').filter(r=>r.transferSize>20000).map(r=>r.name.split('/').pop()+':'+Math.round(r.transferSize/1000)+'k@'+Math.round(r.responseEnd)), ds:JSON.stringify(document.documentElement.dataset),err:__e,ric:typeof requestIdleCallback,rs:document.readyState,h1:document.querySelector('h1')&&document.querySelector('h1').textContent})"""

PROFILES = {
    "desktop": dict(w=1440, h=900, mobile=False, dpr=1, cpu=1, net=None),
    "mobile-slow4g": dict(w=390, h=844, mobile=True, dpr=3, cpu=4, net=dict(latency=150, downloadThroughput=1.6e6 / 8, uploadThroughput=750e3 / 8)),
    "desktop-again": dict(w=1440, h=900, mobile=False, dpr=1, cpu=1, net=None),
    "mobile-4g": dict(w=390, h=844, mobile=True, dpr=3, cpu=4, net=dict(latency=40, downloadThroughput=9e6 / 8, uploadThroughput=1.5e6 / 8)),
}


async def run(name, p):
    req = urllib.request.Request(f"http://127.0.0.1:{PORT}/json/new?about:blank", method="PUT")
    ws_url = json.loads(urllib.request.urlopen(req).read())["webSocketDebuggerUrl"]
    async with websockets.connect(ws_url, max_size=None) as ws:
        n = 0
        async def cmd(method, params=None):
            nonlocal n
            n += 1
            await ws.send(json.dumps({"id": n, "method": method, "params": params or {}}))
            while True:
                msg = json.loads(await ws.recv())
                if msg.get("id") == n:
                    return msg.get("result", {})
        for d in ("Page", "Network", "Runtime"):
            await cmd(f"{d}.enable")
        await cmd("Network.setCacheDisabled", {"cacheDisabled": True})
        await cmd("Emulation.setDeviceMetricsOverride", {"width": p["w"], "height": p["h"], "deviceScaleFactor": p["dpr"], "mobile": p["mobile"]})
        await cmd("Emulation.setCPUThrottlingRate", {"rate": p["cpu"]})
        if p["net"]:
            await cmd("Network.emulateNetworkConditions", {"offline": False, **p["net"]})
        await cmd("Page.addScriptToEvaluateOnNewDocument", {"source": OBS})
        await cmd("Page.navigate", {"url": URL})
        await asyncio.sleep(9)
        r = await cmd("Runtime.evaluate", {"expression": READ, "returnByValue": True})
        print(name, r["result"]["value"])


async def main():
    chrome = subprocess.Popen(["/usr/bin/google-chrome", "--headless=new", f"--remote-debugging-port={PORT}", "--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--no-first-run", *EXTRA, "about:blank"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2)
    try:
        for name, p in PROFILES.items():
            await run(name, p)
    finally:
        chrome.kill()

asyncio.run(main())
