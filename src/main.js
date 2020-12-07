import './styles/main.css';

// Please use https://open-platform.theguardian.com/documentation/

import ListApp from './components';
import { API_KEY } from './api';

const newApp = new ListApp(API_KEY);

newApp.handleDataAPI();
