import './index.scss';
import React from 'react';
import ReactDom from 'react-dom';
/**********属性代理***********/
//WrappedComponent.prototype.render获取实例，不提倡
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

/**********反向继承***********/
//高阶组件－demo1（基本使用）
const MyContainer4 = (WrappedComponent) => class A extends WrappedComponent{
	render(){
		return super.render()
	}
}
const AppComponent4 = class extends React.Component {
	render(){
		return (
			<div>
				高阶组件(反向继承)-super.render()
			</div>
		);
	}
}
const HandledComponent4 =  MyContainer4(AppComponent4)

//高阶组件－demo2（渲染劫持－条件渲染)-反向继承的高阶组件不能保证一定渲染整个子元素树
const MyContainer5 = (WrappedComponent) => class B extends WrappedComponent{
	render(){
		if(!this.props.isLogin){
			return (<div>nothing</div>)
		}
		return super.render()
	}
}
const AppComponent5 = class extends React.Component {
	render(){
		return (
			<div>
				就像之前所说的，反向继承的高阶组件不能保证一定渲染整个子元素树，这同时也给渲染劫持增添了一些限制。通过反向继承，你只能劫持 WrappedComponent 渲染的元素，这意味着如果 WrappedComponent 的子元素里有 Function 类型的 React Element，你不能劫持这个元素里面的子元素树的渲染。
			</div>
		);
	}
}
const HandledComponent5 =  MyContainer5(AppComponent5)

//高阶组件－demo3 通过 render 来变成 React Elements tree 的结果
const MyContainer6 = (WrappedComponent) => class C extends WrappedComponent{
	render(){
		//获取原React Elements tree
		const origintree = super.render()
		console.log(origintree)
		let newProp = {};
		if(origintree && origintree.type === 'input'){
			newProp = { value: "我改变了你的值" }
		}
		const props = Object.assign({}, origintree.props, newProp)
		const neworigintree = React.cloneElement(origintree, props, origintree.props.children)
		return neworigintree
	}
}
const AppComponent6 = class extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	value: '我是AppComponent6的value'
	  };
	}
	render(){
		return (
			<input type="text" style={{width: 200}} value={this.state.value}/>
		);
	}
}
const HandledComponent6 =  MyContainer6(AppComponent6)


//高阶组件－demo4 传递额外参数
const MyContainer7 = (params) => {
	return function(WrappedComponent){
		return 	class D extends WrappedComponent{
				render(){
					const { text, age } = params;
					return(
						<div style={{height: 200, backgroundColor: 'green', color: '#fff'}}>
							<div>{text}</div>
							<div>{age}</div>
							{super.render()}
						</div>
					)
				}
			}		
	}

}
const AppComponent7 = class extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	value: '我是AppComponent7的value'
	  };
	}
	render(){
		return (
			<input type="text" style={{width: 200}} value={this.state.value}/>
		);
	}
}
const HandledComponent7 =  MyContainer7({ text: '我是小斌', age: '24'})(AppComponent7)


//高阶组件－demo5 控制state
const MyContainer8 = (WrappedComponent) => class  extends WrappedComponent{
	//由于使用高阶组件会使WrappedComponent name 丢失
	//static displayName = WrappedComponent.displayName || WrappedComponent.name || 'component';
	render(){
		console.log(this)
		return(
			<div>
				<div>
					<span>这是WrappedComponent组件的state</span>
					<span>{JSON.stringify(this.state)}</span>
				</div>
				<div>
					<span>这是WrappedComponent组件的props</span>
					<span>{JSON.stringify(this.props)}</span>
				</div>	
				{super.render()}
			</div>
		)
	}
}
const AppComponent8 = class extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	value: '我是AppComponent8的value'
	  };
	}
	render(){
		return (
			<input type="text" style={{width: 200}} value={this.state.value}/>
		);
	}
}
const HandledComponent8 =  MyContainer8(AppComponent8)

ReactDom.render(
	<HandledComponent8/>,
	document.getElementById('app')
);
