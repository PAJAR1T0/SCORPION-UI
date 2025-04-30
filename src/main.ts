import '../assets/style.css';
import { Header, ModelView, ControlPanel } from './index';
import { sliderDictionaryInterface } from './controlPanel/index'

const slidersDictionaryArray: sliderDictionaryInterface[] = [
    {id: 1, name : 'Base', minValue : 0, maxValue: 180, value: 90, step : 1, 
        pieceInfo : {axesName: 'Pivot_mod_1', rotationAxe: 'y', extraOperation : [{type: 'rest', number: 90}, {type: 'mult', number : -1}], object3D: undefined, animations: undefined}},
    {id: 2, name : 'Rotation module 1', minValue : 40, maxValue: 180, value: 90, step : 1, 
        pieceInfo : {axesName: 'Pivot_mod_2', rotationAxe: 'x', extraOperation :  [{type: 'rest', number: 56}], object3D: undefined,  animations: undefined}},
    {id: 3, name : 'Rotation module 2', minValue : 0, maxValue: 180, value: 0, step : 1, 
        pieceInfo : {axesName: 'Pivot_mod_3', rotationAxe: 'x', extraOperation : undefined, object3D: undefined, animations: undefined}},
    {id: 4, name : 'Rotation module 3', minValue : 0, maxValue: 180, value: 145, step : 1, 
        pieceInfo : {axesName: 'Pivot_mod_4', rotationAxe: 'x', extraOperation: undefined, object3D: undefined,  animations: undefined}},
    {id: 5, name : 'Arm rotation', minValue : 0, maxValue: 180, value: 90, step : 1, 
        pieceInfo : {axesName: 'Pivot_arm', rotationAxe: 'z', extraOperation : undefined, object3D: undefined,  animations: undefined}},
    {id: 6, name : 'Arm', minValue : 0, maxValue: 56, value: 0, step : 1, 
        pieceInfo : {axesName: 'Arm', rotationAxe: 'arm', extraOperation : undefined, object3D: undefined,  animations: undefined}
    },
];

const app = document.getElementById('app');
app!.id = 'app';

const header = new Header(app!);
header.addHeader();

const modelView = new ModelView(app!);
modelView.loadModel(slidersDictionaryArray);

const controlPanel = new ControlPanel(app!, modelView);
controlPanel.addDiv();
controlPanel.addSliders(slidersDictionaryArray);