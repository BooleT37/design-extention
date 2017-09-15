// const div = document.createElement('div');
// div.classList.add("sample-div");
// document.body.appendChild(div);

class PanelElements {    
    constructor(toggleButton, leftInput, topInput, opacityInput) {
        this.toggleButton = toggleButton;
        this.leftInput = leftInput;
        this.topInput = topInput;
        this.opacityInput = opacityInput;
    }
}

class DesignOverlayModel {

    constructor() {
        this.isShown = false;
        this.leftOffset = 0;
        this.topOffset = 0;
        this.opacity = 0.5;
    }
}

class DesignOverlay {
    constructor() {
        this._model = new DesignOverlayModel();

        this.init();
    }

    init() {
        this.image = this.renderBaseImage();
        this.applyChangesToImage();

        this.panel = this.renderBasePanel();
        this.applyChangesToPanel();
        this.bindCallBacksToPanel();
    }

    _onImageShownChange(value) {
        if (value === true) {
            this.image.classList.remove("designOverlay_image_hidden");
        } else {
            this.image.classList.add("designOverlay_image_hidden");
        }
    }

    _onPanelShownChange(value) {
        if (value === true) {
            this.panel.classList.remove("designOverlay_panel_hidden");
        } else {
            this.panel.classList.add("designOverlay_panel_hidden");
        }
    }

    _onLeftOffsetChange(value) {
        this.image.style.left = value;
    }

    _onTopOffsetChange(value) {
        this.image.style.top = value;
    }

    _onOpacityChange(value) {
        this.image.style.opacity = value;
    }

    // updateModel(partial) {
    //     if (partial.isImageShown !== this._model.isImageShown)
    //         this._onImageShownChange(partial.isImageShown);
    //     if (partial.isPanelShown !== this._model.isPanelShown)
    //         this._onPanelShownChange(partial.isPanelShown);
    //     if (partial.leftOffset !== this._model.leftOffset)
    //         this._onLeftOffsetChange(partial.leftOffset);
    //     if (partial.topOffset !== this._model.topOffset)
    //         this._onTopOffsetChange(partial.topOffset);
    //     if (partial.opacity !== this._model.opacity)
    //         this._onOpacityChange(partial.opacity);
    // }

    renderBaseImage() {
        const img = document.createElement("img");
        img.setAttribute("src", "./Design.png");
        img.setAttribute("alt", "Design image");
        img.classList.add("designOverlay_image");
        document.body.appendChild(img);
        return img;
    }

    applyChangesToImage() {
        const img = this.image;
        if (!this._model.isShown) {
            img.classList.add("designOverlay_image_hidden");
        } else {
            img.classList.remove("designOverlay_image_hidden");
        }
        img.style.left = this._model.leftOffset + "px";
        img.style.top = this._model.topOffset + "px";
        img.style.opacity = this._model.opacity;
    }

    renderBasePanel() {
        const panel = document.createElement("div");
        panel.classList.add("designOverlay_panel");

        const toggleButton = document.createElement("button");
        toggleButton.type = "button"
        toggleButton.classList.add("designOverlay_togleButton");
        // toggleButton.innerText = this._model.isPanelShown ? "Выкл." : "Вкл.";

        const controls = document.createElement("div");
        controls.classList.add("designOverlay_controls");

        const leftOffsetDiv = document.createElement("div");
        leftOffsetDiv.classList.add("designOverlay_control");

        const leftOffsetCaption = document.createElement("span");
        leftOffsetCaption.innerText = "left: ";
        const leftOffsetInput = document.createElement("input");
        leftOffsetInput.type = "number";
        leftOffsetInput.classList.add("designOverlay_positionInput");
        const leftOffsetSuffix = document.createElement("span");
        leftOffsetSuffix.innerText = "px";

        const topOffsetDiv = document.createElement("div");
        topOffsetDiv.classList.add("designOverlay_control");

        const topOffsetCaption = document.createElement("span");
        topOffsetCaption.innerText = "top: ";
        const topOffsetInput = document.createElement("input");
        topOffsetInput.type = "number";
        topOffsetInput.classList.add("designOverlay_positionInput");
        const topOffsetSuffix = document.createElement("span");
        topOffsetSuffix.innerText = "px";

        const opacityDiv = document.createElement("div");
        opacityDiv.classList.add("designOverlay_control");

        const opacityCaption = document.createElement("span");
        opacityCaption.innerText = "opacity: ";
        const opacityInput = document.createElement("input");
        opacityInput.type = "number";
        opacityInput.step = "0.1";
        opacityInput.classList.add("designOverlay_opacityInput");

        leftOffsetDiv.appendChild(leftOffsetCaption);
        leftOffsetDiv.appendChild(leftOffsetInput);
        leftOffsetDiv.appendChild(leftOffsetSuffix);

        topOffsetDiv.appendChild(topOffsetCaption);
        topOffsetDiv.appendChild(topOffsetInput);
        topOffsetDiv.appendChild(topOffsetSuffix);

        opacityDiv.appendChild(opacityCaption);
        opacityDiv.appendChild(opacityInput);

        controls.appendChild(leftOffsetDiv);
        controls.appendChild(topOffsetDiv);
        controls.appendChild(opacityDiv);

        panel.appendChild(toggleButton);
        panel.appendChild(controls);

        document.body.appendChild(panel);

        return { root: panel, toggleButton, leftOffsetInput, topOffsetInput, opacityInput }
    }

