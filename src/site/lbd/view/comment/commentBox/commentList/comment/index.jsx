import React from 'react';

const Remarkable = require('remarkable');

let Comment = (props) =>{
	
	let {author, children , commentid} = props;

	let commentidtime = new Date(commentid).toLocaleString();

	let rawMarkup = () =>{
		let md = new Remarkable();
		let rawMarkup = md.render(children.toString());
		return { __html: rawMarkup };
	}


	return(
		<div className="comment">
			<h2 className="commentAuthor">
				{commentidtime} - {author}
			</h2>
			<span dangerouslySetInnerHTML={rawMarkup()}></span>
		</div>
	)  
}

Comment.propTypes = {
	author: React.PropTypes.string,
	commentid: React.PropTypes.number,
	children: React.PropTypes.string
}

Comment.defaultProps = {
	author: '',
	commentid: 14781390745100,
	children: "暂无评论内容"
}

export default Comment;