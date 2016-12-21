import './index.scss';
import React from 'react';
import ReactDom from 'react-dom';

//高阶组件－demo1（使用其他元素包裹）
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


//高阶组件-demo2（控制props）
const MyContainer2 = (WrappedComponent) => class extends React.Component{
		render(){
			const newProps = {
				hocText: '我是来自高阶组件的props Text',
				color: 'red'
			}
			return(
				<WrappedComponent {...this.props}  {...newProps}/>
			) 
		}
	}
const AppComponent2 = class extends React.Component {
	render(){
		return (
			<div>
				<p>我是原来组件的props</p>
				<p>{this.props.text}</p>
				<p>我是高阶组件的props</p>
				<p>{this.props.hocText}</p>				
				<p>我是经高阶组件改变的props</p>
				<p>{this.props.color}</p>	
			</div>
		);
	}
}
const HandledComponent2 =  MyContainer2(AppComponent2)



//高阶组件-demo3（refs使用）
const MyContainer3 = (WrappedComponent) => class extends React.Component{
		proc(wrappedComponentInstance){
			wrappedComponentInstance.consoleData()
		}
		render(){
			const props = Object.assign({}, this.props, { ref: this.proc.bind(this) })
			return(
				<WrappedComponent {...props} />
				// 或 <WrappedComponent {...this.props} ref={this.proc.bind(this)} />
			) 
		}
	}
const AppComponent3 = class extends React.Component {
	consoleData(){
		console.log('我可以供高阶组件ref调用，也可以在这里去改变本身组件的prop和state');
	}
	render(){
		return (
			<div>
				高阶组件-demo3（refs使用）
			</div>
		);
	}
}
const HandledComponent3 =  MyContainer3(AppComponent3)





ReactDom.render(
	<HandledComponent3/>,
	document.getElementById('app')
);
