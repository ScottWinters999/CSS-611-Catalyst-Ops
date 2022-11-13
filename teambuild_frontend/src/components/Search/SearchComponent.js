// import styled from "styled-components";
// import MainContainer from "../layout/MainContainer";
import UserInfoComponent from "./UserInfoComponent";
import { AiOutlinePlus } from "react-icons/ai";
import { useHttpClient } from '../../hooks/http-hook'

import { IoDiamond } from "react-icons/io5";
import ScrollToBottom from "react-scroll-to-bottom";
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import TablePagination from '@mui/material/TablePagination';

import classes from "./Search.module.css";

import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MainContainer from '../layout/MainContainer';
// import classes from "./ProfileViews.module.css";
// import ProfileViewsCard from './ProfileViewsCard';
import ProfileViews from './ProfileViews';
import UserContext from '../../shared/context/user-context';

// const UserDashboardWrapper = styled.div`
//   height: 50vh;
//   width: 100%;
//   background-color: white;
//   border-radius: 20px;
//   padding: 18px 16px;
//   margin-left: 4px;
//   display: flex;
//   flex-direction: column;
  
//   font-family: 'Inter';
//   font-style: normal;
//   font-weight: 600;
//   font-size: 16px;
//   line-height: 29px;
//   @media (max-width: 1200px) {
//     height: fit-content;
//   }

//   @media (max-height: 1100px) {
//     height: fit-content;
//   }
  
// `;
// const SectionOne = styled.div`
//   height: 8%;
//   padding: 12px 8px;
//   display: flex;
//   justify-content: flex-end;
//   @media (max-height: 1200px) {
//     height: 60px;
//   }
// `;
// const SectionTwo = styled.div`
//   height: 80%;
//   padding: 12px 8px;
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   margin: 12px 0px;
//   width:100%
//   @media (max-width: 1200px) {
//     display: grid;
//     margin: 12px 0px;
//     // flex-direction: column;

//     flex-direction: column;
//     columns:2;
//     align-content: center;
//     align-items: center;
//   }
// `;
// const SectionThree = styled.div`
//   height: 40%;
//   padding: 12px 8px;
//   display: flex;
//   flex-direction: row;

//   @media (max-width: 1200px) {
//     display: flex;

//     flex-direction: column;
//     align-items: center;
//   }
// `;

// const SectionTwoInnerWrapper = styled.div`
//   display: flex;
//   //   justify-content: flex-end;
//   width: 100%;
//   justify-content: center;
//   padding: 26px 24px;
//   height: 80%;
//   @media (max-width: 1200px) {
//     width: 80%;
//   }

//   @media (max-width: 760px) {
//     width: 100%;
//   }
// `;

// const SkillWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   //   width: 100%;
//   width: 60%;
//   @media (max-width: 1200px) {
//     width: 70%;
//   }

//   @media (max-width: 760px) {
//     width: 100%;
//   }
// `;

// const SectionThreeInnerWrapper = styled.div`
//   display: flex;
//   //   justify-content: flex-end;
//   width: 50%;
//   justify-content: center;
//   padding: 26px 24px;
//   @media (max-width: 1100px) {
//     width: 90%;
//   }
// `;

// const AddGoalButton = styled.button`
//   width: 100%;
//   box-shadow: 0 2px 8px rgb(0 0 0 / 20%);
//   background: white;
//   border-radius: 6px;
//   border: none;
//   height: 70%;
//   cursor: pointer;
//   color: blue;
//   font-weight: 500;
//   font-family: "Roboto";
//   font-size: 16px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   &:hover {
//     background: #fdf0f0;
//   }
// `;

// const AddGoalButtonWrapper = styled.div`
//   width: 26%;
//   height: 20%;
//   display: flex;
//   align-items: center;
//   @media (max-width: 1200px) {
//     width: 100%;
//     height: 70px;
//   }
// `;

// const PremiumD = styled.div`
// @media (max-width: 1200px) 
//   // width: 100%;
//   height: 35px;

