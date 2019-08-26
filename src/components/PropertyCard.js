import React, { Component } from 'react';
import Moment from 'react-moment';

class PropertyCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const metaData = this.props.metadata;
    return (
      <div className="listing-card">
        <div className="card-header">
          <img src={metaData.photos[0]} />
          <button
            className={`like-btn ${this.props.liked ? 'liked' : ''}`}
            onClick={() => this.props.toggleProperty(metaData.mlsId)}>
            Thumbs up
          </button>
        </div>
        <div className="card-body">
          <p className="card-item">
            <strong>Stories:</strong> {metaData.property.stories}
          </p>
          <p className="card-item">
            <strong>Bedrooms:</strong> {metaData.property.bedrooms}
          </p>
          <p className="card-item">
            <strong>Bathrooms:</strong> {metaData.property.bathrooms}
          </p>
          <p className="card-item">
            <strong>Full Baths:</strong> {metaData.property.bathsFull}
          </p>
          <p className="card-item">
            <strong>Half Baths:</strong> {metaData.property.bathsHalf}
          </p>
          <p className="card-item">
            <strong>MLSID:</strong> {metaData.mlsId}
          </p>
          <p className="card-item">
            <strong>List Date:</strong>{' '}
            <Moment date={metaData.listDate} format="MM/DD/YYYY" />
          </p>

          <p className="card-item">
            <strong>Price:</strong>$
            {new Intl.NumberFormat('en-US', {
              style: 'decimal'
            }).format(metaData.listPrice)}
          </p>
        </div>
      </div>
    );
  }
}

export default PropertyCard;
