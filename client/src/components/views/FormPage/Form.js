import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import { message } from 'antd';

import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Checkout from '../checkout/Checkout.js'
import SideEditor from '../components/SideEditor.js'

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    paper: {
        paddingTop: '50px'
    }
}

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayWelcome: true,
            displaySideEditor: false,
            SideEditorInitial: true,
            isMounted: false,
            postVariables: {},
            SideEditorData: {},
            SideEditorMap: {}
        }
    }

    componentDidMount() {
        this.setState({
          isMounted: true
        })
    }
    
    setWelcomeVisible = (arg) => {
        console.log(arg)
        this.setState({
            displayWelcome: arg
        })
    }

    setSideEditorVisible = (arg) => {
        console.log('setSideEditorVisible ', arg)
        if (this.state.isMounted){
          this.setState({
            displaySideEditor: arg
          })
        }

        if (arg == true) {
            this.setState({
                SideEditorInitial: false
            })
        }

        // setSideEditorVisible false equals to submittion
        if (arg == false && this.state.SideEditorInitial == false){
            axios.post('/api/blog/createPost', this.state.postVariables)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    message.success('Post Created')

                    setTimeout(() => {
                        // used for redirect
                        this.props.history.push('/')
                    }, 5000);
                }
            })
        }
    }

    setSideEditorData = (data) => {
        console.log(data)
        this.setState({
            SideEditorData: data
        })
    }

    setSideEditorMap = (data) => {
        console.log(data)
        this.setState({
            SideEditorMap: data
        })
    }
    
    setPostVariables = (variables) => {
        if (this.state.isMounted){
            this.setState({
              postVariables: variables
            })
          }
    }

    render() {
        return (
            <div style={{ width: '80%', margin: 'auto'}}>
                {this.state.displayWelcome === true ? (
                        <div style={{ textAlign: 'left', paddingTop: '80px', margin: 'auto 300px auto 300px'}}>
                            <Typography variant="h2" color="primary" gutterBottom style={{fontWeight: "bold"}}>
                                Good morning!
                            </Typography>
                            <Typography variant="h2" color="primary" style={{color:"white", fontWeight: "bold"}}>
                                Where you feel like going today?
                            </Typography>
                        </div>
                    ) : (<div></div>)
                }
                {this.state.displaySideEditor === true ? (
                        <Grid container spacing={5} style={{ margin: 'auto'}}>
                            <Grid item xs={9}>  
                                <Checkout 
                                    setWelcomeVisible = {this.setWelcomeVisible} 
                                    setSideEditorVisible = {this.setSideEditorVisible}
                                    setSideEditorData = {this.setSideEditorData}
                                    setSideEditorMap = {this.setSideEditorMap}
                                    sideEditorData = {this.state.SideEditorData}
                                    sideEditorMap = {this.state.SideEditorMap}
                                    step = {3}
                                />
                            </Grid>
                            {this.state.displaySideEditor === true ? (
                                <Grid item xs={3}>  
                                    <div style={{ textAlign: 'left', paddingTop: '80px'}}>
                                        <SideEditor postVariables = {this.setPostVariables} data = {this.state.SideEditorData}/>
                                    </div>
                                </Grid>
                            ) : (<div></div>)}
                        </Grid>
                    ) : (
                        <div>
                            {this.state.SideEditorInitial === false ? (
                                <Checkout 
                                        setWelcomeVisible = {this.setWelcomeVisible} 
                                        setSideEditorVisible = {this.setSideEditorVisible}
                                        setSideEditorData = {this.setSideEditorData}
                                        setSideEditorMap = {this.setSideEditorMap}
                                        step = {4}
                                />
                            ):(
                                <Checkout 
                                        setWelcomeVisible = {this.setWelcomeVisible} 
                                        setSideEditorVisible = {this.setSideEditorVisible}
                                        setSideEditorData = {this.setSideEditorData}
                                        setSideEditorMap = {this.setSideEditorMap}
                                />
                            )}
                        </div>
                    )
                }
            </div>
            
        )
    }
}

//paddingRight: '80px'

Form.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Form)