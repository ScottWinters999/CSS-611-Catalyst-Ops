import styled from "styled-components";
import { useForm } from "../../hooks/form-hook";
import ImageUpload from "./imageUpload/ImageUpload";
import Card from "../UI/Card";

const UserInfoOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 20px 24px;
  @media (max-width: 1200px) {
    padding: 20px 16px;
    
 
  }
  
`;
const UserNameContainer = styled.div`
  display: flex;
  height: 20%;
  flex-direction: row;
`;

const UserProfilePhotoWrapper = styled.div`
width: 50%;
display: flex;
align-items: flex-end;
`;

const UserProfileNameOutsideWrapper = styled.div`
  width: 60%;
`;

const UserProfileNameInsideWrapper = styled.div`
  color: blue;
  font-weight: 500;
  font-family: "Roboto";
  font-size: 3rem;

  
`;

const Hr = styled.hr`
  size: 8;
  width: 100%;
  color: #bcbcbc;
`;

const UserProfileLocationWrapper = styled.div`
  color: #c8c3c3;
`;

const UserProfileInfoWrapper = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  padding: 4px 26px;
  @media (max-width: 1200px) {
    padding: 4px 4px;
    
 
  }
`;

const UserProfileInfoBulletinWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  font-family: "Roboto";
  font-weight: 500;
  flex-grow: 1;
`;

const UserProfileInfoBulletinInnerWrapper = styled.div`
  width: 40%;
`;

const UserInfoComponent = (props) => {

  const basicInfo = props.userData
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );
  console.log(basicInfo)
  return (
    <Card>
      <UserInfoOuterWrapper>
        <UserNameContainer>
          <UserProfilePhotoWrapper>
            <ImageUpload center id="image" onInput={inputHandler} header="Image Upload"/>
            </UserProfilePhotoWrapper>
          <UserProfileNameOutsideWrapper>
            <UserProfileNameInsideWrapper>{basicInfo.userName}</UserProfileNameInsideWrapper>
            <UserProfileLocationWrapper>
            {basicInfo.location}
            </UserProfileLocationWrapper>
          </UserProfileNameOutsideWrapper>
        </UserNameContainer>
        <Hr />
        <UserProfileInfoWrapper>
          {/* <div> */}
          <UserProfileInfoBulletinWrapper>
            <UserProfileInfoBulletinInnerWrapper>
              Current position :
            </UserProfileInfoBulletinInnerWrapper>
            <div>{basicInfo.currentPosition}</div>
          </UserProfileInfoBulletinWrapper>
          <UserProfileInfoBulletinWrapper>
            <UserProfileInfoBulletinInnerWrapper>
              Industry :
            </UserProfileInfoBulletinInnerWrapper>
            <div>{basicInfo.industry}</div>
          </UserProfileInfoBulletinWrapper>
          <UserProfileInfoBulletinWrapper>
            <UserProfileInfoBulletinInnerWrapper>
              Phone :
            </UserProfileInfoBulletinInnerWrapper>
            <div>{basicInfo.phone}</div>
          </UserProfileInfoBulletinWrapper>
          <UserProfileInfoBulletinWrapper>
            <UserProfileInfoBulletinInnerWrapper>
              Email:
            </UserProfileInfoBulletinInnerWrapper>
            <div>{basicInfo.email}</div>
          </UserProfileInfoBulletinWrapper>
          {/* </div> */}
        </UserProfileInfoWrapper>
      </UserInfoOuterWrapper>
    </Card>
  );
};

export default UserInfoComponent;
