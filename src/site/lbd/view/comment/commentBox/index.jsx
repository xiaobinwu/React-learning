import './index.scss';
import React from 'react';
import ReactDom from 'react-dom';
import CommentForm from './commentForm/index';
import CommentList from './commentList/index';

let initData = [
  {id: 1478139074510, author: "Pete Hunt", text: "* This is one comment"},
  {id: 1478139085919, author: "Jordan Walke", text: "* ##### This is another comment"}
];

class AppComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: []
		};
		this.getData = this.getData.bind(this);
	}

	getData(){
		this.setState({
			data: initData
		});
	}

	handleCommentSubmit(comment){
		comment.id = Date.now();
		initData = initData.concat([comment]);
		this.getData();
	}

	componentDidMount(){
		//组件渲染
		this.getData();
	}


	render(){
		let {data} = this.state;
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} text=" is learning ReactJs!"/>				
			</div>
		);
	}
}

ReactDom.render(
	<AppComponent />,
	document.getElementById('app')
);