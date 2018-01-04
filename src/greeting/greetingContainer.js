import {connect} from 'react-redux';

import Greeting from './greeting';

export const mapStateToProps = ({router}) => ({
  visitor: router.match.params.visitor,
});

export default connect(mapStateToProps)(Greeting);
