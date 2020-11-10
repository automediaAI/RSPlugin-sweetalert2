import React, {Component} from 'react';
import {{{CLASSNAME}}} from './{{{CLASSNAME}}}';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const withSwalInstance = swalInstance =>
  class SweetAlert extends Component {
    componentDidMount() {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        html: <{{{CLASSNAME}}} />,
        {{{DECLARATION}}}
      });
    }

    render() {
      return null;
    }

  }

export default withSwalInstance();