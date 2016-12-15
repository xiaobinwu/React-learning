import './index.scss';
import React from 'react';
import ReactDom from 'react-dom';

let Li = (props) =>{
	return(
		<li>{props.i}</li>
	)  
}

class Ul extends React.Component {
	deal(child, index){
		return React.cloneElement(child, {i:index, key:index})
	}
	componentWillUnmount(){
		console.log('即将卸载组件，清除state、监听事件');
	}
	render(){
		return (
			<ul>
				{this.props.children.map(this.deal.bind(this))}
			</ul>
		);
	}
}

//返回引用，供外部引用
const instance = ReactDom.render(
	<Ul>
		<Li i="1"/>
		<Li i="2"/>
		<Li i="3"/>
	</Ul>,
	document.getElementById('app'),
	() => { console.log('cloneElement success') }
);

setTimeout(function(){
	console.log(instance.props.children)
}, 2000);

//unmountComponentAtNode
setTimeout(function(){
    const isUnmount = ReactDom.unmountComponentAtNode(document.getElementById('app'));
    console.log(isUnmount);  //打印出true
}, 4000)

//React.DOM.tag
// const div = React.DOM.div({name : 'div1'}, 'HELLO ', React.DOM.span(null, <em>WORLD</em>));
// ReactDom.render(
//     div, document.body
// )