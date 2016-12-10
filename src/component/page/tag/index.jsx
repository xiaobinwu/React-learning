import './index.scss';
import React from 'react';

let Tag = (props) => {
    let {type, title, active, className} = props;

    if(title){
        className += ` lbd-tag-custom ${active ? 'active' : ''}`;
    }
    else{
        className += ' lbd-tag lbd-tag-' + type;
    }

    return (
      <span className={className}>
        {title}
      </span>
    )
};

Tag.propTypes = {
   type: React.PropTypes.oneOf(['pm', 'hr', 'a2a-job', 'pm-job', 'private']),
   title: React.PropTypes.string,
   active: React.PropTypes.bool
}

Tag.defaultProps = {
    type: '',
    title: '',
    className: ''
}

export default Tag;
