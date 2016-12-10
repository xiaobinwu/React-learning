import React from 'react';
import './index.scss';
import ImageContainer from '../imageContainer/index';
import RenderInBody from '../renderInBody/index';

class ImageGallary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openImageUrl: null
        }
        this.handleImageClick = (url) => {
            this.setState({openImageUrl: url})
        }
        this.handleImageClose = () => {
            this.setState({openImageUrl: null})
        }
    }

    render() {
        let { prefix, imageList } =  this.props;

        return (
            <div>
                <ul className={prefix}>
                    {
                        imageList.map( (pic, i) => {
                            return (
                                <li
                                 key={`image-gallary-${i}`}
                                 className={`${prefix}-item`}
                                 onTouchTap={this.handleImageClick.bind(this, pic.bigPictureUrl)}>
                                    <img src={pic.thumbnailUrl} />
                                </li>
                            )
                        })
                    }
                </ul>
                {
                    this.state.openImageUrl ? (
                        <RenderInBody>
                            <ImageContainer onClose={this.handleImageClose} imageUrl={this.state.openImageUrl} />
                        </RenderInBody>
                    ) : null
                }

            </div>
        );
    }
}

ImageGallary.propTypes = {
    prefix: React.PropTypes.string
}

ImageGallary.defaultProps = {
    prefix: 'lbd-image-gallary'
}

export default ImageGallary;
