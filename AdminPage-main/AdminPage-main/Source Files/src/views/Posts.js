// const Errors = () => (
//   <Container fluid className="main-content-container px-4 pb-4">
//     <div className="error">
//       <div className="error__content">
//         <h2>500</h2>
//         <h3>Something went wrong!</h3>
//         <p>There was a problem on our end. Please try again later.</p>
//         <Button pill>&larr; Go Back</Button>
//       </div>
//     </div>
//   </Container>
// );

/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Badge,
  Button
} from "shards-react";

import PageTitle from "../components/common/PageTitle";

const Posts = () => {
  const [db, setDb] = useState([])
  const getData = () =>{
    const article = {};
    axios.post('http://localhost:1000/all_post', article)
        .then(response => setDb(response.data));}
  useEffect(() => {
    getData()
  }, [])


  const deletee = (id) =>{
    const article = {id_post: id};
    axios.post('http://localhost:1000/delete_post', article);
    document.location.reload()
  }


    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Blog Posts" subtitle="Components" className="text-sm-left" />
        </Row>

        {/* First Row of Posts */}
        <Row>
          {db.map((db, idx) => (
            <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post card-post--1">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url(${db.photo_name})` }}
                >
                  <Badge
                    pill
                    className={`card-post__category bg-${db.photo_name}`}
                  >
                    {db.name}
                  </Badge>
                </div>
                <CardBody>
                  <h5 className="card-title">
                    <a href="#" className="text-fiord-blue">
                      {db.content}
                    </a>
                  </h5>
                </CardBody>
                <button onClick={() => deletee(db.id_post)}>delete</button>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
}

export default Posts;

// import UserDetails from "../components/user-profile-lite/UserDetails";
// import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";

// const UserProfileLite = () => (
//   <Container fluid className="main-content-container px-4">
//     <Row noGutters className="page-header py-4">
//       <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
//     </Row>
//     <Row>
//       <Col lg="4">
//         <UserDetails />
//       </Col>
//       <Col lg="8">
//         <UserAccountDetails />
//       </Col>
//     </Row>
//   </Container>
// );

// import React from "react";
// import { Container, Row, Col } from "shards-react";

// import PageTitle from "../components/common/PageTitle";
// import Editor from "../components/add-new-post/Editor";
// import SidebarActions from "../components/add-new-post/SidebarActions";
// import SidebarCategories from "../components/add-new-post/SidebarCategories";

// const AddNewPost = () => (
//   <Container fluid className="main-content-container px-4 pb-4">
//     {/* Page Header */}
//     <Row noGutters className="page-header py-4">
//       <PageTitle sm="4" title="Add New Post" subtitle="Blog Posts" className="text-sm-left" />
//     </Row>

//     <Row>
//       {/* Editor */}
//       <Col lg="9" md="12">
//         <Editor />
//       </Col>

//       {/* Sidebar Widgets */}
//       <Col lg="3" md="12">
//         <SidebarActions />
//         <SidebarCategories />
//       </Col>
//     </Row>
//   </Container>
// );

// export default AddNewPost;

// import React from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardHeader,
//   ListGroup,
//   ListGroupItem,
//   Form,
//   Alert
// } from "shards-react";

// import PageTitle from "../components/common/PageTitle";
// import Colors from "../components/components-overview/Colors";
// import Checkboxes from "../components/components-overview/Checkboxes";
// import RadioButtons from "../components/components-overview/RadioButtons";
// import ToggleButtons from "../components/components-overview/ToggleButtons";
// import SmallButtons from "../components/components-overview/SmallButtons";
// import SmallOutlineButtons from "../components/components-overview/SmallOutlineButtons";
// import NormalButtons from "../components/components-overview/NormalButtons";
// import NormalOutlineButtons from "../components/components-overview/NormalOutlineButtons";
// import Forms from "../components/components-overview/Forms";
// import FormValidation from "../components/components-overview/FormValidation";
// import CompleteFormExample from "../components/components-overview/CompleteFormExample";
// import Sliders from "../components/components-overview/Sliders";
// import ProgressBars from "../components/components-overview/ProgressBars";
// import ButtonGroups from "../components/components-overview/ButtonGroups";
// import InputGroups from "../components/components-overview/InputGroups";
// import SeamlessInputGroups from "../components/components-overview/SeamlessInputGroups";
// import CustomFileUpload from "../components/components-overview/CustomFileUpload";
// import DropdownInputGroups from "../components/components-overview/DropdownInputGroups";
// import CustomSelect from "../components/components-overview/CustomSelect";

// const ComponentsOverview = () => (
//   <div>
//     <Container fluid className="px-0">
//       <Alert className="mb-0">
//         <i className="fa fa-info mx-2"></i> How you doin'? I'm just a friendly, good-looking notification message and I come in all the colors you can see below. Pretty cool, huh?
//       </Alert>
//     </Container>
//     <Container fluid className="main-content-container px-4">
//       <Row noGutters className="page-header py-4">
//         <PageTitle
//           sm="4"
//           title="Forms & Components"
//           subtitle="Overview"
//           className="text-sm-left"
//         />
//       </Row>

//       <Colors />

//       <Row>
//         <Col lg="8" className="mb-4">
//           <Card small className="mb-4">
//             <CardHeader className="border-bottom">
//               <h6 className="m-0">Form Inputs</h6>
//             </CardHeader>

//             <ListGroup flush>
//               <ListGroupItem className="p-0 px-3 pt-3">
//                 <Row>
//                   <Checkboxes />
//                   <RadioButtons />
//                   <ToggleButtons />
//                 </Row>
//               </ListGroupItem>

//               <ListGroupItem className="p-3">
//                 <strong className="text-muted d-block my-2">
//                   Small Buttons
//                 </strong>
//                 <SmallButtons />

//                 <strong className="text-muted d-block my-2">
//                   Small Outline Button
//                 </strong>
//                 <SmallOutlineButtons />
//               </ListGroupItem>

//               <ListGroupItem className="p-3">
//                 {/* Normal Buttons */}
//                 <strong className="text-muted d-block my-2">
//                   Normal Buttons
//                 </strong>
//                 <NormalButtons />

//                 {/* Normal Outline Buttons */}
//                 <strong className="text-muted d-block my-2">
//                   Normal Outline Buttons
//                 </strong>
//                 <NormalOutlineButtons />
//               </ListGroupItem>

//               {/* Forms & Form Validation */}
//               <ListGroupItem className="p-3">
//                 <Row>
//                   <Forms />
//                   <FormValidation />
//                 </Row>
//               </ListGroupItem>
//             </ListGroup>
//           </Card>

//           {/* Complete Form Example */}
//           <Card small>
//             <CardHeader className="border-bottom">
//               <h6 className="m-0">Form Example</h6>
//             </CardHeader>
//             <CompleteFormExample />
//           </Card>
//         </Col>

//         <Col lg="4" className="mb-4">
//           {/* Sliders & Progress Bars */}
//           <Card small className="mb-4">
//             <CardHeader className="border-bottom">
//               <h6 className="m-0">Sliders & Progress Bars</h6>
//             </CardHeader>
//             <ListGroup flush>
//               <ProgressBars />
//               <Sliders />
//             </ListGroup>
//           </Card>

//           {/* Groups */}
//           <Card small className="mb-4">
//             <CardHeader className="border-bottom">
//               <h6 className="m-0">Groups</h6>
//             </CardHeader>

//             <ListGroup flush>
//               <ListGroupItem className="px-3">
//                 <Form>
//                   <strong className="text-muted d-block mb-3">
//                     Button Groups
//                   </strong>
//                   <ButtonGroups />

//                   <strong className="text-muted d-block mb-2">
//                     Input Groups
//                   </strong>
//                   <InputGroups />

//                   <strong className="text-muted d-block mb-2">
//                     Seamless Input Groups
//                   </strong>
//                   <SeamlessInputGroups />
//                 </Form>
//               </ListGroupItem>
//             </ListGroup>
//           </Card>

//           <Card small>
//             {/* Files & Dropdowns */}
//             <CardHeader className="border-bottom">
//               <h6 className="m-0">Files & Dropdowns</h6>
//             </CardHeader>

//             <ListGroup flush>
//               <ListGroupItem className="px-3">
//                 <strong className="text-muted d-block mb-2">
//                   Custom File Upload
//                 </strong>
//                 <CustomFileUpload />

//                 <strong className="text-muted d-block mb-2">
//                   Dropdown Input Groups
//                 </strong>
//                 <DropdownInputGroups />

//                 <strong className="text-muted d-block mb-2">
//                   Custom Select
//                 </strong>
//                 <CustomSelect />
//               </ListGroupItem>
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   </div>
// );

// export default ComponentsOverview;