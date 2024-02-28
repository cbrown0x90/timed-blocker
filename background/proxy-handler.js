function formatDate(dateStr) {
  parts = dateStr.split(":");
  return {"hour": parts[0], "min": parts[1]}
}

// Get the stored list
browser.storage.local.get(data => {
  if (data.blockedHosts) {
    blockedHosts = data.blockedHosts;
  }
  if (data.start) {
    start = formatDate(data.start);
  }
  if (data.end) {
    end = formatDate(data.end);
  }
});

// Listen for changes in the blocked list
browser.storage.onChanged.addListener(changeData => {
  if (changeData.blockedHosts) {
    blockedHosts = changeData.blockedHosts.newValue;
  }
  if (changeData.start) {
    start = formatDate(changeData.start.newValue);
  }
  if (changeData.end) {
    end = formatDate(changeData.end.newValue);
  }
});

// Managed the proxy

// Listen for a request to open a webpage
browser.proxy.onRequest.addListener(handleProxyRequest, {urls: ["<all_urls>"]});

// On the request to open a webpage
function handleProxyRequest(requestInfo) {
    if (start && end) {
    let time = new Date()
    let startDate = new Date()
    startDate.setHours(start.hour, start.min, 0);
    let endDate = new Date()
    endDate.setHours(end.hour, end.min, 0);
    if ((endDate < startDate && (time <= endDate || time >= startDate)) || (startDate <= endDate && (time >= startDate && time <= endDate))) {
// Read the web address of the page to be visited 
      const url = new URL(requestInfo.url);
// Determine whether the domain in the web address is on the blocked hosts list
      for (const blockedHost of blockedHosts) {
        if (url.hostname.match(blockedHost)) {
// Write details of the proxied host to the console and return the proxy address
          console.log(`Proxying: ${url.hostname}`);
          return {type: "http", host: "127.0.0.1", port: 65535}; 
        }
      }
    }
  }
// Return instructions to open the requested webpage
  return {type: "direct"};
}

// Log any errors from the proxy script
browser.proxy.onError.addListener(error => {
  console.error(`Proxy error: ${error.message}`);
});



