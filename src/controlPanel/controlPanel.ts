import { ModelView, Slider } from "../.";
import { slidersDictionaryArray, StorageClass } from ".";

export class ControlPanel {
    ControlPanelContainer!: HTMLDivElement;
    title!: HTMLHeadingElement;
    slidersArray!: HTMLDivElement[];
    storage!: StorageClass;

    

    
    constructor(private hostDiv: HTMLElement, private modelViewClass: ModelView) {
        this.setUpContainer();
        this.hostDiv.appendChild(this.ControlPanelContainer);
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
    };

    loadStorage() {
        this.storage = new StorageClass(this.addSliders.bind(this), this.ControlPanelContainer);
        this.storage.verifyStorage()
    }

    addSliders() {
        this.slidersArray = [];
        slidersDictionaryArray.forEach((sliderDictionary) => {
            const slider = new Slider(sliderDictionary, this.modelViewClass, this.storage.changeStorage.bind(this.storage));
            const sliderDivElement = slider.addSlider()
            this.ControlPanelContainer.appendChild(sliderDivElement);
            this.slidersArray.push(sliderDivElement);
        });
    };
};