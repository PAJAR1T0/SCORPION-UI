import { LogoSVG } from './index';

export class Header {
    headerDiv: HTMLDivElement;
    logoIMG: HTMLImageElement;

    constructor(private hostDiv: HTMLElement){
        this.headerDiv = document.createElement('div');
        this.logoIMG = document.createElement('img');

        this.headerDiv.id = 'headerDiv';
    };

    addHeader() {
        this.IMGConfig();
        this.headerDiv.appendChild(this.logoIMG);
        this.hostDiv.appendChild(this.headerDiv);
    };

    IMGConfig() {
        this.logoIMG.src = LogoSVG;
        this.logoIMG.id = 'logo';
    };


};