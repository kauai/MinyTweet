import React, { Component } from "react";
import socket from 'socket.io-client'
import "./Timeline.css";
import TweeterLogo from "../twitter.svg";
import api from "../services/api";
import Tweet from "../components/Tweet";

export default class Timeline extends Component {
  state = {
    tweets: [],
    newTweet: ""
  };

  async componentDidMount() {
    this.subscribeToEvents()
    const response = await api.get("tweets");
    this.setState({ tweets: response.data });
  }

  //config socket.io
  subscribeToEvents = () => {
     const io = socket('http://localhost:3001')
     io.on('tweet',data => {
         console.log(data)
         this.setState({ tweets:[data,...this.state.tweets ] })
     }) 

     io.on('like',data => {
        this.setState({ tweets:this.state.tweets.map(item => {
             return item._id === data._id ? data : item
       })
      })
     })
  }

  // handleNewTweet = e => {
  //    if(e.keyCode === 13){
  //       console.log(this.state.newTweet)
  //    }
  // }

  handleNewTweet = async e => {
    if (e.keyCode !== 13) return;
    const content = this.state.newTweet;
    const author = localStorage.getItem("@gotweeter");

    await api.post("tweets", { content, author });
    //const response = await api.get("tweets");
    this.setState({ newTweet: "" });
  };

  handleInputChange = e => {
    this.setState({
      newTweet: e.target.value
    });
  };

  render() {
    return (
      <div className="timeline-wrapper">
        <img height="24" src={TweeterLogo} />
        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="O que esta acontecendo"
          />
        </form>
        <ul className={'tweet-list'}>
          {this.state.tweets.map(item => {
            return <Tweet key={ item._id } tweet={ item } />;
          })}
        </ul>
      </div>
    );
  }
}
