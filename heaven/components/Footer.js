import React from 'react';
import { shadows } from '@material-ui/system'
import {Grid, Box} from '@material-ui/core'
import Center from 'react-center'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCoffee , faHeart } from '@fortawesome/free-solid-svg-icons'

export default function Footer(){
    return (

            <Box boxShadow={3} style={{
               position:'absolute',
               bottom:0,
               width: '100%',
               height:'45px',
               boxSizing: 'border-box',
            }}

            >
               <Center style={{height:'100%'}}>
             <span><b>Made with <FontAwesomeIcon icon={faCoffee} width="18" style={{ color: '#a05a07' }} /> and <FontAwesomeIcon icon={faHeart} width="18" style={{color:'red'}}/>  by Team Probably</b></span>
               </Center>
            </Box>

    )
}