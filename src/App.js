import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import { secrets } from './secrets';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import { Button, Container } from 'semantic-ui-react';
import Video from './Video.js';

Amplify.configure({
  Auth: {
    identityPoolId: secrets.identityPoolId,
    region: secrets.region,
    userPoolId: secrets.userPoolId,
    userPoolWebClientId: secrets.userPoolWebClientId
  }
});
Amplify.addPluggable(new AWSIoTProvider({
  aws_pubsub_region: secrets.region,
  aws_pubsub_endpoint: secrets.aws_pubsub_endpoint,
}));
Amplify.PubSub.subscribe('arduino/outgoing').subscribe({
  next: data => console.log('Message received', data),
  error: error => console.error(error),
  close: () => console.log('Done'),
});

class App extends Component {
  state={type: null}

  moveRobot = i => {
    console.log(i);
    Amplify.PubSub.publish('arduino/incoming', i);
  }
  render() {
    console.log(this.state.type);
    return (
      <Container>
        {this.state.type===null?
        <Button.Group size='massive' style={{marginTop:"20%"}}>
          <Button primary onClick={()=>{this.setState({type: 0})}}>Robot</Button>
          <Button.Or />
          <Button secondary onClick={()=>{this.setState({type: 1})}}>Controller</Button>
        </Button.Group>:null}
        {this.state.type===0?<Video type={0}/>:null}
        {this.state.type===1?<Video type={1}/>:null}
        {this.state.type===1?<Button.Group>
    <Button labelPosition='left' icon='left chevron' content='Back' onMouseDown={()=>this.moveRobot(2)} onMouseUp={()=>this.moveRobot(3)}/>
    <Button icon='undo' content='Turn Left'  onMouseDown={()=>this.moveRobot(4)} onMouseUp={()=>this.moveRobot(3)}/>
    <Button icon='redo' content='Turn Right' onMouseDown={()=>this.moveRobot(5)} onMouseUp={()=>this.moveRobot(3)}/>
    <Button labelPosition='right' icon='right chevron' content='Forward' onMouseDown={()=>this.moveRobot(1)} onMouseUp={()=>this.moveRobot(3)}/>
  </Button.Group>:null}
  </Container>
    );
  }
}
export default App;
