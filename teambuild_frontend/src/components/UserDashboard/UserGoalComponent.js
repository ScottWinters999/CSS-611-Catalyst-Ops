import styled from "styled-components";
import Card from "../UI/Card";

const GoalsOutsideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const CardInnerWrapper = styled.div`
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 100%;
  padding: 20px 24px;
`;

const GoalHeader = styled.div`
  color: blue;
  font-weight: 500;
  font-family: "Roboto";
  font-size: 24px;
  padding: 8px 0px;
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

const UserGoalComponent = (props) => {
  // const data = [
  //   { name: "Anom", age: 19, gender: "Male" },
  //   { name: "Megha", age: 19, gender: "Female" },
  //   { name: "Subham", age: 25, gender: "Male" },
  // ];
  const data = props.data
  return (
    <GoalsOutsideWrapper>
      <Card>
        <CardInnerWrapper>
          <GoalHeader>Goals</GoalHeader>
          <Table>
            <tbody>
            <tr>
              <Th>Team Name</Th>
              <Th>Matched With</Th>
              <Th>Status</Th>
            </tr>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <Td>{val.teamName}</Td>
                  <Td>{val.matchedWith}</Td>
                  <Td>{val.status}</Td>
                </tr>
              );
            })}
            </tbody>
          </Table>
        </CardInnerWrapper>
      </Card>
    </GoalsOutsideWrapper>
  );
};

export default UserGoalComponent;
