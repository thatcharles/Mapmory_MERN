import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';

const { Title } = Typography
const { Meta } = Card;

export default function BlogPage() {

    const [blogs, setBlogs] = useState([])

    // act like componentDidMount()
    useEffect(() => {
        axios.get('/api/blog/getBlogs')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.blogs)
                    setBlogs(response.data.blogs)
                } else {
                    alert('Couldnt get blog`s lists')
                }
            })
    }, [])

    return (
        <div style={{paddingTop: '80px'}}>
            <div style={{ width: '85%', margin: '3rem auto'}}>
                <Title level={2}> Blog Lists </Title>
                    <Row gutter={[32, 16]}>
                        {/*renderCards*/}
                    </Row>
            </div>
        </div>
    )
}

