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

const ReportTable = () => {
  const [dataRp, setDataRp] = useState([])
  const [x, sx] = useState(true)

  const getData = () =>{
    const article = {};
    axios.post('http://localhost:1000/amount_report', article)
        .then(response => setDataRp(response.data));}
  //       getData()
  // console.log('amount_User',amount_User)
  if(x){
    getData()
    sx(false)
  }
  const deleteReport = (id) =>{
    const article = {id: id};
    axios.post('http://localhost:1000/delete_report', article);
    document.location.reload()
  }
  return(
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Reports" className="text-sm-left" />
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
                    Report ID
                  </th>
                  <th scope="col" className="border-0">
                    Reporter ID
                  </th>
                  <th scope="col" className="border-0">
                    Reported ID
                  </th>
                  <th scope="col" className="border-0">
                    Reported User Name
                  </th>
                  <th scope="col" className="border-0">
                    Report Content
                  </th>
                  <th scope="col" className="border-0">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataRp.map((db) => (
                  <tr>
                  <td>{db.id}</td>
                  <td>{db.req_user_id}</td>
                  <td>{db.reported_user_id}</td>
                  <td>{db.name}</td>
                  <td>{db.content}</td>
                  <td>
                    <button onClick={() => deleteReport(db.id)}>
                      delete
                    </button>
                  </td>
                  
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

export default ReportTable;