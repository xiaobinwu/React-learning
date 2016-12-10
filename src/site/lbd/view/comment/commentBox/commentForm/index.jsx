import React from 'react';

import BaseComponent from '../../baseComponent';

class CommentForm extends BaseComponent {
	constructor(props){
		super(props);
		this.state = {
			author: '',
			text: '',
			mergeText: 'xiaobin'
		};
		// ES6 Classes No Autobinding (需手动绑定，三种方法,官方建议用下面的方法)
		this._bind('handleAuthorChange', 'handleTextChange', 'MergeStateWithProps');
	}

	handleAuthorChange(e){
		this.setState({ author: e.target.value });

	}

	handleTextChange(e){
		this.setState({ text: e.target.value });
	}

	MergeStateWithProps(e){
		this.setState((prevState, props)=>{
			return {
				mergeText: prevState.mergeText + props.text
			}
		});
	}

	handleSubmit(e){
		e.preventDefault();
		let author =  this.state.author.trim(),
			text = this.state.text.trim();
			if(!author || !text){
				return;
			}
			this.props.onCommentSubmit({author: author, text: text});
			// todo 添加数据
			this.setState({
				author: '',
				text: ''
			});
	}


	render(){
		let { author, text, mergeText } = this.state;
		return (
			//必须带根元素
			<div>
				<div className="commentform">
					这是个表单
				</div>
				<form className="commentform" onSubmit={(e) => this.handleSubmit(e)}>

			        <input type="text" placeholder="Your name" value={author} onChange={this.handleAuthorChange} /> <br/>
			        <input type="text" placeholder="Say something..." value={text} onChange={this.handleTextChange} /> <br/>
			        <input type="submit" value="Post" />	
			        <br/>		
			        <br/>
			        <br/>
			        <br/>
			        <input type="text" placeholder="Your name" value="受控组件带有value，value值不能修改" />
			        <br/>
			        <br/>
			        <br/>
			        <div>
			        	<p>{mergeText}</p>
						<button className="updateStateByFunc" onClick={this.MergeStateWithProps}>通过Function改变state</button>
					</div>
					<br/>
					<br/>
					<br/>
					<input type="text" defaultValue="这个是默认内容,defaultValue" />

					<br/>
					<br/>
					<br/>
					<label for="literal1">literal1:</label>
					<input id="literal1" type="text" value="hello word" />
					<p>等价于</p>
					<label for="literal2">literal2:</label>
					<input id="literal2" type="text" value={'hello word'} />
				</form>
			</div>
		);
	}

}

CommentForm.propTypes = {
    onCommentSubmit: React.PropTypes.func.isRequired
}

CommentForm.defaultProps = {
    onCommentSubmit: function() {}
}


export default CommentForm;