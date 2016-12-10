import React from 'react';

//基类
class BaseComponent extends React.Component {

	//绑定上下文
	_bind(...methods){
		methods.forEach((method) => {
			this[method] = this[method].bind(this);
		});
	}		

}

export default BaseComponent;