// `

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const UserSearchComponent = () => {

  const { isLoading, error, sendRequest ,clearError} = useHttpClient();
  const [userMatches, setUserMatches] = useState();

  const [userMatchesToRender, setUserMatchesToRender] = useState();
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rowLength, setRowLength] = React.useState();

  const token = JSON.parse(localStorage.getItem('userData'))
  const name = JSON.parse(localStorage.getItem('firstName'))
  console.log(token)
  const authorization = "Bearer "+token.token
  console.log(authorization)
  // const user
  const headers = {
    authorization: 'Bearer ' + token.token
}; 

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};

useEffect(() => {
  let temp=[]
  if (userMatches){
    const perPage = rowsPerPage
    let currLength = userMatches.length
    let pages = Math.ceil(currLength/perPage)
    let left=page*perPage
    let right=(page*perPage)+rowsPerPage
    temp=userMatches.slice(left,right);
  }
  console.log(temp)
  setUserMatchesToRender(temp);
}
,[userMatches, rowsPerPage, page])

  useEffect(() => {

    const userInfo = async () => {
      try {
        
        fetch("http://localhost:5000/api/usermatch",{headers:headers}).then(res =>{
            // console.log(res.matchedData)
          return res
        }).then((res) =>{
          console.log(res)
        //   setUserMatches(res.userData)
        return res.json()
        })
        .then((res) =>{
            console.log(res,"single full")

            let reqData = []
            const  currentUserMatches = res.matchedData
            currentUserMatches.map((i,key) =>{

                let temp = {}
                temp ={
                    "userid":i?.goalData[2]?.userUserId,                    
                    "firstname":i?.goalData[2]?.firstName,
                    "lastname":i?.goalData[2]?.lastName,                    
                    "email":i?.goalData[2]?.email,
                    "industry":i?.goalData[2]?.industry,
                    "city":i?.goalData[0]?.city,
                    "state":i?.goalData[0]?.state,
                    "country":i?.goalData[0]?.country,
                    "positionid":i?.goalData[1]?.positionId,
                    "skillset":i?.goalData[0]?.skills,
                    "goalComponent":i?.goalData[0]?.goalcomponent,
                    "parentgoal":i?.goalData[0]?.parentgoalName,
                    "goalMatchedId":i?.goalData[0]?.parentgoalId,
                    "goalExperience":i?.goalData[0]?.experience,
                    // "skillsetId":i?.skillset[3]["SkillSetId"],
                    "goalcomponentid":i?.goalData[0]?.goalcomponentId
                }
                console.log(temp,"single")
                reqData.push(temp)
            })

            setUserMatches(reqData)
            console.log(reqData,"single user matches")
        })
        // responseData.t
        // responseData./
        // console.log(responseData,'aa')
        // setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    userInfo();
    
    // console.log(userMatches)
  }, []);

  const deleteMatchHandler = (idx)=>{

    // const goalMatchedId
    // = userMatches[idx].goalMatchedId
    // const userId
    // = userMatches[idx].userid
    // let temp = userMatches
    // temp.splice(idx,1)
    // console.log(temp)
    // setUserMatches()
    setUserMatches(prev => prev.filter((el, i) => i !== idx))
    
    // console.log(userId)
    // setUserMatches((prev) => prev.filter((match) => 
        // match.goalMatchedId !== goalMatchedId && match.userId !== goalMatchedId))
  }
  // if(userMatches){
  //   // console.log(userMatches)

  //   let c = 'Fr'
  //   userMatches.map((user,idx) =>{

  //     console.log(user)
  //     if ("skillset" in user){
  //       console.log(user?.skillset[0],'skilaa')
        
  //       let k = user?.skillset[0].map((ss) =>{
          
  //         return ss.includes(c)
  //       })
  //       console.log(k)
  //     }

  //   })
  // }

//   const userData = {
//     basicUserInfo: {
//       userName: userMatches?userMatches.firstName:'',
//       location: userMatches?userMatches.location:'',
//       phone: userMatches?userMatches.phone:'',
//       email: userMatches?userMatches.email:'',
//       industry: userMatches?userMatches.industry:'',
//     },
//     skillSet: {
//       header: "Skillset",
//       items: ["python", "java", "c++"],
//     },
//     goals: [
//       {
//         teamName: "Alpha",
//         matchedWith: "Software",
//         status: "Incomplete",
//       },
//       {
//         teamName: "Beta",
//         matchedWith: "CEO",
//         status: "Complete",
//       },
//       {
//         teamName: "Alpha",
//         matchedWith: "Finance",
//         status: "Incomplete",
//       },
//     ],
//   };
//   console.log(userData);

//   return (
//       <div style={{"width":"80%"}}>
//           <ScrollToBottom style={{width:"160%"}}>
//     <UserDashboardWrapper>
      
//       <SectionOne>
//         {/* {userData.basicUserInfo.userType && ( */}
//           <div>
//             <IoDiamond style={{ height: "100%", width: "100%" ,color:"#264fc0"}} />
//             Hi {name} , Please find your potential matches
//           </div>
//         {/* )} */}
//       </SectionOne>
//       <SectionTwo>
//           { userMatches && (
//               userMatches.map((singleUser,idx) => (
//                 <SectionTwoInnerWrapper key={idx}> 
//                     <Link to='/userdashboard'>
//                         <UserInfoComponent userData={singleUser} />
//                     </Link>
//                 </SectionTwoInnerWrapper>
//               )))
//           }
        
//       </SectionTwo> 
    
//     </UserDashboardWrapper>
// </ScrollToBottom>
//       </div>
    
//   );
if(userMatches){
  console.log(userMatches)

}

const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(ProfileViews.userContents);
 
  const filterColumns = ["industry", "city", "state", "country", "skills", "experience"];
 
  // handle change event of search input
  const handleChange = value => {
    setSearchText(value);
    filterData(value);
  };
 
  // filter records by search text
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData(dataList);
    else {
      const filteredData = dataList.filter(item => {
        return Object.keys(item).some(key =>
          filterColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setData(filteredData);
    }
  }
  

return (
  <React.Fragment>
    <MainContainer>
    <header className={classes.Header}>Hi {name},Find your potential matches</header>
    <div className={classes.TableWrapper}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid     
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {userMatches &&(userMatches.map((singleUser, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item style={{"borderRadius": "16px"}}><UserInfoComponent userData={singleUser} /></Item>
            <div className="wrapper">
                  <ul className="card-grid">
                      {items.map((item) => (
                          <li>
                              <article className="card" key={item.callingCodes}>
                                  <div className="card-image">
                                      <img src={item.flag} alt={item.name} />
                                  </div>
                                  <div className="card-content">
                                      <h2 className="card-name">{item.name}</h2>
                                      <ol className="card-list">
                                          <li>
                                            /* <button type="button">Industry</button> */
                                              Industry: <span>{item.industry}</span>
                                          </li>
                                          <li>
                                          /* <button type="button">City</button> */
                                              City: <span>{item.city}</span>
                                          </li>
                                          <li>
                                          /* <button type="button">State</button> */
                                              State: <span>{item.state}</span>
                                          </li>
                                          <li>
                                          /* <button type="button">Country</button> */
                                              Country: <span>{item.country}</span>
                                          </li>
                                          <li>
                                          /* <button type="button">Skills</button> */
                                              Skills: <span>{item.skills}</span>
                                          </li>
                                          <li>
                                          /* <button type="button">Experience</button> */
                                              Experience: <span>{item.experience}</span>
                                          </li>
                                      </ol>
                                  </div>
                              </article>
                          </li>
                      ))}
                  </ul>
              </div>
          </Grid>
        )))}
        {userMatchesToRender &&(userMatchesToRender.map((singleUser, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item style={{"borderRadius": "16px"}}><UserInfoComponent userData={singleUser} idx={index} deleteSingleMatch={deleteMatchHandler} /></Item>
          </Grid>
        )))}
      </Grid>

      {/* <DataGrid
        rows={userMatches}
        // columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]} */}
      {/* /> */}

      {userMatches && userMatches.length && (
            <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={userMatches.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
      )}
      
    </Box>
    
    </div>
   

    </MainContainer>

   
  </React.Fragment>
);

};

export default UserSearchComponent;
