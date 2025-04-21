import '../assets/style.css';
import { Header, ModelView, ControlPanel } from './index';
import { sliderDictionaryInterface } from './controlPanel/index'

const slidersDictionaryArray: sliderDictionaryInterface[] = [
    {id: 1, name : 'Base', minValue : 0, maxValue: 180, defaultValue: 90, step : 1},
    {id: 2, name : 'Rotation module 1', minValue : 0, maxValue: 180, defaultValue: 90, step : 1},
    {id: 3, name : 'Rotation module 2', minValue : 0, maxValue: 180, defaultValue: 90, step : 1},
    {id: 4, name : 'Rotation module 3', minValue : 0, maxValue: 180, defaultValue: 90, step : 1},
    {id: 5, name : 'Arm rotation', minValue : 0, maxValue: 180, defaultValue: 90, step : 1},
    {id: 6, name : 'Arm', minValue : 0, maxValue: 180, defaultValue: 90, step : 1},
];

const app = document.getElementById('app');
app!.id = 'app';

const header = new Header(app!);
header.addHeader();

const modelView = new ModelView(app!);
modelView.loadModel();

const controlPanel = new ControlPanel(app!);
controlPanel.addDiv();
controlPanel.addSliders(slidersDictionaryArray);