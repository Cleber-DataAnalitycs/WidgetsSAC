(function () {
    let template = document.createElement("template");
    template.innerHTML = `
        <form id="form">
            <fieldset>
                <legend>Gauge Builder Settings</legend>
                <table>
                    <tr>
                        <td><label for="bps_value">Initial Value (0–100)</label></td>
                        <td><input id="bps_value" type="number" min="0" max="100" step="1"></td>
                    </tr>
                    <tr>
                        <td><label for="bps_info">Initial Info Label</label></td>
                        <td><input id="bps_info" type="text" maxlength="40"></td>
                    </tr>
                    <tr>
                        <td><label for="bps_color">Initial Color</label></td>
                        <td><input id="bps_color" type="color"></td>
                    </tr>
                </table>
                <input type="submit" style="display:none;">
            </fieldset>
        </form>
    `;

    class BoxBps extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
        }

        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        value: this.value,
                        info: this.info,
                        color: this.color
                    }
                }
            }));
        }

        set value(newValue) {
            this._shadowRoot.getElementById("bps_value").value = newValue;
        }

        get value() {
            const val = parseInt(this._shadowRoot.getElementById("bps_value").value);
            return isNaN(val) ? 0 : Math.min(Math.max(val, 0), 100);
        }

        set info(newInfo) {
            this._shadowRoot.getElementById("bps_info").value = newInfo;
        }

        get info() {
            return this._shadowRoot.getElementById("bps_info").value;
        }

        set color(newColor) {
            this._shadowRoot.getElementById("bps_color").value = newColor;
        }

        get color() {
            return this._shadowRoot.getElementById("bps_color").value;
        }
    }

    customElements.define("com-demo-gauge-bps", BoxBps);
})();
