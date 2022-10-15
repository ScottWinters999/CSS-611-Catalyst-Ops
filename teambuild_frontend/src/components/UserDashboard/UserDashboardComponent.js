import styled from "styled-components";
import MainContainer from "../layout/MainContainer";
import UserInfoComponent from "./UserInfoComponent";
import UserSkillComponent from "./UserSkillComponent";
import { AiOutlinePlus } from "react-icons/ai";
import UserGoalComponent from "./UserGoalComponent";
const UserDashboardWrapper = styled.div`
  //   height: 90vh;
  width: 80%;
  background-color: white;
  border-radius: 20px;
  padding: 18px 16px;
  margin-left: 4px;
  display: flex;
  flex-direction: column;
`;
const SectionOne = styled.div`
  height: 5%;
  padding: 12px 8px;
  display: flex;
  justify-content: flex-end;
`;
const SectionTwo = styled.div`
  height: 55%;
  padding: 12px 8px;
  display: flex;
  margin: 12px 0px;
`;
const SectionThree = styled.div`
  height: 40%;
  padding: 12px 8px;
  display: flex;
  flex-direction: row;
`;

const SectionTwoInnerWrapper = styled.div`
  display: flex;
  //   justify-content: flex-end;
  width: 50%;
  justify-content: center;
  padding: 26px 24px;
`;

const SkillWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //   width: 100%;
  width: 66%;
`;

const SectionThreeInnerWrapper = styled.div`
  display: flex;
  //   justify-content: flex-end;
  width: 50%;
  justify-content: center;
  padding: 26px 24px;
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
`;

const UserDashboardComponent = () => {
  const skillSet = {
    header: "Skillset",
    items: ["python", "java", "c++"],
  };

  const experience = {
    header: "Experience",
    items: ["Java developer", "python developer", "Devops"],
  };
  return (
    <UserDashboardWrapper>
      <SectionOne>sadsad</SectionOne>
      <SectionTwo>
        <SectionTwoInnerWrapper>
          <UserInfoComponent />
        </SectionTwoInnerWrapper>
        <SectionTwoInnerWrapper>
          <SkillWrapper>
            <UserSkillComponent data={skillSet} />
            <UserSkillComponent data={experience} />
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
          <UserGoalComponent />
        </SectionThreeInnerWrapper>
      </SectionThree>
    </UserDashboardWrapper>
  );
};

export default UserDashboardComponent;
