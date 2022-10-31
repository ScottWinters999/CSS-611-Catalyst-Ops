import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import styled from "styled-components";
import Card from "../UI/Card";
import { BsPencilFill } from "react-icons/bs";
import { useEffect, useState } from "react";


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
  
  // if(data){
  //   console.log(data,'asadasdasdsad')
  // }

  const [skill,setSkill] = useState([])

  // const skill = data;
  useEffect(() =>{

    if(data){
      setSkill(data)

    }

  },[data])
  if (data) {
    

    return (
      <Card>
        <SkillInfoOuterWrapper>
          <HeadingWrapper>{title}</HeadingWrapper>
          <SkillBulletinOuterWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{"fontSize": "20px"}}>Skill Name</TableCell>
                  <TableCell style={{"fontSize": "20px"}}>Experience</TableCell>
                  <TableCell style={{"fontSize": "20px"}}>Edit</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {skill.map((val, key) => (
                  <TableRow key={key}>
                  <TableCell style={{"fontSize": "18px"}}>{val.skillset}</TableCell>
                  <TableCell style={{"fontSize": "18px"}}>{val.experience}</TableCell>
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
