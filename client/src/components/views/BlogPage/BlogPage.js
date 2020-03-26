import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Card, Icon, Avatar, Col, Row } from 'antd';
import Typography from '@material-ui/core/Typography';

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
                    alert('Couldn`t get blog`s lists')
                }
            })
    }, [])

    const renderCards = blogs.map((blog, index) => {
        return <Col key={index} lg={8} md={12} xs={24}>
            <Card
                hoverable
                style={{ width: 370, marginTop: 16 }}
                actions={[
                    <Icon type="setting" key="setting" />,
                    <a href={`/blog/create`}><Icon type="edit" key="edit" /></a>,
                    <a href={`/blog/post/${blog._id}`}> <Icon type="ellipsis" key="ellipsis" /></a>,
                ]}
            >
                <Meta
                    avatar={
                        <Avatar src={blog.author.image} />
                    }
                    title={blog.author.name}
                    description="This is the description"
                />
                <div style={{ height: 150, overflowY: 'scroll', marginTop: 10 }}>
                    {/* dangerouslySetInnerHTML is to pu the blog content in desirable style */}
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
            </Card>
        </Col>
    })

    return (
        <div style={{paddingTop: '80px'}}>
            <div style={{ width: '85%', margin: 'auto auto auto auto'}}>
                <div style={{ textAlign: 'center' }}>
                    <Typography variant="h2" color="primary" gutterBottom style={{fontWeight: "bold"}}>
                        Blog Lists 
                    </Typography>
                </div>
                <Row gutter={[32, 16]} style={{marginLeft: '90px'}}>
                    {renderCards}
                </Row>
            </div>
        </div>
    )
}