//rfc
import React, {useState, useEffect} from 'react'
import { Button, Form, message } from 'antd';
import axios from 'axios';
import { useSelector } from "react-redux";
import Typography from '@material-ui/core/Typography';

import QuillEditor from '../../../editor/QuillEditor';

export default function CreatePage(props) {

    const user = useSelector(state => state.user)
    const [content, setContent] = useState("")
    const [file, setFile] = useState([])

    //const { Title } = Typography

    const onFilesChange = (files) => {
        setFile(files)
    }

    const onEditorChange = (value) => {
        setContent(value)
    }

    const onSubmit = (event) => {
        event.preventDefault()

        setContent('')

        // if user is not logged in
        if (user.userData && !user.userData.isAuth) {
            return alert('Please log in first')
        }

        // else push the content into database
        // the variables need to be align with the naming in blogSchema
        const variables = {
            content: content,
            author: user.userData._id
        }
        
        // set up api in Node.js backend in server code.
        axios.post('/api/blog/createPost', variables)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    message.success('Post Created')

                    setTimeout(() => {
                        // used for redirect
                        props.history.push('/blog')
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
                    placeholder={"Start Posting Something"}
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


