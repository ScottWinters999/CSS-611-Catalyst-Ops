import styled from "styled-components";
import { GrMail } from "react-icons/gr";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useForm } from "../../hooks/form-hook";
import { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import React from "react";

import classes from "./UserInfo.module.css";
import { CgProfile } from "react-icons/cg";
import { GrLocation } from "react-icons/gr";
import { AuthContext } from "../../shared/context/auth-context";



// const UserInfoOuterWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: fit-content;
//   padding: 20px 24px;
//   border-radius:30px
//   @media (max-width: 1200px) {
//     padding: 20px 16px;
//   }
// `;
// const UserNameContainer = styled.div`
//   display: flex;
//   height: 20%;
//   flex-direction: row;
// `;

// const UserProfilePhotoWrapper = styled.div`
//   width: 50%;
//   display: flex;
//   align-items: flex-end;
// `;

// const UserProfileNameOutsideWrapper = styled.div`
//   width: 60%;
// `;

// const UserProfileNameInsideWrapper = styled.div`
//   color: #0C0B0B;
//   font-weight: 500;
//   font-family: 'Inter';
//   font-style: normal;
//   font-weight: 800;
//   font-size: 22px;
// `;

// const Hr = styled.hr`
//   size: 8;
//   width: 100%;
//   color: #bcbcbc;
// `;

// const UserProfileLocationWrapper = styled.div`
// font-family: 'Inter';
// color:black;
// font-style: normal;
// font-weight: 300;
// font-size: 16px;
// line-height: 24px;
// `;

// const UserProfileInfoWrapper = styled.div`
//   height: 70%;
//   display: flex;
//   flex-direction: column;
//   padding: 4px 26px;
//   @media (max-width: 1200px) {
//     padding: 4px 4px;
//   }
// `;

// const UserProfileInfoBulletinWrapper = styled.div`
//   display: flex;
//   width: 50%
//   flex-direction: row;
//   font-family: 'Inter';
//   font-style: normal;
//   font-weight: 200;
//   font-size: 20px;
//   line-height: 30px;
//   text-align:right;

//   color: #0C0B0B;
// `;

// const UserProfileInfoBulletinInnerWrapper = styled.div`
//   font-weight: 600;

//   display: flex;
//  flex-direction: row;
//   font-family: 'Inter';
//   font-style: normal;
//   font-size: 20px;
//   line-height: 24px;
  
//   color: #0C0B0B;
// `;

// const Rowwrapper = styled.div`

//   display: flex;
//  flex-direction: row;
//   color: #0C0B0B;
// `;



const ModalWrapper = {
  height: "60%",
  width: "30rem",
  left: "calc(50% - 15rem)",
  borderRadius: "10px",
};
const ItemActions = {
  padding: "2px",
  // "text-align": "center",
  // "border-top": "1px solid #ccc",
  height: "14%",
};

const ModalHeader = {
  height: "20%",
  // "font-family": "Montserrat",
  background:"#264ECA",
  
};

const ItemModal = {
  padding: "0",
  height: "100%",
};



const UserInfoComponent = (props) => {
  console.log(props)
  const basicInfo = props.userData;
  const idx = props.idx
  const deleteMatch=props.deleteSingleMatch
//   const skillset = props.userData.skillSet;
  const [skillset,setSkillset] = useState([])
  const [isEdit,setIsEdit] = useState(false)
  const token = JSON.parse(localStorage.getItem("userData"));

  const authorization = "Bearer " + token.token;


  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => {
    setShowModal(true);
    try {
      const response = fetch("http://localhost:5000/api/userprofileviewcreate", {
        method: "POST",
        body: viewBody,
        headers: {
          "Content-Type": "application/json",
          "authorization":authorization
        },
      });
      const data =  response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const UserAccept = () => {
    closeModalHandler();
    console.log(acceptBody)
    // deleteMatch(idx)
    try {
      const newresponse = fetch("http://localhost:5000/api/usergoalmatch", {
        method: "POST",
        body: acceptBody,
        headers: {
          "Content-Type": "application/json",
          "authorization":authorization
        },
      });
      const data =  newresponse.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };


  const UserDiscard = () => {
    closeModalHandler();
    console.log(discardBody)
    deleteMatch(idx)
    try {
      const response = fetch("http://localhost:5000/api/userdiscard", {
        method: "POST",
        body: discardBody,
        headers: {
          "Content-Type": "application/json",
          "authorization":authorization
        },
      });
      const data =  response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };


  
  
  const viewBody = JSON.stringify({
    userUserId: basicInfo.userid,
    matchedGoal:basicInfo.goalMatched,
    //skillSetId:basicInfo.skillsetid
  });

  const discardBody = JSON.stringify({
    discardUserId: basicInfo.userid,
    goalId:basicInfo.goalMatchedId,
    skillSetId:basicInfo.skillsetId
  });

  const acceptBody = JSON.stringify({
    matchedUserId: basicInfo.userid,
    goalComponentId:basicInfo.goalcomponentid
  });


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




  const header = (
    <React.Fragment>
      {/* <UploadButton onClick={uploadImageButtonHandle} disabled={!previewUrl}>
        Upload
      </UploadButton>
      {/* {profilePhotoUrl && (
        <RemoveButton onClick={removeImageButtonHandle}>Remove</RemoveButton>
      )} */}
      <div className={classes.ModalHeader}>
        <button onClick={closeModalHandler}> X </button>
      </div>
    </React.Fragment>
  );
  const modalFooter = (
    <React.Fragment>
      {/* <UploadButton onClick={uploadImageButtonHandle} disabled={!previewUrl}>
        Upload
      </UploadButton>
      {/* {profilePhotoUrl && (
        <RemoveButton onClick={removeImageButtonHandle}>Remove</RemoveButton>
      )} */}
      <div className={classes.ModalFooter}>
        {/* <button onClick={closeModalHandler}>Close</button> */}
        <div className={classes.footerdiscardbutton}>
        <div>
        <button onClick={UserDiscard}>Remove this person</button>
        </div>
        </div>
        <div className={classes.footeracceptbutton}>
        <div>
        <button onClick={UserAccept}>Accept this person</button>
        </div>
        </div>
        </div>
    </React.Fragment>
  );


  const modal = (
    <Modal
      show={showModal}
      modalWrapper={ModalWrapper}
      onCancel={closeModalHandler}
      modalHeader={ModalHeader}
      contentClass={ItemModal}
      header={header}
      footerClass={ItemActions}
      footer={modalFooter}
    >
      <div className="form-control">
        <div className={classes.ModalMainContent}>
          <div className={classes.ProfilePic}>
            <div className={classes.ProfilePicInner}></div>
          </div>
          <div className={classes.ModalProfileName}>{basicInfo.firstname}</div>
          <div className={classes.ModalCaption}>
            {basicInfo.skillset}
          </div>
          <div className={classes.ModalMainInfo}>
            <div className={classes.IconsClass}>
              <GrMail className={classes.IconsSvg} />
            </div>
            <div className={classes.UserContent}>{basicInfo.email}</div>
          </div>
          <div className={classes.ModalMainInfo}>
            <div className={classes.IconsClass}><GrLocation className={classes.IconsSvg} /></div>
            <div className={classes.UserContent}>{basicInfo.location}</div>
          </div>
        </div>
        {/* {!isValid && <p>'error'</p>} */}
      </div>
    </Modal>
  );



  console.log(basicInfo,skillset,'a');
  
  
  
  
  
  
  
  // return (
  //   <Card>
  //     <UserInfoOuterWrapper>
  //       <UserNameContainer>
  //       <UserProfilePhotoWrapper>
  //         </UserProfilePhotoWrapper>
  //         <UserProfileNameOutsideWrapper>
  //           <UserProfileNameInsideWrapper>
  //             {basicInfo.firstname+" "+basicInfo.lastname} 

  //           </UserProfileNameInsideWrapper>
  //           {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" /> */}
  //           <UserProfileLocationWrapper>
  //             {basicInfo.location}
  //           </UserProfileLocationWrapper>
  //           <UserProfileLocationWrapper>
  //             Open to Work
  //           </UserProfileLocationWrapper>
  //         </UserProfileNameOutsideWrapper>
  //       </UserNameContainer>
  //       <Hr />
  //       <UserProfileInfoWrapper>
  //         {/* <div> */}
  //         <Rowwrapper>
  //           <UserProfileInfoBulletinInnerWrapper>
  //             Industry :
  //           </UserProfileInfoBulletinInnerWrapper>
  //       <UserProfileInfoBulletinWrapper>
  //           {basicInfo.industry}
  //         </UserProfileInfoBulletinWrapper>
  //         </Rowwrapper>
  //         <Rowwrapper>
  //           <UserProfileInfoBulletinInnerWrapper>
  //             Goals Matched : 
  //           </UserProfileInfoBulletinInnerWrapper>
  //           <UserProfileInfoBulletinWrapper>
  //           {
  //               skillset &&(
  //                   skillset.map((skill,idx) =>(
  //                       <div key={idx}>{skill[1]}</div>
  //                   ))
  //               )
  //           }
  //         </UserProfileInfoBulletinWrapper>
  //             </Rowwrapper>
  //             <Rowwrapper>
  //           <UserProfileInfoBulletinInnerWrapper>
  //             Skillset :
  //           </UserProfileInfoBulletinInnerWrapper>
  //                     <UserProfileInfoBulletinWrapper>
  //           {
  //               skillset &&(
  //                   skillset.map((skill,idx) =>(
  //                       <div key={idx}>{skill[0]}</div>
  //                   ))
  //               )
  //           }
  //         </UserProfileInfoBulletinWrapper>
  //         </Rowwrapper>
  //         {/* </div> */}
  //       </UserProfileInfoWrapper>
  //     </UserInfoOuterWrapper>

  //     {isEdit && (
  //       <Box
  //         component="form"
  //         sx={{
  //           "& > :not(style)": { m: 1, width: "25ch" },
  //         }}
  //         noValidate
  //         autoComplete="off"
  //       >
  //         <TextField id="outlined-basic" label="Outlined" variant="outlined" />
  //         <TextField id="filled-basic" label="Filled" variant="filled" />
  //         <TextField id="standard-basic" label="Standard" variant="standard" />
  //       </Box>
  //     )}
  //   </Card>
  // );






  return (
    <React.Fragment>
      {modal}
      <div className={classes.CardWrapper} onClick={openModalHandler}>
        <div className={classes.CardInnerWrapper}>
          <div className={classes.Intro}>
            <div className={classes.PhotoSection}>
              <div className={classes.AvatarWrapper}>
                <CgProfile className={classes.Avatar} />
              </div>
            </div>
            <div className={classes.BasicInfoSection}>
              <div className={classes.NameWrapper}>
                <p>{basicInfo.firstname}</p>
              </div>
              <div className={classes.StatusWrapper}>
                <p>Open to Work</p>
              </div>
              <div className={classes.LocationWrapper}>
                <p>{basicInfo.location}</p>
              </div>
            </div>
          </div>
          <section className={classes.MainContent}>
            <div>
              <div className={classes.LabelWrapper}>
                <p>Industry :</p>
                <span className={classes.ContentWrapper}>{basicInfo.industry}</span>
              </div>
              <div className={classes.LabelWrapper}>
                <p>Goals Matched :</p>
                <span className={classes.ContentWrapper}>
                      {basicInfo.goalMatched}
                </span>
              </div>
              <div className={classes.LabelWrapper}>
                <p>Skillset :</p>
                <span className={classes.ContentWrapper}>
                        {basicInfo.skillset}
                </span>
              </div>
              <div className={classes.LabelWrapper}>
                <p>Experience years:</p>
                <span className={classes.ContentWrapper}>
                      {basicInfo.experience} 
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );


};

export default UserInfoComponent;