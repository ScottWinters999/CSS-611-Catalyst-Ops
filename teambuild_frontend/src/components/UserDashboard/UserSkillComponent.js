import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import styled from "styled-components";
import Card from "../UI/Card";
import { BsPencilFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { width } from "@mui/system";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import classes from "./UserInfo.module.css";

// import {
//   modaldeleteFooter,
//   showModal,
//   modalFooter,
//   ItemActions,
//   header,
//   ModalWrapper2,
//   closeModalHandler,
//   ModalHeader,
//   ItemModal2,
// } from "./UserPositionDeleteModalComponent/UserPositionDeleteComponent";
import Modal from "../UI/Modal";
import UserPositionDeleteComponent from "./UserPositionDeleteModalComponent/UserPositionDeleteComponent";
const SkillInfoOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 24px;

  @media (max-width: 760) {
    align-items: center;
  }
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
const GoalAdd = styled.p`
  // font-size:22px;
  margin-top: 2px;
  margin-bottom: 2px;
  color: white;
  font-family: "Roboto";
  font-weight: 700;
`;

const HeadingWrapper = styled.div`
  display: flex;

  //   height: 100%;

  flex-direction: row;
  padding: 20px 0px;
  color: blue;
  font-weight: 700;
  font-family: "PT Serif", serif;
  font-size: 36px;
`;

const SkillBulletinOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 226px;
`;

const SkillBulletin = styled.div`
  padding: 4px 0px;
`;

const Table = styled.div`
  border: 2px solid #bcbcbc;
  //   width: 800px;
  //   height: 200px;
  // color: #9f9f9f;

  overflow-y: scroll;
  color: #000000;
  min-height: 200px;
`;

const Tablehead = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid black;
`;
const Tablerow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;
const Tablecell = styled.div``;

const Tablebody = styled.div`
padding: 14px 4px;
width:100%;
}
`;
const SkillSetWrap = styled.div`
  display: flex;
  // box-shadow: -1px 8px 65px 0px rgb(115 115 129 / 58%);
  margin: 4px 0px;
  padding: 10px 2px;
  border-radius: 4px;
`;

const SingleSkill = styled.div`
  display: flex;
  padding: 8px 6px;
  display: flex;
  align-items: center;
  width: 100% !important;
  justify-content: center;
`;

const SingleSkillEdit = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
  margin-left: 36px;
  align-items: center;
  // height: 36px;
  &:hover {
    background: #c8dbdb;
    cursor: pointer;
    border-radius: 4px;
  }
`;

const TablebodyRow = styled.div`
  display: flex;
  align-content: space-around;
  justify-content: flex-start;
  padding: 18px 12px;
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
  background: #fff3f3;
  width: 100%;
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
const TablebodyCell = styled.div`
  padding: 8px 6px;
  width: 16%;
  // box-shadow: -1px 8px 65px 0px rgb(164 164 181 / 58%);
`;
const TablebodyCellDropRow = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  // background: white;
`;
const TableBodyInner = styled.div``;

const TablebodyCellInner = styled.div`
  padding: 8px 6px;
  width: 38%;
  display: flex;
  justify-content: center;
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

const TablebodyCellButtonDelete = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &:hover {
    background: #ffa6a6;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const TablebodyCellSkillButtonDelete = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &:hover {
    background: #ffa6a6;
    border-radius: 4px;
    cursor: pointer;
  }
`;

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

const ExpandableTableRow = ({ children, goalComponents, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [goalComponentList, setGoalComponentList] = useState([]);
  const classes = useStyles();

  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
    idx: null,
    item: null,
  });
  // const userId = JSON.stringify(localStorage.getItem('userId'))
  const openModalHandler = (idx, id, item) => {
    // setShowModal(true);
    setPopup({ show: true, id, idx, item });
  };

  const closeModalHandler = () => {
    setPopup({
      show: false,
      id: null,
      idx: null,
      item: null,
    });
  };

  const deletePositionSkillHandler = (skillsetId, idx) => {
    console.log(skillsetId, idx);
    openModalHandler(skillsetId, idx, "skill");
  };

  const onDeletePositionSKill = async (skillsetId, idx) => {
    console.log("deleted", skillsetId, idx);

    
    const token = JSON.parse(localStorage.getItem("userData"));
    const authorization = "Bearer " + token.token;
    let body = {
      skillId: skillsetId,
    };
    try {
      console.log(body);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER}deleteuserpositionskill`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            authorization: authorization,
          },
        }
      );
      const data = await response.json();
      if (data) {
        let temp = [...goalComponentList];
        temp.splice(idx, 1);
        setGoalComponentList(temp);
        setPopup({
          show: false,
          id: null,
          idx: null,
          item: null,
        });
      }
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (goalComponents) {
      setGoalComponentList(goalComponents);
    }

    console.log(goalComponentList);
  }, [goalComponents]);
  return (
    <div style={{ padding: "4px", marginTop: "22px", width: "100%" }}>
      <TablebodyRow {...otherProps}>
        <TablebodyCell style={{ width: "8%" }}>
          <ArrowWrapper onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <AiOutlineArrowUp
                style={{
                  height: "1em",
                  width: "1em",
                }}
              />
            ) : (
              <AiOutlineArrowDown />
            )}
          </ArrowWrapper>
        </TablebodyCell>
        {children}
      </TablebodyRow>
      {/* <TableRow>adsd</TableRow> */}
      {isExpanded && (
        // <div>ssds</div>
        <React.Fragment>
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
                  Skill Name
                </TablebodyCellInner>
                <TablebodyCellInner
                  style={{
                    borderBottom: "1px solid black",
                    fonSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Experience
                </TablebodyCellInner>
                <TablebodyCellInner
                  style={{
                    borderBottom: "1px solid black",
                    fonSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Delete
                </TablebodyCellInner>

                {/* <TablebodyCell align="right">Fat&nbsp;(g)</TablebodyCell>
                <TablebodyCell align="right">Carbs&nbsp;(g)</TablebodyCell>
                <TablebodyCell align="right">Protein&nbsp;(g)</TablebodyCell> */}
              </TableDropDownBodyRow>
            </Tableheader>
            <TableBodyInner>
              {goalComponentList.map((skill, idx) => (
                <TableDropDownBodyRow key={idx}>
                  <TablebodyCellInner>{skill.skillset}</TablebodyCellInner>
                  <TablebodyCellInner>
                    {skill.experience == 1
                      ? skill.experience + " year"
                      : skill.experience + " years"}
                  </TablebodyCellInner>
                  <TablebodyCellSkillButtonDelete
                    onClick={() =>
                      deletePositionSkillHandler(skill.skillsetId, idx)
                    }
                  >
                    <MdDeleteOutline
                      style={{ width: "24px", height: "24px" }}
                    />
                  </TablebodyCellSkillButtonDelete>
                </TableDropDownBodyRow>
              ))}
            </TableBodyInner>
            {/* </Table> */}
            {/* </TablebodyCellDrop> */}
          </TablebodyCellDropRow>
          <UserPositionDeleteComponent
            popup={popup}
            closeModalHandler={closeModalHandler}
            onDeletePositionSkill={onDeletePositionSKill}
          />
        </React.Fragment>
      )}
    </div>
  );
};

const UserSkillComponent = ({ title, data }) => {
  // if(data){
  //   console.log(data,'asadasdasdsad')
  // }
  const [skill, setSkill] = useState([]);
  const history = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const userId = JSON.parse(localStorage.getItem("userId"));

  console.log(data, "skills");
  // const [showModal, setShowModal] = useState(false);
  const [popup, setPopup] = useState({
    show: false, // initial values set to false and null
    id: null,
    idx: null,
    item: null,
  });
  // const userId = JSON.stringify(localStorage.getItem('userId'))
  const openModalHandler = (idx, id, item) => {
    // setShowModal(true);
    setPopup({ show: true, id, idx, item });
  };

  const closeModalHandler = () => {
    setPopup({
      show: false,
      id: null,
      idx: null,
      item: null,
    });
  };

  const editSkillHandler = (id) => {
    // console.log(id);
    history(`/userchat/edit_position/${id}`, {
      state: {
        editSkill: id,
      },
    });
    // console.log(id);
  };

  const deletePositionHandler = (idx, flag, id) => {
    console.log(idx, flag, id);
    openModalHandler(idx, id, "position");
  };

  const onDeletePosition = async (idx, id) => {
    const token = JSON.parse(localStorage.getItem("userData"));
    const authorization = "Bearer " + token.token;
    let body = {
      positionId: id,
    };
    try {
      console.log(body);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER}deleteuserpositions`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            authorization: authorization,
          },
        }
      );
      const data = await response.json();
      if (data) {
        let temp = [...skill];
        temp.splice(idx, 1);
        setSkill(temp);
        setPopup({
          show: false,
          id: null,
          idx: null,
          item: null,
        });
      }
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(userId);
  const pathToCaty = `/userchat/add_position/${userId}`;
  // const skill = data;
  useEffect(() => {
    if (data) {
      setSkill(data);
    }
  }, [data]);
  console.log(data, "fix");
  if (data) {
    return (
      <React.Fragment>
        <Card>
          <SkillInfoOuterWrapper>
            <HeadingWrapper>
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ width: "50%" }}>Positions</div>

                <ButtonWrapper>
                  <Link
                    to={pathToCaty}
                    state={{ addGoal: "True" }}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button>
                      <ButtonInner>
                        <GoalAdd>Add New Position</GoalAdd>
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
            </HeadingWrapper>
            <SkillBulletinOuterWrapper>
              <Table>
                <Tablehead>
                  <Tablerow>
                    <Tablecell style={{ fontWeight: "600" }}>
                      Position Name
                    </Tablecell>
                    <Tablecell style={{ fontWeight: "600" }}>
                      Experience
                    </Tablecell>
                    <Tablecell style={{ fontWeight: "600" }}>Edit</Tablecell>
                    <Tablecell style={{ fontWeight: "600" }}>Delete</Tablecell>
                  </Tablerow>
                </Tablehead>
                <Tablebody>
                  {skill.map((val, idx) => (
                    <SkillSetWrap key={idx}>
                      <ExpandableTableRow
                        key={idx}
                        goalComponents={val.skillset}
                      >
                        <SingleSkill style={{ width: "36%" }}>
                          {val.position}
                        </SingleSkill>
                        <SingleSkill style={{ width: "40%" }}>
                          {val.positionExperience == 1
                            ? val.positionExperience + " year"
                            : val.positionExperience + " years"}
                        </SingleSkill>
                        <SingleSkillEdit
                          onClick={() =>
                            editSkillHandler(
                              val.skillset[0]?.userpositionPositionId
                            )
                          }
                        >
                          <BsPencilFill />
                        </SingleSkillEdit>
                        <TablebodyCellButtonDelete
                          onClick={() =>
                            deletePositionHandler(idx, true, val.positionId)
                          }
                        >
                          <MdDeleteOutline
                            style={{ width: "24px", height: "24px" }}
                          />
                        </TablebodyCellButtonDelete>
                      </ExpandableTableRow>
                    </SkillSetWrap>
                  ))}
                </Tablebody>
              </Table>
            </SkillBulletinOuterWrapper>
          </SkillInfoOuterWrapper>
        </Card>
        <UserPositionDeleteComponent
          popup={popup}
          closeModalHandler={closeModalHandler}
          onDeletePosition={onDeletePosition}
        />
      </React.Fragment>
    );
  } else {
    return (
      <Card>
        <SkillInfoOuterWrapper>
          <HeadingWrapper>{title}</HeadingWrapper>
          <SkillBulletinOuterWrapper>Empty list</SkillBulletinOuterWrapper>
        </SkillInfoOuterWrapper>
      </Card>
    );
  }
};

export default UserSkillComponent;
