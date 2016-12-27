import './index.scss';
import React from 'react';
import ReactDom from 'react-dom';
import Immutable from 'immutable';
import _ from 'lodash';

class AppComponent extends React.Component {
	constructor(props){
		super(props);
		// this.state = {
		// 	data: { times: 0 }
		// }	
		this.state = {
			data: Immutable.Map({ times: 0 })
		}
		this.handleAdd = this.handleAdd.bind(this);
	}
	handleAdd(){
		// let data = this.state.data;
		//// let data = _.cloneDeep(this.state.data);
		// this.setState({ data: data });
		// console.log(this.state.data.times);
		this.setState(({data}) => ({
			data: data.update("times", x => x + 1)
		}))
		console.log(this.state.data.get('times'))
	}
	render(){
		return (
			<a href="javascript:;;" onClick={this.handleAdd}> 点击console出state-time </a>
		);
	}
}

ReactDom.render(
	<AppComponent />,
	document.getElementById('app'),
	() => { console.log('immutable success') }
);