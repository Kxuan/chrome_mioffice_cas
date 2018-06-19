var current_cfg = {
    "un": null,
    "pw": null,
    "otp": null,
    "auto_login": false,
};
var el_un = document.querySelector("input[name='username']"),
    el_pw = document.querySelector("input[name='password']") || document.getElementById("passwd"),
    el_otp = document.querySelector("input[name='d_password']"),
    el_submit = document.querySelector('button[type=submit]') || document.getElementById("submitBtn");

function showStatus(style, text, onclick) {
    let el_wrapper = document.createElement('a');
    let el_message = document.createElement('div');
    el_message.innerText = chrome.i18n.getMessage("extName") + ":" + text;
    el_wrapper.appendChild(el_message);
    if (onclick) {
        el_wrapper.style.cursor = 'pointer';
        el_wrapper.addEventListener('click', onclick);
    }

    if (!el_submit) {
        el_wrapper.classList.add("cas_status_top", style);
        document.body.appendChild(el_wrapper);
    } else {
        el_wrapper.classList.add("cas_status_embeded", style);
        el_submit.parentElement.insertBefore(el_wrapper, el_submit);
    }
    return el_wrapper
}

function fill_otp() {
    let totp = new jsOTP.totp();
    el_otp.value = totp.getOtp(current_cfg.otp);
}

function autofill() {

    if (current_cfg.un === null || current_cfg.un === "" ||
        current_cfg.pw === null || current_cfg.pw === ""
    ) {
        showStatus("warn", chrome.i18n.getMessage("login_not_configured"),
            () => {
                chrome.runtime.sendMessage({"cmd": "openOptionPage"})
            });
        return;
    }
    el_un.value = current_cfg.un;
    el_pw.value = current_cfg.pw;


    if (el_otp && getComputedStyle(el_otp)['display'] !== 'none') {
        fill_otp();
        setInterval(fill_otp, 30 * 1000)
    }
    if (current_cfg.auto_login) {
        showStatus('info', chrome.i18n.getMessage("login_autologin"));
        el_submit.click();
        el_submit.classList.add('a_grey_button');
    } else {
        el_submit.classList.add('a_green_button');
        showStatus('info', chrome.i18n.getMessage("login_filled"));
    }
}

chrome.storage.sync.get(current_cfg, function (cfg) {
    Object.assign(current_cfg, cfg);

    autofill();
});