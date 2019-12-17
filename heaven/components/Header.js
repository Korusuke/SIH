import React from 'react';
import {AppBar, Toolbar,Grid} from '@material-ui/core/';

import Center from 'react-center'

export default function Header(){

    let styles = {
        center:{
            height: '100%'
        },
        image:{
            backgroundSize: 'contain',
            
        }

    }
    return (
        <div>
            <AppBar position="static" style={
                {
                    backgroundColor: 'white',
                    color: 'black',
                    height: '80px'
                }
            } >
                <Toolbar>
                    <div style={
                        {position: 'absolute',
                        width:'100%',
                        height: '100%'
                    }
                    }>
                    <Center>
                        <h1>Internal Hackathon</h1>
                    </Center>
                    </div>
                    <Grid 
                    container 
                    direction="row"
                    spacing={1}
                    >
                        <Grid item sm={1}>
                            <Center style={styles.center}>
                            <img src="/assets/images/somaiya.png" style={styles.image} width="100" />
                            </Center>
                        </Grid>
                        <Grid item sm={1}>
                            <Center style={styles.center}>
                                <img src="/assets/images/sihlogo.png" style={styles.image} width="100"/>
                            </Center>
                        </Grid>
                        
                        
                            
                    </Grid>
                
                </Toolbar>
            </AppBar>
        </div>
    )
}