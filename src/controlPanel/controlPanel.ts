import { ModelView, Slider } from "../.";
import { sliderDictionaryInterface } from ".";

export class ControlPanel {
    ControlPanelContainer!: HTMLDivElement;
    title!: HTMLHeadingElement;
    slidersArray!: HTMLDivElement[];
    
    constructor(private hostDiv: HTMLElement, private modelViewClass: ModelView) {
    };

    createContainer() {
        this.ControlPanelContainer = document.createElement('div');
        this.ControlPanelContainer.id = 'controlPanelContainer';
    };

    setUpContainer() {
        this.createContainer();
        this.title = document.createElement('h1');
        this.title.innerText = 'Control Panel';
        this.ControlPanelContainer.appendChild(this.title);
    }

    addDiv() {
        this.setUpContainer();
        this.hostDiv.appendChild(this.ControlPanelContainer);
    }

    addSliders(slidersDictionaryArray: sliderDictionaryInterface[]) {
        this.slidersArray = [];
        slidersDictionaryArray.forEach((sliderDictionary) => {
            const slider = new Slider(this.ControlPanelContainer, sliderDictionary, this.modelViewClass);
            const sliderDivElement = slider.addSlider()
            this.slidersArray.push(sliderDivElement);
        });
    };
};