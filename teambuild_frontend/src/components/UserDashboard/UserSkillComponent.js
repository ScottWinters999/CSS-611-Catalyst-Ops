import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import styled from "styled-components";
import Card from "../UI/Card";
import { BsPencilFill } from "react-icons/bs";


const SkillInfoOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 24px;

  @media (max-width: 760) {
    align-items: center;
  }
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

const Table = styled.table`
  border: 2px solid #bcbcbc;
  //   width: 800px;
  //   height: 200px;
  // color: #9f9f9f;
  
  overflow-y: scroll;
  color: #000000;
`;

const UserSkillComponent = ({ title, data }) => {
  console.log(data, "aaaaaaaaaaaaaaaaa");
  const skill = data.items;
  if (data) {
    // skill.map((val, key) => {
    //   console.log(val, key);
    // });

    const listItems = skill.map((val, key) => (
      <SkillBulletin key={key}>
        <span>{val.skillset}</span> - <span>{val.experience}</span>
      </SkillBulletin>
    ));

    return (
      <Card>
        <SkillInfoOuterWrapper>
          <HeadingWrapper>{title}</HeadingWrapper>
          <SkillBulletinOuterWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{"font-size": "20px"}}>Skill Name</TableCell>
                  <TableCell style={{"font-size": "20px"}}>Experience</TableCell>
                  <TableCell style={{"font-size": "20px"}}>Edit</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {skill.map((val, key) => (
                  <TableRow kry={key}>
                  <TableCell style={{"font-size": "18px"}}>{val.skillset}</TableCell>
                  <TableCell style={{"font-size": "18px"}}>{val.experience}</TableCell>
                  <TableCell align="left" >
                      <BsPencilFill/>
                    </TableCell>
                </TableRow>
                  
                ))}
                
              </TableBody>
            </Table>
          </SkillBulletinOuterWrapper>
        </SkillInfoOuterWrapper>
      </Card>
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
