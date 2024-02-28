const blockedHostsTextArea = document.querySelector("#blocked-hosts");
const startInput = document.querySelector("#start");
const endInput = document.querySelector("#end");

// Store the currently selected settings using browser.storage.local.
function storeBlockedHostsSettings() {
  let blockedHosts = blockedHostsTextArea.value.split("\n");
  browser.storage.local.set({
    "blockedHosts": blockedHosts
  });
}

function storeStartSettings() {
  browser.storage.local.set({
    "start": startInput.value
  });
}

function storeEndSettings() {
  browser.storage.local.set({
    "end": endInput.value
  });
}

// Update the options UI with the settings values retrieved from storage,
// or the default settings if the stored settings are empty.
function updateUI(restoredSettings) {
  blockedHostsTextArea.value = restoredSettings.blockedHosts.join("\n");
  startInput.value = restoredSettings.start;
  endInput.value = restoredSettings.end;
}

function onError(e) {
  console.error(e);
}

// On opening the options page, fetch stored settings and update the UI with them.
browser.storage.local.get().then(updateUI, onError);

// Whenever the contents of the textarea changes, save the new values
blockedHostsTextArea.addEventListener("change", storeBlockedHostsSettings);
startInput.addEventListener("change", storeStartSettings);
endInput.addEventListener("change", storeEndSettings);
