import React, {Component} from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

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
  apiKey:'AIzaSyDta-Ln6pjIsSH5_wuPkBJXsiMwpFrr2f4'
})(MapItem)
