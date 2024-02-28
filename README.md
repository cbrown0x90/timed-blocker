
## What it does

This extension uses the proxy API listener `onRequest` to listen for requests to visit a web page, compare the webpage's domain with a blocked host list, and proxy domains on the blocked list to 127.0.0.1.

The list of blocked domains is held in local storage. The list can be modified through the extension"s options page.

Note that the domains are regexes, so .*\.?example\.com will block all subdomain to example.com.

You can also set a start and end time to block requests within.

To try out this extension:
* install it
* visit `about:addons`, open the add-on's preferences, and change the hostnames and times
* visit some pages to see the effect of your changes.

## This is based on [proxy-blocker](https://github.com/mdn/webextensions-examples/tree/main/proxy-blocker)
