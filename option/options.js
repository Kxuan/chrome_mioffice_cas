"use strict";

var el_save = document.getElementById("save"),
    el_un = document.getElementById("un"),
    el_pw = document.getElementById("pw"),
    el_otp = document.getElementById("otp"),
    el_auto_login = document.getElementById("auto_login"),
    el_status = document.getElementById("status");

var current_cfg = {
    "un": null,
    "pw": null,
    "otp": null,
    "auto_login": false,
};

// Saves options to chrome.storage
function save_options() {
    current_cfg.un = el_un.value;
    current_cfg.pw = el_pw.value;
    current_cfg.otp = el_otp.value;
    current_cfg.auto_login = el_auto_login.checked;

    el_save.disabled = "disabled";
    el_status.textContent = chrome.i18n.getMessage("opt_saving");

    chrome.storage.sync.set(current_cfg, function () {
        el_status.textContent = chrome.i18n.getMessage("opt_saved");
        el_save.disabled = "";
        setTimeout(function () {
            el_status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    el_status.textContent = chrome.i18n.getMessage("opt_loading");

    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get(current_cfg, function (cfg) {
        Object.assign(current_cfg, cfg);
        el_un.value = current_cfg.un;
        el_pw.value = current_cfg.pw;
        el_otp.value = current_cfg.otp;
        el_auto_login.checked = current_cfg.auto_login;
        el_status.textContent = ""
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);