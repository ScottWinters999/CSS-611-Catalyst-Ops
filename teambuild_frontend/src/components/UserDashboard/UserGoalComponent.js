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

const GoalsOutsideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Table = styled.table`
  border: 2px solid #bcbcbc;
  //   width: 800px;
  //   height: 200px;
  // color: #9f9f9f;
  height: 100%;
  overflow-y: scroll;
  color: #000000;
`;
const Th = styled.th`
  border-bottom: 1px solid #bcbcbc;
`;
const Td = styled.td`
  text-align: center;
`;

const TableWrapper = styled.div`
  padding: 4px 8px;
  overflow-y: scroll;

  max-height: 280px !important;
  // &::-webkit-scrollbar{
  //   display: none;
  //   :hover & {
  //     display: show;
  //   }
  // }
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

const useStyles = makeStyles({
  tc: {
    padding: "8px",
    "font-family": "Roboto",
    "font-size": "18px",
  },
});

function createData(name, status, goalComponents) {
  return { name, status, goalComponents };
}

const rows = [
  createData("Web startup", "2/5", [
    {
      goalComponent: "Frontend",
      matchedWithUser: "John",
    },
  ]),
  createData("Web startup", "2/5", [
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
    <>
      <TableRow {...otherProps}>
        <TableCell>
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>

      {isExpanded && (
        <TableRow>
          <TableCell />
          <TableCell>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" className={classes.tc}>
                    Goal Component
                  </TableCell>
                  <TableCell align="right" className={classes.tc}>
                    Matched with
                  </TableCell>
                  {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {goalComponentList.map((singleGoalComponent, idx) => (
                  <TableRow key={idx}>
                    <TableCell align="left" className={classes.tc}>
                      {singleGoalComponent.goalComponent}
                    </TableCell>
                    <TableCell align="left" className={classes.tc}>
                      {singleGoalComponent.matchedWithUser}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

const UserGoalComponent = (props) => {
  const classes = useStyles();

  const data = props.data;
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
  const [isExpanded, setIsExpanded] = useState(false);
  // const listItems = numbers.map((number) => <li>{number}</li>);
  return (
    <GoalsOutsideWrapper>
      <Card style={{ "overflow-y": "scroll" }}>
        <CardInnerBox>
          <Header>Goals</Header>

          {/* <ThemeProvider theme={theme}> */}

          <TableWrapper>
            <Table aria-label="simple table" style={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tc} />
                  <TableCell style={{ width: "48%" }} className={classes.tc}>
                    Goal Name
                  </TableCell>
                  <TableCell align="right" className={classes.tc}>
                    Status
                  </TableCell>
                  <TableCell align="center" className={classes.tc}>
                    Edit
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, idx) => (
                  <ExpandableTableRow
                    key={idx}
                    goalComponents={row?.goalComponents}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.tc}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right" className={classes.tc}>
                      {row.status}
                    </TableCell>
                    <TableCell align="center" className={classes.tc}>
                      <BsPencilFill/>
                    </TableCell>
                  </ExpandableTableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
          {/* </ThemeProvider> */}
        </CardInnerBox>
      </Card>
    </GoalsOutsideWrapper>
  );
};

export default UserGoalComponent;
