import styled from "styled-components";
import Card from "../UI/Card";

const UserInfoOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 24px;
`;
const UserNameContainer = styled.div`
  display: flex;
  height: 20%;
  flex-direction: row;
`;

const UserProfilePhotoWrapper = styled.div`
  width: 40%;
`;

const UserProfileNameOutsideWrapper = styled.div`
  width: 60%;
`;

const UserProfileNameInsideWrapper = styled.div`
  color: blue;
  font-weight: 500;
  font-family: "Roboto";
  font-size: 24px;
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
`;

const UserProfileInfoBulletinWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  font-family: "Roboto";
  font-weight: lighter;
  flex-grow: 1;
`;

const UserProfileInfoBulletinInnerWrapper = styled.div`
  width: 40%;
`;

const UserInfoComponent = () => {
  return (
    <Card>
      <UserInfoOuterWrapper>
        <UserNameContainer>
          <UserProfilePhotoWrapper>swadsa</UserProfilePhotoWrapper>
          <UserProfileNameOutsideWrapper>
            <UserProfileNameInsideWrapper>John</UserProfileNameInsideWrapper>
            <UserProfileLocationWrapper>
              Buffalo,Newyork
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
            <div>sdasd</div>
          </UserProfileInfoBulletinWrapper>
          <UserProfileInfoBulletinWrapper>
            <UserProfileInfoBulletinInnerWrapper>
              Industry :
            </UserProfileInfoBulletinInnerWrapper>
            <div>sdasd</div>
          </UserProfileInfoBulletinWrapper>
          <UserProfileInfoBulletinWrapper>
            <UserProfileInfoBulletinInnerWrapper>
              Phone :
            </UserProfileInfoBulletinInnerWrapper>
            <div>sdasd</div>
          </UserProfileInfoBulletinWrapper>
          <UserProfileInfoBulletinWrapper>
            <UserProfileInfoBulletinInnerWrapper>
              Email:
            </UserProfileInfoBulletinInnerWrapper>
            <div>sdasd</div>
          </UserProfileInfoBulletinWrapper>
          {/* </div> */}
        </UserProfileInfoWrapper>
      </UserInfoOuterWrapper>
    </Card>
  );
};

export default UserInfoComponent;
