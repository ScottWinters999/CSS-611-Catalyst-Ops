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
}
`;
const SkillSetWrap = styled.div`
  display: flex;
`;

const SingleSkill = styled.div`
  display: flex;
  justify-content: space-around;
`;

const UserSkillComponent = ({ title, data }) => {
  // if(data){
  //   console.log(data,'asadasdasdsad')
  // }

  const [skill, setSkill] = useState([]);

  // const skill = data;
  useEffect(() => {
    if (data) {
      setSkill(data);
    }
  }, [data]);
  if (data) {
    return (
      <Card>
        <SkillInfoOuterWrapper>
          <HeadingWrapper>{title}</HeadingWrapper>
          <SkillBulletinOuterWrapper>
            <Table>
              <Tablehead>
                <Tablerow>
                  <Tablecell style={{ fontWeight: "600" }}>
                    Skill Name
                  </Tablecell>
                  <Tablecell style={{ fontWeight: "600" }}>
                    Experience
                  </Tablecell>
                  <Tablecell style={{ fontWeight: "600" }}>Edit</Tablecell>
                </Tablerow>
              </Tablehead>
              <Tablebody>
                {skill.map((val, key) => (
                  <SkillSetWrap key={key}>
                    <SingleSkill style={{ width: "36%" }}>{val.skillset}</SingleSkill>
                    <SingleSkill style={{ width: "40%" }}>
                      {val.experience}
                    </SingleSkill>
                    <SingleSkill style={{ width: "20%" }}>
                      <BsPencilFill />
                    </SingleSkill>
                  </SkillSetWrap>
                ))}
              </Tablebody>
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
