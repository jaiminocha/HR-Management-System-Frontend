import React, { useState, useEffect } from 'react'
import { Container, Form, Table, FormGroup, Label, Input } from 'reactstrap'
import { getCurrentUserDetail } from '../../Auth';
import { Button } from 'react-bootstrap';
import { updateSelf } from '../../Services/UserService';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';

const ProfileInfo = () => {
  const [user, setUser] = useState(null);
  const [editActive, setEditActive] = useState(true);
  const [btnText, setBtnText] = useState('Edit');

  const toggleEdit = () => {
    setEditActive(!editActive);
    console.log("edit active: ", editActive)
    if (editActive) setBtnText('Cancel')
    else setBtnText('Edit');
  }

  const handleChange = (e) => {
    setUser({...user, [e.target.name]:e.target.value});
  }

  const handleSubmit = () => {
    
    const empId = user.id;
    updateSelf(user, empId).then(data => {
      toast("Changes successful")
      console.log(data);
      toggleEdit();
      // localStorage.setItem
    }).catch((error) => {
      toast("Changes denied ", error);
      console.log(error);
    });
    setUser({
      ...user,
      'password': ""
    })
  }

  useEffect(() => {
    setUser(getCurrentUserDetail());
  }, [])
  return (
    <div>
      <h1 className='profileHeading'>Profile Information</h1>
     { user && <Table style={{margin:'2rem 0 2rem 0'}} 
      className='shadow'
      bordered
      hover
      size="sm">
        <thead>
          <tr>
            <th>
              #
            </th>
            <th>
              First Name
            </th>
            <th>
              Last Name
            </th>
            
            <th>
              Username
            </th>
            <th>
              Age
            </th>
            <th>
              Salary
            </th>
            <th>
              Designation
            </th>
            <th>
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              1
            </th>
            <td>
              {user.firstName}
            </td>
            <td>
              {user.lastName}
            </td>
            <td>
              {user.email}
            </td>
            <td>
              {user.age}
            </td>
            <td>
              {user.salary}
            </td>
            <td>
              {user.designation}
            </td>
            <td>
              {user.roles[0].role_type}
            </td>
          </tr>
        </tbody>
      </Table>
    }
    <Button style={{width: '150px', margin:'4rem'}} onClick={toggleEdit} variant={!editActive ? "danger" : "primary"} className="editbtn shadow">{btnText} <EditIcon /></Button>

    {
      !editActive ? 
      <div style={{border: '2px solid black', padding: '2rem', margin:'1rem'}}>
        <Container>
        <Form>
          <FormGroup>
            <Label
              for="exampleFirstName"
              hidden
            >
              First Name
            </Label>
            <Input
              id="exampleFirstName"
              name="firstName"
              placeholder="First Name"
              type="text"
              value={user.firstName}
              onChange={handleChange}
            />
          </FormGroup>
          {' '}
          <FormGroup>
            <Label
              for="exampleLastName"
              hidden
            >
              Last Name
            </Label>
            <Input
              id="exampleLastName"
              name="lastName"
              placeholder="Last Name"
              type="text"
              value={user.lastName}
              onChange={handleChange}
            />
          </FormGroup>
          {' '}
          <FormGroup>
            <Label
              for="exampleAge"
              hidden
            >
              Age
            </Label>
            <Input
              id="exampleAge"
              name="age"
              placeholder="Age"
              type="number"
              min="0"
              value={user.age}
              onChange={handleChange}
            />
          </FormGroup>
          {' '}
          <FormGroup>
            <Label
              for="examplePassword"
              hidden
            >
              Password
            </Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
              value={user.password}
              onChange={handleChange}
              min='3'
            />
          </FormGroup>
          {' '}
          
          <Button variant='success' onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
        </Container>
      </div>
      :
      <></>
    }
    </div>
  )
}

export default ProfileInfo