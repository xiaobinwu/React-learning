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
	render(){
		return (
			<ul>
				{this.props.children.map(this.deal.bind(this))}
			</ul>
		);
	}
}

ReactDom.render(
	<Ul>
		<Li i="1"/>
		<Li i="2"/>
		<Li i="3"/>
	</Ul>,
	document.getElementById('app'),
	() => { console.log('cloneElement success') }
);