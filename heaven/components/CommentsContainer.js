import React from 'react'


import Footer from '../components/Footer'
import Header from '../components/Header'
import Comment from '../components/Comment'
import Center from 'react-center'
import '../styles/index.css'
import {Paper, Button, Grid} from '@material-ui/core'


export default class CommentsContainer extends React.Component {

    constructor(props)
    {
        super()
        this.props = props
        this.state = {
            comments:[],
            newcomment: "",
            posting: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        
    }

    componentDidMount()
    {
        try{
            fetch(`http://localhost:8080/ps/comments/?psid=${this.props.psid}`
            ,
            {
                
                credentials: "include",
                
            }
            ).then(res => res.json())
            .then(data => {
                this.setState({
                    comments: data.comments,
                    
                })
            })
        }catch(e)
        {
            console.log(e)
        }

        
    }

    handleClick()
    {
        try{
            this.setState(
                {
                    posting: true
                }
            )
            fetch('http://localhost:8080/ps/comments/'
            ,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    psid: this.props.psid,
                    comment: {
                        message: this.state.newcomment
                    }
                })
            }
            ).then(res => res.json())
            .then(data => {
                this.setState({
                    comments: data.comments,
                    newcomment: "",
                    posting: false
                })
            })
        }catch(e)
        {
            console.log(e)
        }
    }

    handleChange(event)
    {
        let {name, value} = event.target
        this.setState(
            {
                [name]: value
            }
        )
    }

    render()
    {
        let arr = []
        //console.log(this.state.comments)
        if(this.state.comments){
            this.state.comments.forEach(
                e=>{
                    arr.push(
                        <div style={{padding: '10px'}}>
                        <Comment name={e.comment.author}  delComment = {true} message={
                            e.comment.message
                        }/>
                        </div>
                        
                    )
                }
            )
        }
        return (
            <div>
                <Paper>
                <Center><h2>Comments</h2></Center>

                
                { arr ? arr : 'No comments yet'}
                

                <div style={{padding: '20px'}}>
                <textarea rows={4} name="newcomment" value={this.state.newcomment} onChange={this.handleChange} style={{width: '100%'}}/>
                <br/>
                    <Center><Button color="primary" disabled={this.state.posting} variant="contained" onClick={this.handleClick}>{this.state.posting? `Posting`: 'Post'}</Button></Center>
                </div>
                </Paper>
            </div>
        );
    }
}