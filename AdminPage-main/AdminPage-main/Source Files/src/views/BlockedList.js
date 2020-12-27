import React from "react";
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

const BlockedList = () => (
  <Container fluid className="main-content-container px-4 bg-dark">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      {/* <PageTitle sm="4" title="Blocked Users" className="text-sm-left" /> */}
      <h3 class="page-title text-white">Blocked Users</h3>
    </Row>

    {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            {/* <h6 className="m-0">Users</h6> */}
            <Button size="sm" theme="white" >
              <i className="far fa-bookmark mr-1" />
            </Button>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    User A ID
                  </th>
                  <th scope="col" className="border-0">
                    User A Name
                  </th>
                  <th scope="col" className="border-0">
                    Status
                  </th>
                  <th scope="col" className="border-0">
                    User B Name
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
                <tr>
                  <td>1</td>
                  <td>Robin</td>
                  <td>Blocked</td>
                  <td>Hoang</td>
                  <td>2</td>
                  <td>15/11/2020</td>
                  <td>
                    <Button size="sm" theme="white">
                      <i className="far fa-bookmark mr-1" />
                    </Button>
                    <Button size="sm" theme="white">
                      <i className="far fa-bookmark mr-1" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default BlockedList;