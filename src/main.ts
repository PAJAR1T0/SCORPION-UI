import '../assets/style.css';
import { Header, ModelView, ControlPanel, Slider } from './index';

const app = document.getElementById('app');
app!.id = 'app';

const header = new Header(app!);
header.addHeader();

const modelView = new ModelView(app!);
modelView.addDiv();

const controlPanel = new ControlPanel(app!);
controlPanel.addDiv();

const slider1 = new Slider(controlPanel.ControlPanelContainer, 1, 'Prueba 1', 0, 180, 90);
slider1.addSlider();

const slider2 = new Slider(controlPanel.ControlPanelContainer, 2, 'Prueba 2', 0, 180, 90);
slider2.addSlider();