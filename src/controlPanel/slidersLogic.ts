import { lockLogo, unlockLogo } from ".";

export interface sliderDictionaryInterface {
    id: number, 
    name: string, 
    minValue: number, 
    maxValue: number, 
    defaultValue: number,
    step: number
};

export class Slider {
    isActive: boolean;
    sliderContainer!: HTMLDivElement;
    textElement!: HTMLParagraphElement;
    inputElement!: HTMLInputElement;
    activationButton!: HTMLButtonElement;
    sliderInputValue!: SliderInputValue;

    constructor(private hostDiv: HTMLElement, private dictionaryArray: sliderDictionaryInterface) {
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
        this.inputElement.value = this.dictionaryArray.defaultValue.toString();
        this.inputElement.step = this.dictionaryArray.step.toString();
        this.inputElement.id = 'inputElement';
        this.sliderContainer.appendChild(this.inputElement);
    };

    createSliderValueInput() {
        this.sliderInputValue = new SliderInputValue(this.sliderContainer, this.inputElement, 
            this.dictionaryArray.minValue, this.dictionaryArray.maxValue);
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
    
    constructor(private sliderContainer: HTMLDivElement,private inputElement: HTMLInputElement, 
                private minValue: number, private maxValue: number) {
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
            this.lastInputValue = Number(this.inputElement.value);
            this.inputValue.value = this.inputElement.value + '˚';
        });
        this.inputValue.addEventListener('change', () => {
            let valueFixed: number | string = this.inputValue.value.replace(/[^0-9.]/g, '');
            if ( valueFixed ) {
                valueFixed = Number(Number(valueFixed).toFixed(0));
                if ( valueFixed >= this.minValue && valueFixed <= this.maxValue ) {
                    this.lastInputValue = valueFixed;
                    this.inputElement.value = valueFixed.toString();
                    this.inputValue.value = valueFixed + '˚';
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
