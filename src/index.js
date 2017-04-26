import React from 'react';
import { render } from 'react-dom';

import './css/style.css';

const Root = () => {
  return (
		<p>Hello</p>
  )
}

render(<Root/>, document.querySelector('#root'));


