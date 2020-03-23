import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";

// MUI Theme
//import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import pink from '@material-ui/core/colors/pink'
import CssBaseline from '@material-ui/core/CssBaseline';


// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import FormPage from "./views/FormPage/Form.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"

const theme = createMuiTheme({
  palette: {
    primary: pink,
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage:
            "url(" + require('./views/images/la_6.jpg') + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          height: "200%",
          //marginTop: "-180px",
        },
        html: {
          height: "100%"
        },
      }
    }
  },
  container: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
})

function App() {
  const supportHistory = 'pushState' in window.history
  return (
    <MuiThemeProvider theme={theme}>
    <Suspense fallback={(<div>Loading...</div>)}>
      
        <CssBaseline />
          <NavBar/>
          <Router forceRefresh={!supportHistory}>
            <div className='container'>
              <Switch>
                <Route exact path="/" component={Auth(LandingPage, null)} />
                <Route exact path="/plan" component={Auth(FormPage, null)} />
                <Route exact path="/login" component={Auth(LoginPage, false)} />
                <Route exact path="/register" component={Auth(RegisterPage, false)} />
              </Switch>
            </div>
          </Router>
        <Footer />
      
    </Suspense>
    </MuiThemeProvider>
  );
}

export default App;
