import {
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import styled from "styled-components";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import React from "react";
import { GrLocation } from "react-icons/gr";
import { GrMail } from "react-icons/gr";

import classes from "./UserInfo.module.css";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const GoalsOutsideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const TablebodyCellEdit = styled.div`
  // background: black;
  width: 16%;

  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #c8dbdb;
    border-radius: 4px;
    cursor: pointer;
  }
`;
const Table = styled.div`
  // border: 2px solid #bcbcbc;
  //   width: 800px;
  //   height: 200px;
  // color: #9f9f9f;
  // border: 2px solid #bcbcjbc;
  max-height: 100%;
  color: #000000;
  height: auto;
`;
const Th = styled.th`
  border-bottom: 1px solid #bcbcbc;
`;
const Td = styled.td`
  text-align: center;
`;

const TableWrapper = styled.div`
  padding: 4px 8px;
  height: 72% !important;
  overflow-y: scroll;
  border: 1px solid black;
`;
const Header = styled.header`
  padding: 6px 8px;
  color: blue;
  font-weight: 700;
  font-family: "PT Serif", serif;
  font-size: 36px;
`;

const CardInnerBox = styled.div`
  padding: 20px 24px;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  // justify-content: center;
  margin-bottom: 12px;
  width: 50%;
  justify-content: flex-end;
`;

const ButtonInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const GoalAdd = styled.p`
  // font-size:22px;
  margin-top: 2px;
  margin-bottom: 2px;
  color: white;
  font-family: "Roboto";
  font-weight: 700;
`;

const Button = styled.button`
  width: 50%;
  height: 30px;
  background: #466de7f0;
  border: none;
  border-radius: 4px;
  height: 54px;
  padding: 6px;
  & :hover {
    background: #34349f;
    cursor: pointer;
    border-radius: 4px;
  }
`;

const Tableheader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TableHeaderRow = styled.div`
  display: flex;
  color: inherit;
  display: table-row;
  outline: 0;
  vertical-align: middle;
  background: white;
  width: 100%;
  display: flex;
  justify-content: space-around;
  height: 2rem;
  padding-left: 18px;
`;
const TableHeaderCol = styled.div`
  font-family: "Roboto";
  font-weight: 500;
  background: white;
  padding: 6px 16px;
  font-size: 20px;
`;

const Tablebody = styled.div``;
const TablebodyRow = styled.div`
  display: flex;
  align-content: space-around;
  justify-content: flex-start;
  padding: 18px 12px;
  background: white;
  border-radius: 4px;
  box-shadow: -1px 8px 65px 0px rgb(164 164 181 / 58%);
`;
const TablebodyRownew = styled.div`
  display: flex;
  align-content: space-around;
  justify-content: flex-start;
  padding: 0px 0px;
  background: white;
  border-radius: 4px;
  box-shadow: -1px 8px 65px 0px rgb(164 164 181 / 58%);
`;

const TableDropDownBodyRow = styled.div`
  display: flex;
  -webkit-align-content: space-around;
  -ms-flex-line-pack: space-around;
  align-content: space-around;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: space-around;
  padding: 2px 12px;
  background: #ffffff;
  width: 100%;
`;
const TablebodyCell = styled.div`
  padding: 8px 6px;
  width: 16%;
  // box-shadow: -1px 8px 65px 0px rgb(164 164 181 / 58%);
`;

const TablebodyCellButtonDelete = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px 6px;
  width: 20%;
  background: #ffffff;
  margin-left: 30px;
  &:hover {
    background: #ffa6a6;
    border-radius: 4px;
    cursor: pointer;
  }
`;
const TablebodyCellInner = styled.div`
  padding: 8px 6px;
  width: 50%;
  display: flex;
  justify-content: center;
`;
const TablebodyCellWrapper = styled.div`
  display: flex;
  // justify-content: space-around;
  flex-direction: row;
  width: 100%;
  // align-items: center;
  // box-shadow: -1px 8px 65px 0px rgb(164 164 181 / 58%);
`;

const TablebodyCellDropRow = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  // background: white;
`;

const ArrowWrapper = styled.div`
  background: aliceblue;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;

  &:hover {
    background: #a7b3bd;
  }
`;

const TablebodyCellDrop = styled.div``;

const TableBodyInner = styled.div``;

const useStyles = makeStyles({
  tc: {
    padding: "4px",
    "font-family": "Roboto",
    "font-size": "18px",
  },
  tc2: {
    padding: "4px",
    "font-size": "12px",
    "font-family": "Roboto",
  },
});

function createData(name, status, goalComponents) {
  return { name, status, goalComponents };
}

const rows = [
  createData("Web startup", "3/3", [
    {
      goalComponent: "Frontend",
      matchedWithUser: "John",
    },
    {
      goalComponent: "Frontend",
      matchedWithUser: "John",
    },
    {
      goalComponent: "Frontend",
      matchedWithUser: "John",
    },
  ]),
  createData("Web startup", "3/3", [
    {
      goalComponent: "Frontend",
      matchedWithUser: "John",
    },
    {
      goalComponent: "Frontend",
      matchedWithUser: "John",
    },
    {
      goalComponent: "Frontend",
      matchedWithUser: "John",
    },
  ]),
  createData("Web startup", "3/3", [
    {
      goalComponent: "Frontend",
      matchedWithUser: "John",
    },
    {
      goalComponent: "Frontend",
      matchedWithUser: "John",
    },
    {
      goalComponent: "Frontend",
      matchedWithUser: "John",
    },
  ]),
  createData("Web startup", "3/3", [
    {
      goalComponent: "Frontend",
      matchedWithUser: "John",
    },
    {
      goalComponent: "Frontend",
      matchedWithUser: "John",
    },
    {
      goalComponent: "Frontend",
      matchedWithUser: "John",
    },
  ]),
  createData("Web startup", "3/3", [
    {
      goalComponent: "Frontend",
      matchedWithUser: "John",
    },
    {
      goalComponent: "Frontend",
      matchedWithUser: "John",
    },
    {
      goalComponent: "Frontend",
      matchedWithUser: "John",
    },
  ]),
  createData("Web startup", "3/3", [
    {
      goalComponent: "Frontend",
      matchedWithUser: "John",
    },
    {
      goalComponent: "Frontend",
      matchedWithUser: "John",
    },
    {
      goalComponent: "Frontend",
      matchedWithUser: "John",
    },
  ]),
];





const ModalWrapper = {
  height: "78%",
  width: "30rem",
  left: "calc(50% - 15rem)",
  borderRadius: "10px",
};

const ModalWrapper2 = {
  height: "20%",
  width: "30rem",
  left: "calc(50% - 15rem)",
  borderRadius: "10px",
};
const ItemActions = {
  padding: "30px",
  // "text-align": "center",
  // "border-top": "1px solid #ccc",
  height: "14%",
};

const ModalHeader = {
  height: "10%",
  // "font-family": "Montserrat",
  background:"#264ECA",
  
};

const ItemModal = {
  padding: "0",
  height: "100%",
};
const ItemModal2 = {
  padding: "0",
  height: "30%",
};







const ExpandableTableRow = ({ children, goalComponents,goalid, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [goalComponentList, setGoalComponentList] = useState([]);
  const [idValue,setIdValue] = useState();
  const token = JSON.parse(localStorage.getItem("userData"));
  const authorization = "Bearer " + token.token;
  const goalId = goalid


  useEffect(() => {
    if (goalComponents) {
      setGoalComponentList(goalComponents);
    }

  }, [goalComponents]);

  if(goalComponentList){
    console.log(goalComponentList,"passed goals");

  }


  const [showModal, setShowModal] = useState(false);

  const openModalHandler = (value) => {
    setShowModal(true);
    console.log(value,"removal value final")
    setIdValue(value)
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };
  const deleteHandler = () => {
    console.log(idValue,"removal value from delete")
    window.location.reload(false);
    const discardBody = {
      discardUserId: idValue?.matcheduserId?.userUserId,
      goalId:goalId,
      positionId:idValue?.matcheduserId?.userpositions[0]?.positionId,
      goalcompId:idValue?.goalcomponentId
    };
    console.log(discardBody,"removal value from delete")
    const body = {
      goalComponentId: idValue?.goalcomponentId
      ,
    };
    console.log(body,"removal value from delete")
    try {
      const response =  fetch("http://localhost:5000/api/usergoalmatchremove", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "authorization":authorization
        },
      });
      const data = response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    try {
      const response =  fetch("http://localhost:5000/api/userdiscard", {
        method: "POST",
        body: JSON.stringify(discardBody),
        headers: {
          "Content-Type": "application/json",
          "authorization":authorization
        },
      });
      const data = response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
    
    
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
        <button onClick={deleteHandler}>Remove this person</button>
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
      {idValue?.matcheduserId && (<div className={classes.ModalProfileNamenew}>Matched User : {idValue?.matcheduserId?.firstName + " " +idValue?.matcheduserId?.lastName}</div>)}
      {/* <div className={classes.ModalCaption}>
        {basicInfo.skillset}
      </div> */}
      <TablebodyCellDropRow>
      {/* <TableCell /> */}
      {/* <TablebodyCellDrop> */}
      {/* <Table> */}
      <Tableheader>
        <TableDropDownBodyRow>
          <TablebodyCellInner
            style={{
              borderBottom: "1px solid black",
              fonSize: "16px",
              fontWeight: "600",
            }}
          >
            Skill
          </TablebodyCellInner>
          <TablebodyCellInner
            style={{
              borderBottom: "1px solid black",
              fonSize: "16px",
              fontWeight: "600",
            }}
          >
            Experience in skill
          </TablebodyCellInner>
          {/* <TablebodyCell align="right">Fat&nbsp;(g)</TablebodyCell>
            <TablebodyCell align="right">Carbs&nbsp;(g)</TablebodyCell>
            <TablebodyCell align="right">Protein&nbsp;(g)</TablebodyCell> */}
        </TableDropDownBodyRow>
      </Tableheader>
      <TableBodyInner>
        {idValue?.skills?.map((skill, idx) => (
          <TableDropDownBodyRow key={idx}>
            <TablebodyCellInner>
              {skill?.skill}
            </TablebodyCellInner>
            <TablebodyCellInner>
              {skill?.experience}
            </TablebodyCellInner>
          </TableDropDownBodyRow>
        ))}

      </TableBodyInner>
      {/* </Table> */}
      {/* </TablebodyCellDrop> */}
    </TablebodyCellDropRow>
    <div className={classes.ModalMainInfo}>
    Goal Location Details:
      <div className={classes.UserContent}><p>{idValue?.city + ","}{idValue?.state + ","}{idValue?.country}</p></div>
    </div>
    Matched User Details:
      <div className={classes.ModalMainInfo}>
        <div className={classes.IconsClass}>
          <GrMail className={classes.IconsSvg} />
        </div>
        <div className={classes.UserContent}>{idValue?.matcheduserId?.email}</div>
      </div>
      <div className={classes.ModalMainInfo}>
        <div className={classes.IconsClass}><GrLocation className={classes.IconsSvg} /></div>
        <div className={classes.UserContent}>{idValue?.matcheduserId?.userpositions[0]?.city + ","}{idValue?.matcheduserId?.userpositions[0]?.state + ","}{idValue?.matcheduserId?.userpositions[0]?.country}</div>       
      </div>
    </div>
    {/* {!isValid && <p>'error'</p>} */}
  </div>

</Modal>
);



  
  return (
    <div style={{ padding: "4px", marginTop: "22px" }}>
      <TablebodyRow {...otherProps}>
      {modal}
        <TablebodyCell style={{ width: "8%" }}>
          <ArrowWrapper onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
          </ArrowWrapper>
        </TablebodyCell>
        {children}
      </TablebodyRow>
      {/* <TableRow>adsd</TableRow> */}
      {isExpanded && (
        // <div>ssds</div>
        <TablebodyCellDropRow>
          {/* <TableCell /> */}
          {/* <TablebodyCellDrop> */}
          {/* <Table> */}
          <Tableheader>
            <TableDropDownBodyRow>
              <TablebodyCellInner
                style={{
                  borderBottom: "1px solid black",
                  fonSize: "16px",
                  fontWeight: "600",
                }}
              >
                Goal Component
              </TablebodyCellInner>
              <TablebodyCellInner
                style={{
                  borderBottom: "1px solid black",
                  fonSize: "16px",
                  fontWeight: "600",
                }}
              >
                Matched with
              </TablebodyCellInner>
              {/* <TablebodyCell align="right">Fat&nbsp;(g)</TablebodyCell>
                <TablebodyCell align="right">Carbs&nbsp;(g)</TablebodyCell>
                <TablebodyCell align="right">Protein&nbsp;(g)</TablebodyCell> */}
            </TableDropDownBodyRow>
          </Tableheader>
          <TableBodyInner>
            {goalComponentList.map((singleGoalComponent, idx) => (
              <TableDropDownBodyRow key={idx}>
                <TablebodyCellInner>
                  {singleGoalComponent.goalcomponent}
                </TablebodyCellInner>
                <TablebodyCellInner>
                  <button onClick={()=>openModalHandler(singleGoalComponent)}>Click for More Details</button>
                </TablebodyCellInner>
                    


              </TableDropDownBodyRow>
            ))}
           
          </TableBodyInner>
          {/* </Table> */}
          {/* </TablebodyCellDrop> */}
        </TablebodyCellDropRow>
      )}
    </div>
  );
};

const UserGoalComponent = ({ data }) => {
  const classes = useStyles();
  const [totalGoals, setTotalGoals] = useState([]);
  console.log(data, "GOALSS");
  const [idValue,setIdValue] = useState();
  const history = useNavigate();
  useEffect(() => {
    // if (data) {
    //   const groupBy = (key) => (array) =>
    //     array.reduce((objectsByKeyValue, obj) => {
    //       const value = obj[key];
    //       objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(
    //         obj
    //       );
    //       return objectsByKeyValue;
    //     }, {});
    //   const groupByGoal = groupBy("goal");
    //   let total = groupByGoal(data);
    //   console.log(total);
    //   if (Object.keys(total).length > 0) {
    //     // console.log("lengthhh");
    //     const currentUserGoals = [];
    //     Object.keys(total).forEach((key, idx) => {
    //       let temp = {};
    //       // console.log(total[key])
    //       let goalName = key;

    //       // let goalComponents = []
    //       let goalComponents = total[key].map((val) => {
    //         // console.log(val,'sss')
    //         return {
    //           goalComponent: val["goalComponent"],
    //           matchedUser: val["matchedUser"],
    //           goalComponentId: val["goalComponentId"],
    //         };
    //       });
    //       let currentGoalStatus = total[key].reduce((val, userGoal) => {
    //         console.log(val, userGoal, "asasassdsads  ");
    //         let ifMatchedUser = 0;
    //         // userGoal['matchedUser'] = 'a'
    //         console.log(userGoal["matchedUser"], "aaa");
    //         if (
    //           "matchedUser" in userGoal &&
    //           userGoal["matchedUser"].length > 0
    //         ) {
    //           ifMatchedUser = 1;
    //           // console.log('nnnnnnnnnnnnnnnnnnnnnnnnnn')
    //         }
    //         return val + ifMatchedUser;
    //         // return val['matchedUser'].length
    //       }, 0);
    //       let totalGoalComponents = goalComponents.length;
    //       let status = `${currentGoalStatus} / ${totalGoalComponents}`;
    //       console.log(status, "required");
    //       temp = {
    //         name: goalName,
    //         status: status,
    //         goalComponents: goalComponents,
    //         goalId: total[key][0]["goalId"],
    //       };
    //       currentUserGoals.push(temp);
    //     });
    //     console.log(currentUserGoals, "current");
    //     setTotalGoals(currentUserGoals);
    //   }
    // }
    if(data){
      console.log(data,'469')

      setTotalGoals(data);
    }
  }, [data]);


  const [showModal, setShowModal] = useState(false);

  const openModalHandler = (val,id) => {
    setShowModal(val);
    setIdValue(id)
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };
  const deleteHandler = () => {
    console.log(idValue,"deleter id")
    closeModalHandler();
    window.location.reload(false);
    const body = {
      goalId: idValue,
    };
    try {
      const response =  fetch("http://localhost:5000/api/usergoaldelete", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  const deleteButtonHandler = async(idx) => {
    console.log(totalGoals[idx]);
    const goalId = totalGoals[idx]["goalId"];
    console.log(goalId);
    const body = {
      goalId: idx,
    };
    try {
      const response = await fetch("http://localhost:5000/api/usergoaldelete", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data) {
        setTotalGoals((prev) => prev.filter((goal) => goal.goalId !== idx));
      }
    } catch (err) {
      console.log(err);
    }

    // const index = array.indexOf(idx);
    // if (index > -1) { // only splice array when item is found
    //   array.splice(index, 1); // 2nd parameter means remove one item only
    // }
  };



 

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
        <div className={classes.footerdiscardbutton} style={{padding:"3px"}}>
        <button onClick={deleteHandler}>YES</button>
        <button>NO</button>
        </div>
        </div>
    </React.Fragment>
  );



  // const groupBy = key => array =>
  // array.reduce((objectsByKeyValue, obj) => {
  //   const value = obj[key];
  //   objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
  //   return objectsByKeyValue;
  // }, {});
  // const groupByGoal = groupBy('goal')
  // let total = groupByGoal(data)
  // console.log(a)
  // return (
  //   <GoalsOutsideWrapper>
  //     <Card>
  //       <CardInnerWrapper>
  //         <GoalHeader>Goals</GoalHeader>
  //         <Table>
  //           <tbody>
  //           <tr>
  //             <Th>Team Name</Th>
  //             <Th>Matched With</Th>
  //             <Th>Status</Th>
  //           </tr>
  //           {data.map((val, key) => {
  //             return (
  //               <tr key={key}>
  //                 <Td>{val.teamName}</Td>
  //                 <Td>{val.matchedWith}</Td>
  //                 <Td>{val.status}</Td>
  //               </tr>
  //             );
  //           })}
  //           </tbody>
  //         </Table>
  //       </CardInnerWrapper>
  //     </Card>
  //   </GoalsOutsideWrapper>
  // );
  const editGoalHandler = (id) => {
    history("/userchat", {
      state: {
        editGoal: id,
      },
    });
    console.log(id);
  };


  const [isExpanded, setIsExpanded] = useState(false);
  // const listItems = numbers.map((number) => <li>{number}</li>);
  return (
    <GoalsOutsideWrapper>
      <Card style={{ "overflow-y": "scroll" }}>
        <CardInnerBox>
          <Header>
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ width: "50%" }}>Goals</div>

              <ButtonWrapper>
                <Link
                  to={"/userchat"}
                  state={{ addGoal: "True" }}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button>
                    <ButtonInner>
                      <GoalAdd>Add New Goal</GoalAdd>
                      <AiOutlinePlus
                        style={{
                          color: "white",
                          width: "24px",
                          height: "24px",
                        }}
                      />
                    </ButtonInner>
                  </Button>
                </Link>
              </ButtonWrapper>
            </div>
          </Header>

          {/* <ThemeProvider theme={theme}> */}

          {totalGoals && (
            <TableWrapper>
              <Table
                aria-label="simple table"
                style={{ width: "100%" }}
                align="right"
              >
                <Tableheader>
                  <TableHeaderRow>
                    <TableHeaderCol>Goal Name</TableHeaderCol>
                    <TableHeaderCol>Status</TableHeaderCol>
                    <TableHeaderCol>Edit</TableHeaderCol>
                    <TableHeaderCol>Delete</TableHeaderCol>
                  </TableHeaderRow>
                </Tableheader>
                <Tablebody>
                  {totalGoals.map((row, idx) => (
                    <ExpandableTableRow
                      key={idx}
                      goalid={row.goalId}
                      goalComponents={row?.goalcomponent}
                    >
                      <TablebodyCellWrapper>
                        <TablebodyCell
                          style={{ width: "36%", marginLeft: "2%" }}
                        >
                          {row.goalName}
                        </TablebodyCell>
                        <TablebodyCell>{row.status}</TablebodyCell>
                        <TablebodyCellEdit>
                          <BsPencilFill onClick={() => editGoalHandler(row?.goalId)} />
                        </TablebodyCellEdit>
                        <TablebodyCellButtonDelete
                          onClick={() => openModalHandler(true,row?.goalId)}
                      >
                          <MdDeleteOutline
                            style={{ width: "24px", height: "24px" }}
                          />
                        </TablebodyCellButtonDelete>
                      </TablebodyCellWrapper>
                    </ExpandableTableRow>
                    
                    
                    
                  ))}
                      <Modal
      show={showModal}
      modalWrapper={ModalWrapper2}
      onCancel={closeModalHandler}
      modalHeader={ModalHeader}
      contentClass={ItemModal2}
      header={header}
      footerClass={ItemActions}
      footer={modalFooter}
    >
        <div className={classes.ModalMainContent}>
          <div className={classes.ModalMainInfo}>
            <div className={classes.UserContent}><div align="center"> Are You Sure You Want to Delete </div></div>
          </div>
        {/* {!isValid && <p>'error'</p>} */}
      </div>
    </Modal>                
                </Tablebody>
              </Table>
            </TableWrapper>
          )}

          {/* </ThemeProvider> */}
        </CardInnerBox>
      </Card>
    </GoalsOutsideWrapper>
  );
};

export default UserGoalComponent;
