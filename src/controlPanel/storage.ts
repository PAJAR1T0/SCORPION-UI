import { slidersDictionaryArray, noSymbol, yesSymbol } from ".";
import { ControlPanel } from "../.";

export class StorageClass {
    storageName : string = 'valuesArray';
    storage : string | null;
    localStorageValuesArray!: {id: number, value: number}[];
    questionContainer! : HTMLDivElement;
    question!: HTMLHeadingElement;
    optionsContainer!: HTMLDivElement;
    yesButton!: HTMLButtonElement;
    noButton!: HTMLButtonElement;

    
    constructor(private addSliders : ControlPanel['addSliders'], private controlPanelContainer : HTMLDivElement){
        this.storage = window.localStorage.getItem(this.storageName);
    }

    verifyStorage() {
        if (this.storage) {
            new Promise((resolve, reject) => {
                this.questionContainer = document.createElement('div');
                this.questionContainer.id = 'questionContainer';

                this.question = document.createElement('h2');
                this.question.innerText = 'A previous backup of the sliders has been found. \nWould you like to load it?';

                this.optionsContainer = document.createElement('div');
                this.yesButton = document.createElement('button');
                this.yesButton.innerHTML = yesSymbol;
                this.noButton = document.createElement('button');
                this.noButton.innerHTML = noSymbol;
                this.optionsContainer.appendChild(this.noButton);
                this.optionsContainer.appendChild(this.yesButton);

                this.questionContainer.appendChild(this.question);
                this.questionContainer.appendChild(this.optionsContainer);

                this.controlPanelContainer.appendChild(this.questionContainer);

                this.yesButton.addEventListener('click', () => {
                    this.controlPanelContainer.removeChild(this.questionContainer);
                    resolve(true);
                });

                this.noButton.addEventListener('click', () => {
                    this.controlPanelContainer.removeChild(this.questionContainer);
                    reject();
                });
            }).then(() => this.loadStorage()).catch(() => this.createStorage());
        } else {
            this.createStorage();
        };
        
    };

    loadStorage() {
        console.log('a')
        this.localStorageValuesArray = JSON.parse(this.storage!);
        this.localStorageValuesArray.forEach((localStorageValue) => {
            const sliderDictionary = slidersDictionaryArray.find((item) => item.id === localStorageValue.id);
            sliderDictionary!.value = localStorageValue.value;
        });
        this.addSliders();
    };

    createStorage() {
        this.localStorageValuesArray = [];
        slidersDictionaryArray.forEach((sliderDictionary) => {
            this.localStorageValuesArray.push({id:sliderDictionary.id, value: sliderDictionary.value});
        });
        this.addSliders();
    }

    changeStorage(id : number, value : number) {
        const sliderDictionary = this.localStorageValuesArray.find((element) => element.id === id);
        sliderDictionary!.value = value;
        window.localStorage.setItem('valuesArray', JSON.stringify(this.localStorageValuesArray));
    };
}