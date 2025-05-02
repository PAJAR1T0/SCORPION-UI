import '../assets/style.css';
import { Header, ModelView, ControlPanel } from './index';

const app = document.getElementById('app');
app!.id = 'app';

const header = new Header(app!);
header.addHeader();

const modelView = new ModelView(app!);
modelView.loadModel();

const controlPanel = new ControlPanel(app!, modelView);
controlPanel.loadStorage();
