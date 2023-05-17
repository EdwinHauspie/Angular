const Popup = function ({
    title = document.title,
    body = '',
    submitCaption = 'OK',
    cancelCaption = 'Cancel',
    showSubmit = true,
    showCancel = true,
    showHeader = true,
    showFooter = true,
    enableSubmit = true,
    iconCssClass = '' }) {

    this.element = document.createElement('dialog');
    this.element.innerHTML = `
        <header>
            <i class="${iconCssClass}" js-icon></i>
            <span js-title>${title}</span>
        </header>
        <div js-body></div>
        <footer>
            <button js-submit>${submitCaption}</button>
            <button js-cancel>${cancelCaption}</button>
        </footer>`;

    this.onShow = () => { };
    this.onHide = () => { };
    this.onSubmit = () => { };
    this.onCancel = () => { };

    this.submit = () => this.onSubmit();
    this.cancel = () => this.onCancel();

    this.show = () => {
        document.body.appendChild(this.element);
        this.element.showModal();
        this.onShow();
        return this;
    };

    this.hide = () => {
        this.element.close();
        if (this.element.parentNode) this.element.parentNode.removeChild(this.element);
        this.onHide();
        return this;
    };

    Object.defineProperty(this, 'title', { set: val => this.element.querySelector('[js-title]').innerHTML = val });
    Object.defineProperty(this, 'submitCaption', { set: val => this.element.querySelector('[js-submit]').innerText = val });
    Object.defineProperty(this, 'cancelCaption', { set: val => this.element.querySelector('[js-cancel]').innerText = val });

    Object.defineProperty(this, 'iconCssClass', {
        set: val => {
            this.element.querySelector('[js-icon]').className = val;
            this.element.querySelector('[js-icon]').style.display = val ? '' : 'none';
        }
    });

    Object.defineProperty(this, 'body', {
        set: val => {
            let bodyEl = this.element.querySelector('[js-body]');
            bodyEl.innerHtml = '';
            if (val instanceof HTMLElement) bodyEl.appendChild(body);
            else bodyEl.insertAdjacentHTML('beforeend', val.toString());
        }
    });

    this.body = body;
    this.iconCssClass = iconCssClass;

    const toggle = (selector, show) => this.element.querySelector(selector).style.display = (show ? '' : 'none');
    const enable = (selector, enabled) => this.element.querySelector(selector).disabled = !enabled;

    Object.defineProperty(this, 'showSubmit', { set: val => toggle('[js-submit]', val) });
    Object.defineProperty(this, 'showCancel', { set: val => toggle('[js-cancel]', val) });
    Object.defineProperty(this, 'showHeader', { set: val => toggle('header', val) });
    Object.defineProperty(this, 'showFooter', { set: val => toggle('footer', val) });

    Object.defineProperty(this, 'enableSubmit', { set: val => enable('[js-submit]', val) });

    this.showSubmit = showSubmit;
    this.showCancel = showCancel;
    this.showHeader = showHeader;
    this.showFooter = showFooter;
    this.enableSubmit = enableSubmit;

    //Bind buttons
    this.element.querySelector('[js-submit]').addEventListener('click', e => {
        this.submit();
        e.stopPropagation();
    });

    this.element.querySelector('[js-cancel]').addEventListener('click', e => {
        this.cancel();
        e.stopPropagation();
    });

    //Bind escape key (override default <dialog> behaviour)
    this.element.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            this.cancel();
        }
    });

    //Bind click on overlay to close
    this.element.addEventListener('click', e => {
        let bcr = this.element.getBoundingClientRect(),
            ecx = e.clientX,
            ecy = e.clientY;

        if (ecx < bcr.left || ecx > bcr.right || ecy < bcr.top || ecy > bcr.bottom)
            this.cancel();
    });
}

//Helper to replace native alert function
function say(message, title = document.title, submitCaption = 'OK') {
    let resolve = null;

    const popup = new Popup({ title, body: message, submitCaption });
    popup.showCancel = false;
    popup.show();

    popup.onSubmit = () => {
        popup.hide();
        resolve(true);
    };

    popup.onCancel = () => {
        popup.hide();
        resolve(false);
    };

    return new Promise((res, rej) => { resolve = res; });
}

//Helper to replace native confirm function
function ask(message, title = document.title, submitCaption = 'OK', cancelCaption = 'Cancel') {
    let resolve = null;

    const popup = new Popup({ title, body: message, submitCaption, cancelCaption });
    popup.show();

    popup.onSubmit = () => {
        popup.hide();
        resolve(true);
    };

    popup.onCancel = () => {
        popup.hide();
        resolve(false);
    };

    return new Promise((res, rej) => { resolve = res; });
}

//Helper to replace native prompt function
function input(label, defaultValue = '', title = document.title, submitCaption = 'OK', cancelCaption = 'Cancel') {
    let resolve = null;
    let id = (+(new Date()));

    let body = `<div>
                    <label for="_${id}">${label}:</label> 
                    <input id="_${id}" type="text" maxlength="100" value="${defaultValue}" />
                </div>`;

    const popup = new Popup({ title, body, submitCaption, cancelCaption });
    popup.show();

    popup.onSubmit = () => {
        let answer = popup.element.querySelector('input').value;
        popup.hide();
        resolve(answer.trim());
    };

    popup.onCancel = () => {
        popup.hide();
        resolve(false);
    };

    return new Promise((res, rej) => { resolve = res; });
}

export { Popup, say, ask, input }