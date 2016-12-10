import React from 'react';
import './index.scss';

class ImageContainer extends React.Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.imageUrl !== this.props.imageUrl
    }

    componentDidMount() {
        document.body.classList.add('modal-is-open');
    }

    componentWillUnmount() {
        document.body.classList.remove('modal-is-open');
    }

    render() {
        let { imageUrl, prefix, onClose } = this.props;

        return (
            <div>
                <div className={`${prefix}-mask`} />
                <div className={`${prefix}-wrap`}>
                    <div className={`${prefix}-image`}>
                        <img src={imageUrl} />
                    </div>
                    <div className={`${prefix}-control`}>
                        <div className={`${prefix}-close`} onTouchTap={onClose}>关闭</div>
                    </div>
                </div>
            </div>
        )
    }
}

ImageContainer.propTypes = {
    prefix: React.PropTypes.string,
    onClose: React.PropTypes.func
}

ImageContainer.defaultProps = {
    prefix: 'lbd-image-container',
    onClose: function() {}
}

export default ImageContainer;
