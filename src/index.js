import 'bootstrap/dist/css/bootstrap.min.css';
import 'tachyons';	
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<div>
		<App />
	</div>
	, document.getElementById('root'));
registerServiceWorker();
