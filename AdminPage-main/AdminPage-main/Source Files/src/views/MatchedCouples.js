import React, { useState, useEffect } from "react";
import axios from 'axios';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardHeader, 
  CardBody, 
  Button 
} from "shards-react";

import PageTitle from "../components/common/PageTitle";

const MatchedCouples = () => {
  const [db, setDb] = useState([])
  const getData = () =>{
    const article = {};
    axios.post('http://localhost:1000/amount_matched_couple', article)
        .then(response => setDb(response.data));}
  useEffect(() => {
    getData()
  }, [])

  const [id1, setId1] = useState('')
  const [id2, setId2] = useState('')
  const add = () =>{
    const article = {req_user_id : id1, res_user_id : id2};
    axios.post('http://localhost:1000/add_matching', article);
    document.location.reload()}
    const deletem = (req_user_id ,res_user_id) =>{
      const article = {req_user_id : req_user_id, res_user_id : res_user_id};
      axios.post('http://localhost:1000/delete_matching', article);
    document.location.reload()}





  return(
  <Container fluid className="main-content-container px-4 bg-dark">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      {/* <PageTitle sm="4" title="Matched Couples" className="text-sm-left" /> */}
      <h3 class="page-title text-white">Matched Couples</h3>
    </Row>

    {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            {/* <h6 className="m-0">Users</h6> */}
            <input placeholder="id1" onChange={(e) => setId1(e.target.value)}/>
            <input placeholder="id2" onChange={(e) => setId2(e.target.value)}/>
            <button onClick={add}>
                add
            </button>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    User A ID
                  </th>
                  <th scope="col" className="border-0">
                    User B ID
                  </th>
                  <th scope="col" className="border-0">
                    Updated Date
                  </th>
                  <th scope="col" className="border-0">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {db.map((x) => (
                  <tr>
                  <td>{x.req_user_id}</td>
                  <td>{x.res_user_id}</td>
                  <td>{x.updatedAt}</td>
                  <td>
                    <button onClick={() => deletem(x.req_user_id,x.res_user_id)}>
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
)};

export default MatchedCouples;