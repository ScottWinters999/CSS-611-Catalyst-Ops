import styled from "styled-components";
import MainContainer from "../layout/MainContainer";
import UserInfoComponent from "./UserInfoComponent";
import UserSkillComponent from "./UserSkillComponent";
import { AiOutlinePlus } from "react-icons/ai";
import UserGoalComponent from "./UserGoalComponent";
import { useHttpClient } from "../../hooks/http-hook";

import { IoDiamond } from "react-icons/io5";
import ScrollToBottom from "react-scroll-to-bottom";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../shared/context/user-context";
// const
const UserDashboardWrapper = styled.div`
  height: 100vh;
  width: 80%;
  background-color: white;
  border-radius: 20px;
  padding: 18px 16px;
  // margin-left: 4px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1200px) {
    height: fit-content;
  }

  @media (max-height: 1100px) {
    height: "90%";
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
const SectionTwoLeft = styled.div`
  // height: 100%;
  flex-direction: column;
  width: 50%;
  padding: 12px 8px;
  display: flex;
  // margin: 12px 0px;
  @media (max-width: 1200px) {
    display: flex;
    margin: 12px 0px;
    // flex-direction: column;
    width: 100%;
    flex-direction: column;
    align-content: center;
    align-items: center;
  }
`;
const SectionTwoRight = styled.div`
  // height: 100%;
  width: 50%;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1200px) {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;

const SectionTwoLeftInnerWrapper = styled.div`
  display: flex;
  //   justify-content: flex-end;
  width: 94%;
  justify-content: center;
  padding: 6px 24px;
  height: 80%;
  @media (max-width: 1200px) {
    width: 80%;
  }
  @media (max-height: 1200px) {
    height: 50%;
  }

  @media (max-width: 760px) {
    width: 100%;
  }
`;

const SkillWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //   width: 100%;
  // width: 100%;
  @media (max-width: 1200px) {
    width: 70%;
  }

  @media (max-width: 760px) {
    width: 100%;
  }
`;

const SectionTwoRightInnerWrapper = styled.div`
  display: flex;
  height: 90%;
  //   justify-content: flex-end;
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

const SectionTwoOuter = styled.div`
  display: flex;

  height: 100%;
  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

// const PremiumD = styled.div`
// @media (max-width: 1200px)
//   // width: 100%;
//   height: 35px;

// `

const UserDashboardComponent = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUserInfo, setLoadedUserInfo] = useState();
  const token = JSON.parse(localStorage.getItem("userData"));
  const authorization = "Bearer " + token.token;
  const userCtx = useContext(UserContext);
  // const user
  const headers = {
    authorization: "Bearer " + token.token,
  };
  useEffect(() => {
    const userInfo = async () => {
      try {
        fetch("http://localhost:5000/api/userprofile", { headers: headers })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            console.log(res.userData);
            setLoadedUserInfo(res.userData);
          });
      } catch (err) {}
    };
    console.log(loadedUserInfo)
    userInfo();
  }, [sendRequest, authorization]);

  useEffect(() => {
    if (loadedUserInfo) {
      if (loadedUserInfo.firstName.length > 0) {
        userCtx.onSetUserName(loadedUserInfo.firstName);
      }
      // if (loadedUserInfo.location.length > 0) {
      //   userCtx.onSetLocation(loadedUserInfo.location);
      // }
      if (loadedUserInfo.email.length > 0) {
        userCtx.onSetEmail(loadedUserInfo.email);
      }
    }
  }, [loadedUserInfo]);
  // console.log(loadedUserInfo)
  if (loadedUserInfo) {
    localStorage.setItem("firstName", JSON.stringify(loadedUserInfo.firstName));
    // userCtx.onSetUserName('aa')
    // console.log(userCtx.userName.length,'leng')
  }
  const userData = {
    basicUserInfo: {
      firstName: loadedUserInfo ? loadedUserInfo.firstName : "",
      lastName: loadedUserInfo ? loadedUserInfo.lastName : "",
      city : loadedUserInfo ? loadedUserInfo.city : "",
      state : loadedUserInfo ? loadedUserInfo.state : "",
      country : loadedUserInfo ? loadedUserInfo.country : "",
      currentPosition: loadedUserInfo ? loadedUserInfo.currentPosition : "",
      phone: loadedUserInfo ? loadedUserInfo.phone : "",
      email: loadedUserInfo ? loadedUserInfo.email : "",
      industry: loadedUserInfo ? loadedUserInfo.industry : "",
      userType: "premium",
    },
    // skillsets: {
    //   header: "Skillset",
    //   items: [
    //     {
    //       skillset: "Frontend",
    //       experience: "3 years",
    //     },
    //     {
    //       skillset: "Backend",
    //       experience: "3 years",
    //     },
    //     {
    //       skillset: "Devops",
    //       experience: "3 years",
    //     },
    //     {
    //       skillset: "Frontend",
    //       experience: "3 years",
    //     },
    //     {
    //       skillset: "Backend",
    //       experience: "3 years",
    //     },
    //     {
    //       skillset: "Devops",
    //       experience: "3 years",
    //     }
    //   ],
    // },

    // goals: [
    //   {
    //     teamName: "Alpha",
    //     matchedWith: "Software",
    //     status: "Incomplete",
    //   },
    //   {
    //     teamName: "Beta",
    //     matchedWith: "CEO",
    //     status: "Complete",
    //   },
    //   {
    //     teamName: "Alpha",
    //     matchedWith: "Finance",
    //     status: "Incomplete",
    //   },
    //   {
    //     teamName: "Beta",
    //     matchedWith: "CEO",
    //     status: "Complete",
    //   },
    //   {
    //     teamName: "Alpha",
    //     matchedWith: "Finance",
    //     status: "Incomplete",
    //   },
    //   {
    //     teamName: "Alpha",
    //     matchedWith: "Finance",
    //     status: "Incomplete",
    //   },
    //   {
    //     teamName: "Beta",
    //     matchedWith: "CEO",
    //     status: "Complete",
    //   },
    //   {
    //     teamName: "Alpha",
    //     matchedWith: "Finance",
    //     status: "Incomplete",
    //   },
    // ],
  };
  console.log(loadedUserInfo?.goal, "ll");
  

  return (
    // <ScrollToBottom>
    // <UserDashboardWrapper>
    <MainContainer>
      <SectionOne>
        {userData.basicUserInfo.userType && (
          <div>
            <IoDiamond
              style={{ height: "100%", width: "100%", color: "#264fc0" }}
            />
          </div>
        )}
      </SectionOne>
      <SectionTwoOuter>
        <SectionTwoLeft>
          <SectionTwoLeftInnerWrapper>
            <UserInfoComponent userData={userData.basicUserInfo} />
          </SectionTwoLeftInnerWrapper>
          <SectionTwoLeftInnerWrapper>
            {/* <SkillWrapper> */}
            <UserSkillComponent
              title="Skillset"
              data={loadedUserInfo?.position}
            />
            {/* <UserSkillComponent data={userData.experience} /> */}
            {/* </SkillWrapper> */}
          </SectionTwoLeftInnerWrapper>
        </SectionTwoLeft>
        <SectionTwoRight>
          <SectionTwoRightInnerWrapper>
            <UserGoalComponent data={loadedUserInfo?.goal} />
          </SectionTwoRightInnerWrapper>
        </SectionTwoRight>
      </SectionTwoOuter>
    </MainContainer>
    // </UserDashboardWrapper>
  );
};

export default UserDashboardComponent;
