import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom';
import { useSelector } from "react-redux";

import CKEditor from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const styles = {
  editor: {
    width: '100px'
  }
}

export default function SideEditor(props) {

  //const user = useSelector(state => state.user)
  const user = useSelector(state => state.user)    

  const [content, setContent] = useState('')
  const [contentDict, setContentDict] = useState({})

  const onEditorChange = ( event, editor) => {
    const data = editor.getData();
    console.log( { event, editor, data } );

    var dict = contentDict;
    dict[editor.id] = data;
    setContentDict(dict)

    console.log('contentDict cahnges: ', contentDict)
    var newContent = ''
    Object.keys(contentDict).map((key, index) => {
      newContent += contentDict[key]
    })
    setContent(newContent)

    console.log('content cahnges: ', content)
    var variables = {
      //content: data,
      content: content,
      author: user.userData._id
    }
    props.postVariables(variables)
  } 

  const onInit = (editor) => {
    console.log( 'Editor is ready to use!', editor );

    var content = ''
    props.data.attraction_groups.map((attraction_group,index) => {
      attraction_group.attractions.map((attraction) => {
        content += "<h1><strong>" + attraction.name + "</strong></h1><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>"
      }
      )
    })

    var variables = {
      //content: data,
      content: content,
      author: user.userData._id
    }
    props.postVariables(variables)
  }

  return (
    <div>
      {
        props.data.attraction_groups.map((attraction_group,index) => (
          attraction_group.attractions.map((attraction) => (
            <div key={index} style={{margin:"20px auto 20px auto", backgroundColor: 'white'}}>
              <CKEditor
                  editor={ BalloonEditor }
                  placeholder="Start making some notes!"
                  data={"<h1><strong>" + attraction.name + "</strong></h1><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>"}
                  onInit={ onInit }
                  onChange={ onEditorChange }
                  onBlur={ ( event, editor ) => {
                      console.log( 'Blur.', editor );
                  } }
                  onFocus={ ( event, editor ) => {
                      console.log( 'Focus.', editor );
                  } }
              />
            </div>
          )
        ))
      )}
    </div>
  )
}