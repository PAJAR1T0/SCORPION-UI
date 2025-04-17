import { lockLogo, unlockLogo } from ".";

export class Slider {
    isActive: boolean;
    sliderContainer!: HTMLDivElement;
    textElement!: HTMLParagraphElement;
    inputElement!: HTMLInputElement;
    sliderValue!: HTMLParagraphElement;
    activationButton!: HTMLButtonElement;

    constructor(private hostDiv: HTMLElement, public id: number, public sliderName: string, 
                public minValue: number, public maxValue: number, public value: number) {
        this.isActive = true;
    };

    createContainer() {
        this.sliderContainer = document.createElement('div');
        this.sliderContainer.id = 'sliderContainer';
    };

    createTextElement() {
        this.textElement = document.createElement('p');
        this.textElement.innerText = this.sliderName;
        this.textElement.id = 'textElement'
        this.sliderContainer.appendChild(this.textElement);
    };

    createInput() {
        this.inputElement = document.createElement('input');
        this.inputElement.type = 'range';
        this.inputElement.min = this.minValue.toString();
        this.inputElement.max = this.maxValue.toString();
        this.inputElement.value = this.value.toString();
        this.inputElement.id = 'inputElement';
        this.sliderContainer.appendChild(this.inputElement);
    };

    createSliderValue() {
        this.sliderValue = document.createElement('p');
        this.sliderValue.innerText = this.inputElement.value + '˚';
        this.sliderValue.id = 'sliderValue';
        this.sliderContainer.appendChild(this.sliderValue);
        this.sliderValueEventListener();
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
        })
    };

    sliderValueEventListener() {
        this.inputElement.addEventListener('input', () => this.sliderValue.innerText = this.inputElement.value + '˚');
    };

    addSlider() {
        this.createContainer();
        this.createTextElement();
        this.createInput();
        this.createSliderValue();
        this.createActivationButton();
        this.hostDiv.appendChild(this.sliderContainer);
    };
};