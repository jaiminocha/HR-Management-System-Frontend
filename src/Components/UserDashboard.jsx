import React, { useEffect, useState } from 'react'
import { createUser, deleteEmp, loadAllRoles, loadAllUsers, updateUser } from '../Services/UserService'
import { Button } from 'react-bootstrap';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { toast } from 'react-toastify';
import { Container, Form, Table, FormGroup, Label, Input } from 'reactstrap'

const UserDashboard = () => {
  const dummyUser = {
    "firstName": "",
    "lastName": "",
    "age": "",
    "salary": "",
    "designation": "",
    "roles": [{
      "role_id": "",
      "role_type": ""
    }],
    "email": "",
    "password": ""
  };
  const [createActive, setCreateActive] = useState(true);
  const [btnText, setBtnText] = useState('Add new')
  const [empDetails, setEmpDetails] = useState(null); 
  const [roles, setRoles] = useState(null);
  const [user, setUser] = useState(dummyUser); 
  const [editActive, setEditActive] = useState(false)
  const [userToEdit, setUserToEdit] = useState(null);
  const role = JSON.parse(localStorage.getItem("data")).employeeDto.roles[0].role_type;

  const handleDelete = (index, empId, roleType) => {
    const resp = window.confirm(`Are you sure you want to delete employee details of employee at index : ${index}`)
    
    if (!resp){
      toast("Details not deleted")
      return;
    }
    if (roleType.includes('SUPER_ADMIN')){
      toast('Cannot delete details of Super Admin');
      return;
    }
    // filter the emp list
    const newList = empDetails.filter((emp) => {
      return emp.id !== empId;
    })
    setEmpDetails(newList);
    deleteEmp(empId).then((data) => {
      toast(data.message);
    }).catch(error => console.log(error)) 
  }

  const handleEdit = (emp) => {
    // take input inside form and update the employee details
    setUserToEdit(emp);
    setEditActive(!editActive);
  }

  const handleEditSubmit = () => {
    // console.log(user);
    updateUser(user, userToEdit.id).then((data) => {
      // console.log(data.message);
      toast("User updated successfully")
    }).catch(error => console.log(error)) 
    // filter empdetails with updated user
    const listEmp = empDetails.filter((empl) => {
      return empl.email !== user.email;
    })
    // console.log(listEmp, )
    setEmpDetails([...listEmp, user]);
    setUser(dummyUser);
    setEditActive(!editActive)
  }

  const toggleAddNew = () => {
    setCreateActive(!createActive);
    if (createActive) setBtnText('Cancel');
    else setBtnText('Add new')
  }

  const handleChange = (e) => {
    setUser({...user, [e.target.name]:e.target.value});
  }
  const handleSubmit = () => {
    console.log(user);
    createUser(user).then((data) => {
      // console.log(data.message);
      toast("New user added")
    }).catch(error => console.log(error)) 
    setUser(dummyUser);
    setCreateActive(!createActive)
    setBtnText('Add new')
    setEmpDetails([...empDetails, user])
  }
  const handleOption = (e) => {
    let opt = e.target.value;
    let id = opt[0];
    for (let i = 0; i < roles.length; i++){
      if (id == roles[i].role_id){
        setUser({
          ...user,
          roles: [
            {
              "role_id": id,
              "role_type": roles[i].role_type
            }
          ]
        })
        break;
      }
    }
  }

  useEffect(() => {
    //users
    loadAllUsers().then((data) => {
      setEmpDetails(data);
    }).catch(error => console.log(error))
    //roles
    loadAllRoles().then((data) => {
      setRoles(data);
    }).catch(error => console.log(error))
  }, [])

  return (
    <div>
      <h1 className='profileHeading'>User Dashboard</h1>

      {
        (role.includes('SUPER_ADMIN') || role.includes('HR_ADMIN')) && 
        <div style={{margin:'2rem', position: 'relative', }}>
          <Button onClick={toggleAddNew} className='shadow' variant={createActive ? 'success' :'danger'}>{btnText} <AddCircleOutlineIcon /></Button>
          <hr />
          {
            !createActive ? 
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
                    for="exampleDesignation"
                    hidden
                  >
                    Designation
                  </Label>
                  <Input
                    id="exampleDesignation"
                    name="designation"
                    placeholder="Designation"
                    type="text"
                    value={user.designation}
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
                    for="exampleSalary"
                    hidden
                  >
                    Salary
                  </Label>
                  <Input
                    id="exampleSalary"
                    name="salary"
                    placeholder="Salary"
                    type="number"
                    min="0"
                    value={user.salary}
                    onChange={handleChange}
                  />
                </FormGroup>
                {' '}
                <FormGroup>
                  <Label
                    for="exampleEmail"
                    hidden
                  >
                    Email
                  </Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={user.email}
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
                  />
                </FormGroup>
                {' '}
                <Input
                  className="mb-3"
                  type="select"
                  onChange={handleOption}
                >
                  <option>
                    Select role
                  </option>
                  {
                    roles?.map((role, index) => {
                      return (
                        <option key={index}>{role.role_id}. {role.role_type}</option>
                      );
                    })
                  }
                  
                </Input>
                
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
      }

      {
        empDetails ? 
        <>
      <Table
        className='shadow'
        bordered
        hover
        size="sm"
      >
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
              Age
            </th>
            <th>
              Salary
            </th>
            <th>
              Designation
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {
          empDetails?.map((emp, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.age}</td>
                <td>{emp.salary}</td>
                <td>{emp.designation}</td>
                <td>
                <Button onClick={() => handleEdit(emp)} variant='primary'><EditIcon /></Button>
                  {
                    (role.includes('SUPER_ADMIN') &&
                      <>
                        <Button onClick={() => handleDelete(index + 1, emp.id, emp.roles[0].role_type)} variant='danger'><DeleteOutlineIcon /></Button>
                      </>
                    )
                  }
                </td>
              </tr>
            );
          })
        }
        </tbody>
      </Table>
      </>
      :
      <h4 style={{margin: '10rem'}}>No actions available!</h4>
      }
      {
        editActive && 
        <div>
          <h4>Edit Details of {userToEdit?.firstName}</h4>
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
                    for="exampleDesignation"
                    hidden
                  >
                    Designation
                  </Label>
                  <Input
                    id="exampleDesignation"
                    name="designation"
                    placeholder="Designation"
                    type="text"
                    value={user.designation}
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
                    for="exampleSalary"
                    hidden
                  >
                    Salary
                  </Label>
                  <Input
                    id="exampleSalary"
                    name="salary"
                    placeholder="Salary"
                    type="number"
                    min="0"
                    value={user.salary}
                    onChange={handleChange}
                  />
                </FormGroup>
                {' '}
                <FormGroup>
                  <Label
                    for="exampleEmail"
                    hidden
                  >
                    Email
                  </Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </FormGroup>
                {' '}
                {/* <FormGroup>
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
                  />
                </FormGroup>
                {' '} */}
                <Input
                  className="mb-3"
                  type="select"
                  onChange={handleOption}
                >
                  <option>
                    Select role
                  </option>
                  {
                    roles?.map((role, index) => {
                      return (
                        <option key={index}>{role.role_id}. {role.role_type}</option>
                      );
                    })
                  }
                  
                </Input>
                
                <Button variant='success' onClick={handleEditSubmit}>
                  Submit
                </Button>
              </Form>
            </Container>
        </div>
      }
    </div>
  )
}

export default UserDashboard