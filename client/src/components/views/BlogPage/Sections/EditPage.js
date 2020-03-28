//rfc
import React, {useState, useEffect} from 'react'
import { Button, Form, message } from 'antd';
import axios from 'axios';
import { useSelector } from "react-redux";
import Typography from '@material-ui/core/Typography';

import QuillEditor from '../../../editor/QuillEditor';
import { FaLongArrowAltDown } from 'react-icons/fa';

export default function EditPage(props) {

    const user = useSelector(state => state.user)
    const [content, setContent] = useState('')
    const [file, setFile] = useState([])
    
    // get post id
    const postId = props.match.params.postId

    const [post, setPost] = useState([])

    useEffect(() => {
        const variable = {postId: postId}
        // variable is the body of the request
        axios.post('/api/blog/getPostDetail', variable)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data.post)
                    // post is in a list
                    setPost(response.data.post)
                    if (response.data.post) {
                        console.log('original content:', response.data.post.content)
                        setContent(response.data.post.content)
                        console.log('content:', content)
                    }
                } else {
                    alert('Couldn`t get post detail')
                }
            })
    }, [])

    const onFilesChange = (files) => {
        setFile(files)
    }

    const onEditorChange = (value) => {
        setContent(value)
        console.log('content on change:', content)
    }

    const onSubmit = (event) => {
        event.preventDefault()

        //setContent('')

        // if user is not logged in
        if (user.userData && !user.userData.isAuth) {
            return alert('Please log in first')
        }

        // else push the content into database
        // the variables need to be align with the naming in blogSchema
        const variables = {
            _id: postId,
            content: content,
            author: user.userData._id
        }
        
        // set up api in Node.js backend in server code.
        axios.post('/api/blog/updatePost', variables)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    message.success('Post Updated')

                    setTimeout(() => {
                        // used for redirect
                        props.history.push('/')
                    }, 2000);
                }
            })
    }



    return (
        <div style={{paddingTop: '80px'}}>
            <div style={{ maxWidth: '900px', margin: '2rem auto'}}>
                <div style={{ textAlign: 'center' }}>
                    {/*<Title level={2} > Editor</Title>*/}
                    <Typography variant="h2" color="primary" gutterBottom style={{fontWeight: "bold"}}>
                        Editor
                    </Typography>
                </div>
                <QuillEditor
                    initialValue={content}
                    onEditorChange={onEditorChange}
                    onFilesChange={onFilesChange}
                />

                <Form onSubmit={onSubmit}>
                    <div style={{ textAlign: 'center', margin: '2rem', }}>
                        <Button
                            size="large"
                            htmlType="submit"
                            className=""
                            onSubmit={onSubmit}
                        >
                            Submit
                    </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}


