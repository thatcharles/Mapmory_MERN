//rfc
import React, {useState, useEffect} from 'react'
import { Typography, Button, Form, message } from 'antd';
import axios from 'axios';
import { useSelector } from "react-redux";

import QuillEditor from '../../../editor/QuillEditor';

export default function CreatePage() {

    const user = useSelector(state => state.user)
    const [content, setContent] = useState("")
    const [file, setFile] = useState([])

    const { Title } = Typography

    const onFilesChange = (files) => {
        setFile(files)
    }

    const onEditorChange = (value) => {
        setContent(value)
    }

    const onSubmit = (event) => {
        event.preventDefault()

        setContent("")

        // if user is not logged in
        if (user.userData && !user.userData.isAuth) {
            return alert('Please log in first')
        }

        // else push the content into database
        const variables = {
            content: content,
            userID: user.userData._id
        }

        axios.post('api/blog/createPost', variables)
            .then()
    }



    return (
        <div style={{paddingTop: '80px'}}>
            <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
                <div style={{ textAlign: 'center' }}>
                    <Title level={2} > Editor</Title>
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


