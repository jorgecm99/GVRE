import React, {Component} from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import googleKey from '../../../Keys.js';

class MapItem extends Component {
  render() {
    return (
      <div style={{height:'400px'}}>
          <Map
            google={this.props.google}
            style={{height:'400px',width:'100%'}}
            zoom={15}
            initialCenter={{lat: 28.704060, lng: 77.102493}}
            containerStyle={{height:'400px'}}
          />
      </div>
  )
  }
};

export default GoogleApiWrapper ({
  apiKey:(googleKey.googleKey)
})(MapItem)
