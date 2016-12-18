import './index.scss';
import React from 'react';
import ReactDom from 'react-dom';

//高阶组件－demo1
const MyContainer1 = (WrappedComponent) => class extends React.Component{
		render(){
			return(
				<div style={{textAlign: 'center', display: 'block', backgroundColor: 'green' }}>
					<p>这是被包裹的div2</p>
					<WrappedComponent {...this.props} />
				</div>
			) 
		}
	}
const AppComponent1 = class extends React.Component {
	render(){
		return (
			<div className="div1" style={{ width: '200px', height: '200px', display: 'inline-block' , backgroundColor: 'red' }}>
				这是被包裹的div1
			</div>
		);
	}
}
const HandledComponent1 =  MyContainer1(AppComponent1)



ReactDom.render(
	<HandledComponent1 />,
	document.getElementById('app')
);
