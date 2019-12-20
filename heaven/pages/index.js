import React from 'react'


import Footer from '../components/Footer'
import Header from '../components/Header'
import IndexContent from '../components/IndexContent'
import Chaand from '../components/chaand';

import '../styles/index.css';
import { useTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export default class extends React.Component  {

    theme = {
        dark: {
            background: '#121212',
            text: '#FFFFFF',
        },
        light: {
            background: '#FCFCFC',
            text: '#000000',
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            theme: 'light'
        }
        this.handler = this.handler.bind(this)
    }


    handler() {
        if (this.state.theme == 'light') {
            this.setState({
                theme: 'dark'
            })
        } else {
            this.setState({
                theme: 'light'
            })
        }
    }

    render() {
        const customtheme = createMuiTheme({
            palette: {
                type: this.state.theme == 'light' ? 'light' : 'dark',
            },
        });
        let curtheme = this.state.theme == 'light' ? this.theme.light : this.theme.dark;

        return (
            <ThemeProvider theme={customtheme}>
            <div>
                <Chaand handler={this.handler} chaand={this.state.theme == 'light' ? 1 : 0} />
                <div id="content-wrap" style={{ backgroundColor: `${curtheme.background}`, color: `${curtheme.text}` }}>
                    <Header />
                    <IndexContent url="http://localhost:8080" theme={this.state.theme == 'light' ? this.theme.light : this.theme.dark}/>
                </div>
                <Footer />
                </div>
            </ThemeProvider>
        )
    };
  }
