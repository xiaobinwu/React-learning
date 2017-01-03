import './index.scss';
import React from 'react';
import ReactDom from 'react-dom';
import CommentForm from './commentForm/index';
import CommentList from './commentList/index';
//react-smooth用法 ［https://www.npmjs.com/package/react-smooth］
import Animate from 'react-smooth';

let initData = [
  {id: 1478139074510, author: "Pete Hunt", text: "* This is one comment"},
  {id: 1478139085919, author: "Jordan Walke", text: "* ##### This is another comment"},
  {id: 1478139085929, author: "Jordan Walke", text: "ssssss"},
  {id: 1478139045929, author: "Jordan Wassslke", text: "sssssdsadsas"}
];

const steps = [{
  style: {
    opacity: 0,
  },
  duration: 400,
}, {
  style: {
    opacity: 1,
    transform: 'translate(0, 0)',
  },
  duration: 1000,
}, {
  style: {
    transform: 'translate(100px, 0)',
    backgroundColor: 'red'
  },
  duration: 1200,
}];

class AppComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: []
		};
		this.getData = this.getData.bind(this);
		this.animationEnd = this.animationEnd.bind(this);
	}

	getData(){
		this.setState({
			data: initData
		});
	}

	animationEnd(){
		console.log('动画结束')
	}

	handleCommentSubmit(comment){
		comment.id = Date.now();
		initData = initData.concat([comment]);
		this.getData();
	}

	componentDidMount(){
		//组件渲染
		this.getData();
		//ReactDom.findDOMNode获取渲染后的dom节点
		const Dom = ReactDom.findDOMNode(this);
		console.log('this classname is :' + Dom.className);
	}


	render(){
		let {data} = this.state;
		return (
			<div className="commentBox">
				<Animate to={0} from={1} attributeName="opacity" ease="ease">
					<div style={{ width: 100, height: 100, backgroundColor: 'red' }}/>
				</Animate>	

				<Animate steps={steps} onAnimationEnd={this.animationEnd} ease="spring">
					<div style={{ width: 100, height: 100, backgroundColor: 'green' }}/>
				</Animate>	

				<h1>Comments</h1>
				<CommentList data={data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} text=" is learning ReactJs!"/>				
			</div>
		);
	}
}

ReactDom.render(
	<AppComponent />,
	document.getElementById('app'),
	() => { console.log('comment success') }
);