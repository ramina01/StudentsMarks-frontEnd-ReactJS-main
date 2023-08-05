import React, { Component } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  handleChange(files) {
    this.setState({
      files: files
    });

    if (this.props.onFileChange) {
      this.props.onFileChange(files);
    }
  }

  render() {
    return (
      <DropzoneArea
        onChange={this.handleChange.bind(this)}
        acceptedFiles={['application/pdf']}
        maxFileSize={2000000} // Maximum file size in bytes (2MB)
        dropzoneText="Drag and drop PDF files here or click"
        showAlerts={false}
        filesLimit={10} // Maximum number of files allowed to be uploaded (10 files)
      />
    );
  }
}

export default Dropzone;
// import React, {Component} from 'react'
// import {DropzoneArea} from 'material-ui-dropzone'

// class Dropzone extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       files: []
//     };
//   }
//   handleChange(files){
//     this.setState({
//       files: files
//     });
//   }
//   render(){
//     return (
//       <DropzoneArea
//         onChange={this.handleChange.bind(this)}
//         />
//     )
//   }
// }

// export default Dropzone;