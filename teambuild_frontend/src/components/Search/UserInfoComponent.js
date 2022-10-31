import styled from "styled-components";
import { useForm } from "../../hooks/form-hook";
import Card from "../UI/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
const UserInfoOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 20px 24px;
  border-radius:30px
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
  color: #0C0B0B;
  font-weight: 500;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-size: 22px;
`;

const Hr = styled.hr`
  size: 8;
  width: 100%;
  color: #bcbcbc;
`;

const UserProfileLocationWrapper = styled.div`
font-family: 'Inter';
color:black;
font-style: normal;
font-weight: 300;
font-size: 16px;
line-height: 24px;
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
  width: 50%
  flex-direction: row;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 200;
  font-size: 20px;
  line-height: 30px;
  text-align:right;

  color: #0C0B0B;
`;

const UserProfileInfoBulletinInnerWrapper = styled.div`
  font-weight: 600;

  display: flex;
 flex-direction: row;
  font-family: 'Inter';
  font-style: normal;
  font-size: 20px;
  line-height: 24px;
  
  color: #0C0B0B;
`;

const Rowwrapper = styled.div`

  display: flex;
 flex-direction: row;
  color: #0C0B0B;
`;

const UserInfoComponent = (props) => {
  console.log(props)
  const basicInfo = props.userData;
//   const skillset = props.userData.skillSet;
  const [skillset,setSkillset] = useState([])
  const [isEdit,setIsEdit] = useState(false)

  useEffect(() =>{
      if(props.userData){
        setSkillset(props.userData.skillset)

      }
  })

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );
  console.log(basicInfo,skillset,'a');
  return (
    <Card>
      <UserInfoOuterWrapper>
        <UserNameContainer>
        <UserProfilePhotoWrapper>
          </UserProfilePhotoWrapper>
          <UserProfileNameOutsideWrapper>
            <UserProfileNameInsideWrapper>
              {basicInfo.firstname+" "+basicInfo.lastname} 

            </UserProfileNameInsideWrapper>
            {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" /> */}
            <UserProfileLocationWrapper>
              {basicInfo.location}
            </UserProfileLocationWrapper>
            <UserProfileLocationWrapper>
              Open to Work
            </UserProfileLocationWrapper>
          </UserProfileNameOutsideWrapper>
        </UserNameContainer>
        <Hr />
        <UserProfileInfoWrapper>
          {/* <div> */}
          <Rowwrapper>
            <UserProfileInfoBulletinInnerWrapper>
              Industry :
            </UserProfileInfoBulletinInnerWrapper>
        <UserProfileInfoBulletinWrapper>
            {basicInfo.industry}
          </UserProfileInfoBulletinWrapper>
          </Rowwrapper>
          <Rowwrapper>
            <UserProfileInfoBulletinInnerWrapper>
              Goals Matched : 
            </UserProfileInfoBulletinInnerWrapper>
            <UserProfileInfoBulletinWrapper>
            {
                skillset &&(
                    skillset.map((skill,idx) =>(
                        <div key={idx}>{skill[1]}</div>
                    ))
                )
            }
          </UserProfileInfoBulletinWrapper>
              </Rowwrapper>
              <Rowwrapper>
            <UserProfileInfoBulletinInnerWrapper>
              Skillset :
            </UserProfileInfoBulletinInnerWrapper>
                      <UserProfileInfoBulletinWrapper>
            {
                skillset &&(
                    skillset.map((skill,idx) =>(
                        <div key={idx}>{skill[0]}</div>
                    ))
                )
            }
          </UserProfileInfoBulletinWrapper>
          </Rowwrapper>
          {/* </div> */}
        </UserProfileInfoWrapper>
      </UserInfoOuterWrapper>

      {isEdit && (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <TextField id="filled-basic" label="Filled" variant="filled" />
          <TextField id="standard-basic" label="Standard" variant="standard" />
        </Box>
      )}
    </Card>
  );
};

export default UserInfoComponent;