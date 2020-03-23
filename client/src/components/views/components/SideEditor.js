import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import withStyles from '@material-ui/core/styles/withStyles'

import Typography from '@material-ui/core/Typography';
// import {Editor, EditorState} from 'draft-js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const styles = {
  editor: {
    width: '100px'
  },
}

class SideEditor extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
      //return <h1></h1>;
      return (
        <div>
                <CKEditor
                      style={{paddingBottom:"50px"}}
                      editor={ ClassicEditor }
                      data="<p>Editor 1</p>"
                      onInit={ editor => {
                          // You can store the "editor" and use when it is needed.
                          console.log( 'Editor is ready to use!', editor );
                      } }
                      onChange={ ( event, editor ) => {
                          const data = editor.getData();
                          console.log( { event, editor, data } );
                      } }
                      onBlur={ ( event, editor ) => {
                          console.log( 'Blur.', editor );
                      } }
                      onFocus={ ( event, editor ) => {
                          console.log( 'Focus.', editor );
                      } }
                />
                <CKEditor
                        editor={ ClassicEditor }
                        data="<p>Editor 2</p>"
                        onInit={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                  />
        </div>
        )
      
    }
  }

export default withStyles(styles)(SideEditor)