const { autoUpdater, ipcMain, Notification } = require("electron");
const isDev = require("electron-is-dev");
const isOnline = require("is-online");
const ms = require("ms");
const noop = require("noop2");
const Raven = require("raven");
const { version } = require("./package");
const { platform } = require("os");

const updateHost = "https://barnacal-updates.now.sh";

let isInitialized = false;

const init = () => {
  autoUpdater.on("error", (err, msg) => {
    console.error("Error checking for updates: ", msg, err.stack);

    if (!isDev) isOnline().then(() => Raven.captureException(err)).catch(noop);
  });

  autoUpdater.setFeedURL(`${updateHost}/update/${platform()}/${version}`);

  // Don't check immediately on start for windows
  setTimeout(() => {
    autoUpdater.checkForUpdates();
  }, ms("10s"));

  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, ms("60m"));

  isInitialized = true;
};

const onUpdate = (window, releaseNotes, releaseName) => {
  if (Notification.isSupported()) {
    const notification = new Notification({
      title: "Barnacal update available",
      body: `Barnacal ${releaseName} is ready to install. Click to apply the update.`
    });

    notification.show();

    notification.on("click", autoUpdater.quitAndInstall);
  }

  window.webContents.send("update-ready", { releaseNotes, releaseName });
};

module.exports = window => {
  if (!isInitialized) init();

  autoUpdater.on("update-downloaded", (evt, releaseNotes, releaseName) => {
    window.webContents.send("update-downloaded");
    onUpdate(window, releaseNotes, releaseName);
  });

  ipcMain.on("install-update", autoUpdater.quitAndInstall);

  window.on("close", autoUpdater.removeAllListeners);
};

module.exports.isInitialized = isInitialized;
module.exports.init = init;
module.exports.onUpdate = onUpdate;
