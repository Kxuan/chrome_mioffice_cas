"use strict";

let el_buf = document.getElementById('buf');
let el_title = document.getElementById('title');
let el_cp_pwd = document.getElementById('cp_pwd');
let el_cp_pwd_otp = document.getElementById('cp_pwd_otp');
let el_cp_pwd_lf_otp = document.getElementById('cp_pwd_lf_otp');
let el_cp_otp = document.getElementById('cp_otp');

el_title.innerText = chrome.i18n.getMessage('browser_action_copy_label');
el_cp_pwd.innerText = chrome.i18n.getMessage('browser_action_copy_pwd');
el_cp_pwd_otp.innerText = chrome.i18n.getMessage('browser_action_copy_pwd_otp');
el_cp_pwd_lf_otp.innerText = chrome.i18n.getMessage('browser_action_copy_pwd_lf_otp');
el_cp_otp.innerText = chrome.i18n.getMessage('browser_action_copy_otp');

var current_cfg = {
    "un": null,
    "pw": null,
    "otp": null
};

function loadCfg(cfg) {
    Object.assign(current_cfg, cfg);
    if (current_cfg.pw) {
        el_cp_pwd.classList.remove("disabled");
        el_cp_pwd.addEventListener('click', copy_pwd);

        if (current_cfg.otp) {
            el_cp_pwd_otp.classList.remove("disabled");
            el_cp_pwd_otp.addEventListener('click', copy_pwd_otp);
            el_cp_pwd_lf_otp.classList.remove("disabled");
            el_cp_pwd_lf_otp.addEventListener('click', copy_pwd_lf_otp);
            el_cp_otp.classList.remove("disabled");
            el_cp_otp.addEventListener('click', copy_otp);
        }
    }
}

function docopy(text) {
    el_buf.style.display = 'block';
    el_buf.value = text;
    el_buf.focus();
    el_buf.selectionEnd = text.length;
    el_buf.selectionStart = 0;
    document.execCommand('copy');
    el_buf.style.display = 'none';
}

function copy_pwd() {
    docopy(current_cfg.pw);
    window.close()
}

function copy_otp() {
    let totp = new jsOTP.totp();
    docopy(totp.getOtp(current_cfg.otp));
    window.close()
}

function copy_pwd_otp() {
    let totp = new jsOTP.totp();
    docopy(current_cfg.pw + totp.getOtp(current_cfg.otp));
    window.close()
}

function copy_pwd_lf_otp() {
    let totp = new jsOTP.totp();
    docopy(current_cfg.pw + "\n" + totp.getOtp(current_cfg.otp) + "\n");
    window.close()
}

chrome.storage.sync.get(current_cfg, loadCfg);