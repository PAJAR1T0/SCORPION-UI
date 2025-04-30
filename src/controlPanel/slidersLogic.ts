import { lockLogo, unlockLogo } from ".";
import { THREE } from "../modelView/index";
import { ModelView } from "../.";

export interface sliderDictionaryInterface {
    id: number, 
    name: string, 
    minValue: number, 
    maxValue: number, 
    value: number,
    step: number,
    pieceInfo : {
        axesName: string,
        rotationAxe : string,
        extraOperation : {type: string, number : number}[] | undefined,
        object3D: THREE.Object3D | undefined,
        animations: undefined | THREE.AnimationAction[],
    }
    
};

export class Slider {
    isActive: boolean;
    sliderContainer!: HTMLDivElement;
    textElement!: HTMLParagraphElement;
    inputElement!: HTMLInputElement;
    activationButton!: HTMLButtonElement;
    sliderInputValue!: SliderInputValue;

    constructor(private hostDiv: HTMLElement, private dictionaryArray: sliderDictionaryInterface, private modelViewClass: ModelView) {
        this.isActive = true;
    };

    createContainer() {
        this.sliderContainer = document.createElement('div');
        this.sliderContainer.id = 'sliderContainer';
    };

    createTextElement() {
        this.textElement = document.createElement('p');
        this.textElement.innerText = this.dictionaryArray.name;
        this.textElement.id = 'textElement'
        this.sliderContainer.appendChild(this.textElement);
    };

    createInput() {
        this.inputElement = document.createElement('input');
        this.inputElement.type = 'range';
        this.inputElement.min = this.dictionaryArray.minValue.toString();
        this.inputElement.max = this.dictionaryArray.maxValue.toString();
        this.inputElement.value = this.dictionaryArray.value.toString();
        this.inputElement.step = this.dictionaryArray.step.toString();
        this.inputElement.id = 'inputElement';
        this.sliderContainer.appendChild(this.inputElement);
    };

    createSliderValueInput() {
        this.sliderInputValue = new SliderInputValue(this.sliderContainer, this.inputElement, this.dictionaryArray, this.modelViewClass);
    };

    createActivationButton() {
        this.activationButton = document.createElement('button');
        this.activationButton.innerHTML = unlockLogo;
        this.activationButton.classList.add('activationButton');
        this.sliderContainer.appendChild(this.activationButton);
        this.activationButtonEventListener();
    };

    activationButtonEventListener() {
        this.activationButton.addEventListener('click', () => {
            this.isActive = ( this.isActive ) ? false : true;
            this.activationButton.id = ( this.isActive ) ? '' : 'buttonInactive';
            this.activationButton.innerHTML = ( this.isActive ) ? unlockLogo : lockLogo;
            this.inputElement.disabled = ( this.isActive ) ? false : true;
            this.sliderInputValue.changeInputState(this.isActive);
        })
    };

    addSlider() {
        this.createContainer();
        this.createTextElement();
        this.createInput();
        this.createSliderValueInput();
        this.createActivationButton();
        this.hostDiv.appendChild(this.sliderContainer);
        return this.sliderContainer;
    };
};

class SliderInputValue {
    inputValue: HTMLInputElement;
    lastInputValue: number;
    value!: number;
    
    constructor(private sliderContainer: HTMLDivElement,private inputElement: HTMLInputElement, 
                private dictionaryArray: sliderDictionaryInterface, private modelViewclass: ModelView) {
        this.inputValue = document.createElement('input');
        this.inputValue.type = 'text';
        this.inputValue.inputMode= 'numeric';
        this.inputValue.value = this.inputElement.value + '˚';
        this.lastInputValue = Number(this.inputElement.value);
        this.inputValue.id = 'sliderValue';
        this.sliderContainer.appendChild(this.inputValue);
        this.sliderValueEventListener();
    }


    sliderValueEventListener() {
        this.inputElement.addEventListener('input', () => {
            this.value = Number(this.inputElement.value);
            this.lastInputValue = this.value;
            this.inputValue.value = this.inputElement.value + '˚';
            this.dictionaryArray.value = this.value;
            this.modelViewclass.rotatePiece(this.dictionaryArray);
        });
        this.inputValue.addEventListener('change', () => {
            let valueFixed: number | string = this.inputValue.value.replace(/[^0-9.]/g, '');
            if ( valueFixed ) {
                this.value = Number(Number(valueFixed).toFixed(0));
                if ( this.value >= this.dictionaryArray.minValue && this.value <= this.dictionaryArray.maxValue ) {
                    this.lastInputValue = this.value;
                    this.inputElement.value = valueFixed.toString();
                    this.inputValue.value = valueFixed + '˚';
                    this.dictionaryArray.value = this.value;
                    this.modelViewclass.rotatePiece(this.dictionaryArray);
                } else {
                    this.wrongValue();
                }
            } else {
                this.wrongValue();
            };
        });
    };

    changeInputState(state: boolean) {
        this.inputValue.disabled = !state;
    };

    wrongValue() {
        this.inputValue.value = this.lastInputValue + '˚';
        this.inputValue.classList.add('shake');
        setTimeout(() => this.inputValue.classList.remove('shake'), 500);
    };

};
