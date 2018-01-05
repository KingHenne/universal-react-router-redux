import React from 'react';
import {connect} from 'react-redux';

function LocationInfo({location}) {
  return <div>Location: {location.pathname}</div>;
}

export const mapStateToProps = ({router}) => ({
  location: router.location,
});

export default connect(mapStateToProps)(LocationInfo);
