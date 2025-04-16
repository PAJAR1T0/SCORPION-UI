export class ModelView {
    canvasContainer: HTMLDivElement

    constructor(private hostDiv: HTMLElement) {
        this.canvasContainer = document.createElement('div');
        this.canvasContainer.id = 'canvasContainer';
    };

    addDiv() {
        this.hostDiv.appendChild(this.canvasContainer);
    }
};