import React from 'react';
import Comment from './comment/index';
let CommentList = (props) =>{
	/*react的key关乎到react的dom-diff算法 react中对于dom的操作是根据生成的data-reactid进行绑定的，
	添加key可以保证dom结构的完整性，而不会根据react自己对dom标记的key进行重新分配 react每次决定
	重新渲染的时候，几乎完全是根据data-reactid来决定的，最重要的是这个机制*/
	let {data} = props;
	let commentNodes = data.map((comment, index)=>{
		return(
			<Comment author={comment.author}  commentid={comment.id}  key={comment.id}>
				{comment.text}
			</Comment>
		);
	});

	return(
		<div className="commentList">
			{commentNodes}
		</div>
	)
}

CommentList.propTypes = {
	data: React.PropTypes.arrayOf(React.PropTypes.object)
}

CommentList.defaultProps = {
	data: []
}

export default CommentList;