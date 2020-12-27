import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import axios from 'axios';

import PageTitle from "../components/common/PageTitle";
import SmallStats from "../components/common/SmallStats";
// import UsersOverview from "./../components/blog/UsersOverview";
// import UsersByDevice from "./../components/blog/UsersByDevice";
// import NewDraft from "./../components/blog/NewDraft";
// import Discussions from "./../components/blog/Discussions";
// import TopReferrals from "./../components/common/TopReferrals";



const Dashboard = ({ smallStats }) => {
  const [user, setUser] = useState([
    {
      label: "Users",
      value: '',
      percentage: "4.7%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [0]
        }
      ]
    },
  ])
  const [Matched, setMatched] = useState([
    {
      label: "Matched Couples",
      value: "29",
      percentage: "2.71%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,65,105,0.1)",
          borderColor: "rgb(255,65,105)",
          data: [0]
        }
      ]
    }
  ])
  const [report, setReport] = useState([
    {
      label: "Reports",
      value: "8,147",
      percentage: "",
      increase: null,
      decrease: null,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(255,180,0,0.1)",
          borderColor: "rgb(255,180,0)",
          data: [0]
        }
      ]
    }
  ])
  const [Blocked, setBlocked] = useState([
    {
      label: "Blocked Users",
      value: "182",
      percentage: null,
      increase: null,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(23,198,113,0.1)",
          borderColor: "rgb(23,198,113)",
          data: [0]
        }
      ]
    }
  ])
  const [post, setPost] = useState([
    {
      label: "Posts",
      value: "182",
      percentage: null,
      increase: null,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(23,198,113,0.1)",
          borderColor: "rgb(23,198,113)",
          data: [0]
        }
      ]
    }
  ])
  const [data,setData] = useState([
    {
      label: "Admins",
      value: "17,281",
      percentage: "2.4%",
      increase: false,
      decrease: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "4", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgb(0,123,255,0.1)",
          borderColor: "rgb(0,123,255)",
          data: [0]
        }
      ]
    }
  ])
const [x, sx] = useState(false)
const [listUser, setListUser] = useState([])
const [listMatched, setlistMatched] = useState([])
const [listPost, setlistPost] = useState([])
const [listReport, setlistReport] = useState([])
const [listBlocked, setlistBlocked] = useState([])
const [listBlockedd, setlistBlockeddd] = useState([])
  
const getDataUser = () => {
  const article = {};
  axios.post('http://localhost:1000/amount_User', article)
      .then(response => (
        setListUser(response.data)))}
const getDataMatched = () =>{
  const article = {};
  axios.post('http://localhost:1000/amount_matched_couple', article)
      .then(response => setlistMatched(response.data));}
const getDataPost = () =>{
  const article = {};
  axios.post('http://localhost:1000/all_post', article)
      .then(response => setlistPost(response.data));}
const getDataReport = () =>{
  const article = {};
  axios.post('http://localhost:1000/amount_report', article)
      .then(response => setlistReport(response.data));}
const getDataBlocked = () =>{
  const article = {};
  axios.post('http://localhost:1000/amount_blackList', article)
      .then(response => setlistBlocked(response.data));}
const getDataBlockedddd = () =>{
  const article = {};
  axios.post('http://localhost:1000/all_admin', article)
      .then(response => setlistBlockeddd(response.data));}

useEffect(() => {
  getDataUser()
  getDataMatched()
  getDataPost()
  getDataReport()
  getDataBlocked()
  getDataBlockedddd()
}, [])


  return(
  <Container fluid className="main-content-container px-4 bg-dark">
    {/* Page Header */}
    <Row noGutters className="page-header py-3">
      {/* <PageTitle title="Page Overview" subtitle="Dashboard" className="text-sm-left mb-3" /> */}
      {/* <span class="text-sm-left mb-3">Dashboard</span> */}
      <h3 class="page-title text-white">Overview</h3>
    </Row>

    {/* Small Stats Blocks */}
    <Row>
    {user.map((stats, idx) => (
        <Col className="col-md mb-4" key={idx} {...stats.attrs}>
          <SmallStats
            id={`small-stats-${idx}`}
            variation="1"
            chartData={stats.datasets}
            chartLabels={stats.chartLabels}
            label={stats.label}
            value={listUser.length}
            percentage={stats.percentage}
            increase={stats.increase}
            decrease={stats.decrease}
          />
        </Col>
      ))}
      {Matched.map((stats, idx) => (
        <Col className="col-md mb-4" key={idx} {...stats.attrs}>
          <SmallStats
            id={`small-stats-${idx}`}
            variation="1"
            chartData={stats.datasets}
            chartLabels={stats.chartLabels}
            label={stats.label}
            value={listMatched.length}
            percentage={stats.percentage}
            increase={stats.increase}
            decrease={stats.decrease}
          />
        </Col>
      ))}
      {report.map((stats, idx) => (
        <Col className="col-md mb-4" key={idx} {...stats.attrs}>
          <SmallStats
            id={`small-stats-${idx}`}
            variation="1"
            chartData={stats.datasets}
            chartLabels={stats.chartLabels}
            label={stats.label}
            value={listReport.length}
            percentage={stats.percentage}
            increase={stats.increase}
            decrease={stats.decrease}
          />
        </Col>
      ))}
      {post.map((stats, idx) => (
        <Col className="col-md mb-4" key={idx} {...stats.attrs}>
          <SmallStats
            id={`small-stats-${idx}`}
            variation="1"
            chartData={stats.datasets}
            chartLabels={stats.chartLabels}
            label={stats.label}
            value={listPost.length}
            percentage={stats.percentage}
            increase={stats.increase}
            decrease={stats.decrease}
          />
        </Col>
      ))}
      {data.map((stats, idx) => (
        <Col className="col-md mb-4" key={idx} {...stats.attrs}>
          <SmallStats
            id={`small-stats-${idx}`}
            variation="1"
            chartData={stats.datasets}
            chartLabels={stats.chartLabels}
            label={stats.label}
            value={listBlockedd.length}
            percentage={stats.percentage}
            increase={stats.increase}
            decrease={stats.decrease}
          />
        </Col>
      ))}
    </Row>



    <Row>
      {/* Users Overview */}
      {/* <Col lg="8" md="12" sm="12" className="mb-4">
        <UsersOverview />
      </Col> */}

      {/* Users by Device */}
      {/* <Col lg="4" md="6" sm="12" className="mb-4">
        <UsersByDevice />
      </Col> */}

      {/* New Draft */}
      {/* <Col lg="4" md="6" sm="12" className="mb-4">
        <NewDraft />
      </Col> */}

      {/* Discussions */}
      {/* <Col lg="5" md="12" sm="12" className="mb-4">
        <Discussions />
      </Col> */}

      {/* Top Referrals */}
      {/* <Col lg="3" md="12" sm="12" className="mb-4">
        <TopReferrals />
      </Col> */}
    </Row>
  </Container>
);}

Dashboard.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

Dashboard.defaultProps = {

  
  smallStats: []
};

export default Dashboard;
