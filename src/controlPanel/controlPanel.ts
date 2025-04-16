export class ControlPanel {
    ControlPanelContainer: HTMLDivElement;
    title!: HTMLHeadingElement;
    
    constructor(private hostDiv: HTMLElement) {
        this.ControlPanelContainer = document.createElement('div');
        this.ControlPanelContainer.id = 'controlPanelContainer'
    };

    setUpContainer() {
        this.title = document.createElement('h1');
        this.title.innerText = 'Control Panel';
        this.ControlPanelContainer.appendChild(this.title);
    }

    addDiv() {
        this.setUpContainer();
        this.hostDiv.appendChild(this.ControlPanelContainer);
    }


};