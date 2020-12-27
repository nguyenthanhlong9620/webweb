import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  ButtonToolbar
} from "shards-react";
import axios from 'axios';
import PageTitle from "../components/common/PageTitle";

const UserList = () => {
  const [dataUser, setDataUser] = useState([])
  const [x, sx] = useState(true)

  const getData = () =>{
    const article = {};
    axios.post('http://localhost:1000/amount_User', article)
        .then(response => setDataUser(response.data));}
  //       getData()
  // console.log('amount_User',amount_User)
  if(x){
    getData()
    sx(false)
  }

  const deleteUser = (id) =>{
    const article = {id: id};
    axios.post('http://localhost:1000/delete_user', article);
    document.location.reload()
  }
  const xxx = (db) =>{
    console.log(db)
  }


  return (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Users" className="text-sm-left" />
    </Row>

    {/* Default Dark Table */}
    <Row>
      <Col>
        <Card small className="mb-4 overflow-hidden">
          <CardHeader className="bg-dark">
            {/* <h6 className="m-0">Users</h6> */}
          </CardHeader>
          <CardBody className="bg-dark p-0 pb-3">
            <table className="table table-dark mb-0">
              <thead className="bg-dark">
                <tr>
                  <th scope="col" className="border-0">
                    User ID
                  </th>
                  <th scope="col" className="border-0">
                    Email
                  </th>
                  <th scope="col" className="border-0">
                    Full Name
                  </th>
                  <th scope="col" className="border-0">
                    Age
                  </th>
                  <th scope="col" className="border-0">
                    Sex
                  </th>
                  <th scope="col" className="border-0">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                
                  {dataUser.map((db) => (<tr>
                  <td>{db.id}</td>
                  <td>{db.email}</td>
                  <td>{db.name}</td>
                  <td>{db.age}</td>
                  <td>{db.sex}</td>
                  <td>
                    <button onClick={() => deleteUser(db.id)}>
                      Delete
                    </button>
                  </td>
                  </tr>))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);}

export default UserList;