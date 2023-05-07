import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Container, Card, CardHeader } from 'reactstrap'
import { useSpring, animated } from 'react-spring';
import { logIn } from '../Services/UserService';
import { toast } from 'react-toastify';
import { doLogin } from '../Auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.trim() === ''){
      toast.error("Email is required")
      return;
    }
    // Handle login logic
    const logInDetail = {
      "username": email,
      "password": password
    };
    logIn(logInDetail).then((response) => {
      console.log(response);
      doLogin(response, () => {
        console.log("login detail is saved to local storage")
        // redirect to user page 
        // navigate(-1);
        // navigate("/user/dashboard")
        window.location.replace('user/profile')
      });
      toast.success("Log in successful")
      console.log("Success log")
    }).catch((error) => {
      console.log(error);
      if (error.response.status == 400 || error.response.status == 404){
        toast.error(error.response.data.message)
      }
      else toast.error("Invalid Credentials")
      console.log("Error log")
    })
    setEmail('');
    setPassword('');
  };

  // Set up animations
  const emailAnimation = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });
  const passwordAnimation = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 400 });
  const buttonAnimation = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 600 });

  return (
    <Container style={{width:'400px', marginTop: "6rem"}}>
      <Card className='shadow'>
      <CardHeader><h3>Log in</h3></CardHeader>
      <Form onSubmit={handleSubmit} style={{padding: '1rem'}}>
        <animated.div style={emailAnimation}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>
        </animated.div>

        <animated.div style={passwordAnimation}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
        </animated.div>
        <div style={{display: 'flex', margin: '1rem'}}>
          <animated.div style={buttonAnimation}>
            <Button className='shadow' variant="primary" type="submit" >
              Login
            </Button>
          </animated.div>
          <animated.div style={buttonAnimation}>
            <Button className='shadow' style={{marginLeft: '10px'}} variant="dark" type="submit" onClick={() => {setEmail(''); setPassword(''); toast.success("Reset Successful")}} >
              Reset
            </Button>
          </animated.div>
        </div>
      </Form>
      </Card>
    </Container>
  );
};

export default LoginForm;
