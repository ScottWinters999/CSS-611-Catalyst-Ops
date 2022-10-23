import styled from "styled-components";
import MainContainer from "../layout/MainContainer";
import UserInfoComponent from "./UserInfoComponent";
import UserSkillComponent from "./UserSkillComponent";
import { AiOutlinePlus } from "react-icons/ai";
import UserGoalComponent from "./UserGoalComponent";
import { useHttpClient } from '../../hooks/http-hook'

import { IoDiamond } from "react-icons/io5";
import ScrollToBottom from "react-scroll-to-bottom";
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";

const UserDashboardWrapper = styled.div`
  height: 90vh;
  width: 80%;
  background-color: white;
  border-radius: 20px;
  padding: 18px 16px;
  margin-left: 4px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1200px) {
    height: fit-content;
  }

  @media (max-height: 1100px) {
    height: fit-content;
  }
  
`;
const SectionOne = styled.div`
  height: 8%;
  padding: 12px 8px;
  display: flex;
  justify-content: flex-end;
  @media (max-height: 1200px) {
    height: 60px;
  }
`;
const SectionTwo = styled.div`
  height: 52%;
  padding: 12px 8px;
  display: flex;
  margin: 12px 0px;
  @media (max-width: 1200px) {
    display: flex;
    margin: 12px 0px;
    // flex-direction: column;

    flex-direction: column;
    align-content: center;
    align-items: center;
  }
`;
const SectionThree = styled.div`
  height: 40%;
  padding: 12px 8px;
  display: flex;
  flex-direction: row;

  @media (max-width: 1200px) {
    display: flex;

    flex-direction: column;
    align-items: center;
  }
`;

const SectionTwoInnerWrapper = styled.div`
  display: flex;
  //   justify-content: flex-end;
  width: 50%;
  justify-content: center;
  padding: 26px 24px;
  height: 80%;
  @media (max-width: 1200px) {
    width: 80%;
  }

  @media (max-width: 760px) {
    width: 100%;
  }
`;

const SkillWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //   width: 100%;
  width: 60%;
  @media (max-width: 1200px) {
    width: 70%;
  }

  @media (max-width: 760px) {
    width: 100%;
  }
`;

const SectionThreeInnerWrapper = styled.div`
  display: flex;
  //   justify-content: flex-end;
  width: 50%;
  justify-content: center;
  padding: 26px 24px;
  @media (max-width: 1100px) {
    width: 90%;
  }
`;

const AddGoalButton = styled.button`
  width: 100%;
  box-shadow: 0 2px 8px rgb(0 0 0 / 20%);
  background: white;
  border-radius: 6px;
  border: none;
  height: 70%;
  cursor: pointer;
  color: blue;
  font-weight: 500;
  font-family: "Roboto";
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #fdf0f0;
  }
`;

const AddGoalButtonWrapper = styled.div`
  width: 26%;
  height: 20%;
  display: flex;
  align-items: center;
  @media (max-width: 1200px) {
    width: 100%;
    height: 70px;
  }
`;

// const PremiumD = styled.div`
// @media (max-width: 1200px) 
//   // width: 100%;
//   height: 35px;

// `

const UserDashboardComponent = () => {

  const { isLoading, error, sendRequest ,clearError} = useHttpClient();
  const [loadedUserInfo, setLoadedUserInfo] = useState();
  const token = JSON.parse(localStorage.getItem('userData'))
  console.log(token)
  const authorization = "Bearer "+token.token
  console.log(authorization)
  // const user

  // useEffect(() => {

  //   const userInfo = async () => {
  //     try {
  //       const headers = {
  //         authorization: 'Bearer ' + token.token
  //     };
  //       fetch("http://localhost:5000/api/userprofile",{headers:headers}).then(res =>{
  //         return res.json()
  //       }).then((res) =>{
  //         console.log(res)
  //         setLoadedUserInfo(res.userData)
  //       })
  //       // responseData.t
  //       // responseData./
  //       // console.log(responseData,'aa')
  //       // setLoadedPlaces(responseData.places);
  //     } catch (err) {}
  //   };
  //   userInfo();
  // }, [sendRequest,authorization]);

  // console.log(loadedUserInfo)
  const userData = {
    basicUserInfo: {
      userName: "loadedUserInfo.firstName",
      location: "loadedUserInfo.location",
      currentPosition: "loadedUserInfo.currentPosition",
      phone: "loadedUserInfo.phone",
      email: "loadedUserInfo.email",
      industry: "loadedUserInfo.industry",
      userType: "premium",
    },
    experience: {
      header: "Experience",
      items: ["Java developer", "python developer", "Devops"],
    },
    skillSet: {
      header: "Skillset",
      items: ["python", "java", "c++"],
    },
    goals: [
      {
        teamName: "Alpha",
        matchedWith: "Software",
        status: "Incomplete",
      },
      {
        teamName: "Beta",
        matchedWith: "CEO",
        status: "Complete",
      },
      {
        teamName: "Alpha",
        matchedWith: "Finance",
        status: "Incomplete",
      },
    ],
  };
  console.log(userData);

  return (
    // <ScrollToBottom>
    <UserDashboardWrapper>
      
      <SectionOne>
        {userData.basicUserInfo.userType && (
          <div>
            <IoDiamond style={{ height: "100%", width: "100%" ,color:"#264fc0"}} />
          </div>
        )}
      </SectionOne>
      <SectionTwo>
        <SectionTwoInnerWrapper>
          <UserInfoComponent userData={userData.basicUserInfo} />
        </SectionTwoInnerWrapper>
        <SectionTwoInnerWrapper>
          <SkillWrapper>
            <UserSkillComponent data={userData.skillSet} />
            <UserSkillComponent data={userData.experience} />
          </SkillWrapper>
        </SectionTwoInnerWrapper>
      </SectionTwo>
      <SectionThree>
        <SectionThreeInnerWrapper>
          <AddGoalButtonWrapper>
            <AddGoalButton>
              Add Goal
              <AiOutlinePlus />
            </AddGoalButton>
          </AddGoalButtonWrapper>
        </SectionThreeInnerWrapper>
        <SectionThreeInnerWrapper>
          <UserGoalComponent data={userData.goals} />
        </SectionThreeInnerWrapper>
      </SectionThree>
      
    </UserDashboardWrapper>

  );
};

export default UserDashboardComponent;
