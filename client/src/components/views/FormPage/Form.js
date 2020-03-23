import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
            displaySideEditor: true,
            isMounted: false
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
      }

    render() {
        return (
            <div style={{ width: '80%', margin: 'auto auto auto auto'}}>
                {this.state.displayWelcome === true ? (
                    <div style={{ textAlign: 'left', paddingTop: '80px', margin: 'auto 300px auto 300px'}}>
                        <Typography variant="h2" color="primary" gutterBottom style={{fontWeight: "bold"}}>
                            Good morning!
                        </Typography>
                        <Typography variant="h2" color="primary" style={{color:"white", fontWeight: "bold"}}>
                            Where you feel like going today?
                        </Typography>
                    </div>
                ) : (<div></div>)}
                    <Checkout setWelcomeVisible = {this.setWelcomeVisible} setSideEditorVisible = {this.setSideEditorVisible}/>
                    {/*<Grid container spacing={5} style={{ paddingRight: '80px'}}>
                        <Grid item xs={9}>  
                            <Checkout setWelcomeVisible = {this.setWelcomeVisible} setSideEditorVisible = {this.setSideEditorVisible}/>
                        </Grid>
                        {this.state.displaySideEditor === true ? (
                            <Grid item xs={3}>  
                                <div style={{ textAlign: 'left', paddingTop: '80px'}}>
                                    <SideEditor/>
                                </div>
                            </Grid>
                        ) : (<div></div>)}
                        </Grid>*/}
            </div>
            
        )
    }
}

Form.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Form)