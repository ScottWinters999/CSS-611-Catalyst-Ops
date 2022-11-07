import {
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import styled from "styled-components";
import Card from "../UI/Card";

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

const ExpandableTableRow = ({ children, goalComponents, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [goalComponentList, setGoalComponentList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (goalComponents) {
      setGoalComponentList(goalComponents);
    }

    console.log(goalComponentList);
  }, [goalComponents]);
  return (
    <div style={{ padding: "4px", marginTop: "22px" }}>
      <TablebodyRow {...otherProps}>
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
                  {singleGoalComponent.goalComponent}
                </TablebodyCellInner>
                <TablebodyCellInner>
                  {singleGoalComponent.matchedUser}
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
  const history = useNavigate();
  useEffect(() => {
    if (data) {
      const groupBy = (key) => (array) =>
        array.reduce((objectsByKeyValue, obj) => {
          const value = obj[key];
          objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(
            obj
          );
          return objectsByKeyValue;
        }, {});
      const groupByGoal = groupBy("goal");
      let total = groupByGoal(data);
      console.log(total);
      if (Object.keys(total).length > 0) {
        // console.log("lengthhh");
        const currentUserGoals = [];
        Object.keys(total).forEach((key, idx) => {
          let temp = {};
          // console.log(total[key])
          let goalName = key;

          // let goalComponents = []
          let goalComponents = total[key].map((val) => {
            // console.log(val,'sss')
            return {
              goalComponent: val["goalComponent"],
              matchedUser: val["matchedUser"],
              goalComponentId: val["goalComponentId"],
            };
          });
          let currentGoalStatus = total[key].reduce((val, userGoal) => {
            console.log(val, userGoal, "asasassdsads  ");
            let ifMatchedUser = 0;
            // userGoal['matchedUser'] = 'a'
            console.log(userGoal["matchedUser"], "aaa");
            if (
              "matchedUser" in userGoal &&
              userGoal["matchedUser"].length > 0
            ) {
              ifMatchedUser = 1;
              // console.log('nnnnnnnnnnnnnnnnnnnnnnnnnn')
            }
            return val + ifMatchedUser;
            // return val['matchedUser'].length
          }, 0);
          let totalGoalComponents = goalComponents.length;
          let status = `${currentGoalStatus} / ${totalGoalComponents}`;
          console.log(status, "required");
          temp = {
            name: goalName,
            status: status,
            goalComponents: goalComponents,
            goalId: total[key][0]["goalId"],
          };
          currentUserGoals.push(temp);
        });
        console.log(currentUserGoals, "current");
        setTotalGoals(currentUserGoals);
      }
    }
  }, [data]);

  const deleteButtonHandler = async (idx) => {
    console.log(totalGoals[idx]);
    const goalId = totalGoals[idx]["goalId"];
    console.log(goalId);
    const body = {
      goalId: goalId,
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
        setTotalGoals((prev) => prev.filter((goal) => goal.goalId !== goalId));
      }
    } catch (err) {
      console.log(err);
    }

    // const index = array.indexOf(idx);
    // if (index > -1) { // only splice array when item is found
    //   array.splice(index, 1); // 2nd parameter means remove one item only
    // }
  };

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
                      goalComponents={row?.goalComponents}
                    >
                      <TablebodyCellWrapper>
                        <TablebodyCell
                          style={{ width: "36%", marginLeft: "2%" }}
                        >
                          {row.name}
                        </TablebodyCell>
                        <TablebodyCell>{row.status}</TablebodyCell>
                        <TablebodyCellEdit>
                          <BsPencilFill onClick={() => editGoalHandler(idx)} />
                        </TablebodyCellEdit>
                        <TablebodyCellButtonDelete
                          onClick={() => deleteButtonHandler(idx)}
                        >
                          <MdDeleteOutline
                            style={{ width: "24px", height: "24px" }}
                          />
                        </TablebodyCellButtonDelete>
                      </TablebodyCellWrapper>
                    </ExpandableTableRow>
                  ))}
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
