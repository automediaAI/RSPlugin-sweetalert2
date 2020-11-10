import React, {Component} from 'react';
import Qrcodecomponent from './Qrcodecomponent';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const withSwalInstance = swalInstance =>
  class SweetAlert extends Component {
    componentDidMount() {
      // this.setupWithProps(this.props);
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        {{{DECLARATION}}}
      });
    }

    render() {
      return null;
    }

  }

export default withSwalInstance();