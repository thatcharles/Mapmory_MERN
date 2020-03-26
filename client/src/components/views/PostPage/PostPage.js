import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
const { Title } = Typography

export default function PostPage(props) {

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
                } else {
                    alert('Couldnt get post detail')
                }
            })
    }, [])

    if (post.author) {
        return (
            <div style={{paddingTop: '80px'}}>
                <div className="postPage" style={{ width: '70%', margin: '3rem auto', backgroundColor: 'white' }}>
                    <div style={{margin: '80px 80px 80px 80px', paddingTop: '80px', paddingBottom: '80px'}}>
                        <Title level={2}>{post.author.name}'s Post</Title>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Title level={4}>{post.createdAt}</Title>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div style={{ width: '80%', margin: '3rem auto' }}>loading...</div>
        )
    }
}

