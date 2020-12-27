import React, { useState } from "react";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardHeader, 
  CardBody, 
  Button 
} from "shards-react";
import axios from 'axios';
import PageTitle from "../components/common/PageTitle";

const AdminList = () => {


  const [x, sx] = useState(true)
  const [data,setData] = useState([])
  const getData = () =>{
    const article = {};
    axios.post('http://localhost:1000/all_admin', article)
        .then(response => setData(response.data));}
  //       getData()
  // console.log('amount_User',amount_User)
  if(x){
    getData()
    sx(false)
  }


  return(
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Admin List" className="text-sm-left" />
    </Row>

    {/* Default Dark Table */}
    <Row>
      <Col>
        <Card small className="mb-4 overflow-hidden">
          <CardHeader className="bg-dark">
            <div>
              {/* <h6 className="col-m-4 text-white">Active Admins</h6> */}
              <Button size="col-sm-4" theme="white">
                <i className="far fa-bookmark mr-1" />
              </Button>
            </div>
          </CardHeader>
          <CardBody className="bg-dark p-0 pb-3">
            <table className="table table-dark mb-0">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" className="border-0">
                    Admin ID
                  </th>
                  <th scope="col" className="border-0">
                    Admin Name
                  </th>
                  <th scope="col" className="border-0">
                    Full Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((db) => (
                  <tr>
                    <td>{db.id}</td>
                    <td>{db.admin_name}</td>
                    <td>{db.fullname}</td>
                </tr>
                ))}
              </tbody>
            </table>
            
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);}

export default AdminList;