    applyChangesToPanel() {
        const panel = this.panel;

        if (!this._model.isShown) {
            panel.root.classList.add("designOverlay_panel_compact");
        } else {
            panel.root.classList.remove("designOverlay_panel_compact");
        }

        panel.toggleButton.innerText = this._model.isShown ? "Выкл." : "Вкл.";

        panel.leftOffsetInput.value = this._model.leftOffset;
        panel.topOffsetInput.value = this._model.topOffset;
        panel.opacityInput.value = this._model.opacity;
    }

    bindCallBacksToPanel() {
        const panel = this.panel;

        panel.toggleButton.addEventListener("click", this._onToggleClick.bind(this));
        panel.leftOffsetInput.addEventListener("input", this._onLeftOffsetChange.bind(this));
        panel.topOffsetInput.addEventListener("input", this._onTopOffsetChange.bind(this));
        panel.opacityInput.addEventListener("input", this._onOpacityChange.bind(this));
    }

    _onToggleClick() {
        this._model.isShown = !this._model.isShown;

        this.applyChangesToImage();
        this.applyChangesToPanel();
    }

    _onLeftOffsetChange(event) {
        this._model.leftOffset = parseInt(event.target.value, 10);

        this.applyChangesToImage();
        this.applyChangesToPanel();
    }

    _onTopOffsetChange(event) {
        this._model.topOffset = parseInt(event.target.value, 10);
        
        this.applyChangesToImage();
        this.applyChangesToPanel();
    }

    _onOpacityChange(event) {
        this._model.opacity = parseFloat(event.target.value, 10);

        this.applyChangesToImage();
        this.applyChangesToPanel();
    }
}

const overlay = new DesignOverlay();

/* <div>
    <div className={classnames("designOverlay_image", { "designOverlay_image_hidden": !this.state.isShown || !this.state.isPanelShown })} style={{ left: this.state.left + "px", top: this.state.top + "px", opacity: this.state.opacity }}></div>
    <div className={classnames("designOverlay_panel", { "designOverlay_panel_hidden": !this.state.isPanelShown, "designOverlay_panel_compact": !this.state.isShown })}>
        <button className="designOverlay_togleButton" type="button" onClick={this.onToggleButtonClick}>
            {this.state.isShown ? "Выкл." : "Вкл."}
        </button>
        <div className="designOverlay_controls">
            <div className="designOverlay_control">left: <input type="number" className="designOverlay_positionInput" value={this.state.left} onChange={this.onInputLeftChange} />px</div>
            <div className="designOverlay_control">top: <input type="number" className="designOverlay_positionInput" value={this.state.top} onChange={this.onInputTopChange} />px</div>
            <div className="designOverlay_control">opacity: <input type="number" step="0.1" className="designOverlay_opacityInput" value={this.state.opacity} onChange={this.onOpacityInputChange} /></div>
        </div>
    </div>
</div> */