import styled from "styled-components";
import Card from "../UI/Card";

const SkillInfoOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 24px;
`;

const HeadingWrapper = styled.div`
  display: flex;

  //   height: 100%;

  flex-direction: row;
  padding: 20px 0px;
  color: blue;
  font-weight: 400;
  font-family: "Roboto";
  font-size: 24px;
`;

const SkillBulletinOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SkillBulletin = styled.div`
  padding: 4px 0px;
`;

const UserSkillComponent = (props) => {
  const skill = props.data.items;
  console.log(skill);
  skill.map((val, key) => {
    console.log(val, key);
  });

  const listItems = skill.map((val, key) => (
    <SkillBulletin key={key}>{val}</SkillBulletin>
  ));
  //   {
  //     data.map((val, key) => {
  //       return (
  //         <tr key={key}>
  //           <Td>{val.name}</Td>
  //           <Td>{val.age}</Td>
  //           <Td>{val.gender}</Td>
  //         </tr>
  //       );
  //     });
  //   }
  return (
    <Card>
      <SkillInfoOuterWrapper>
        <HeadingWrapper>{props.data.header}</HeadingWrapper>
        <SkillBulletinOuterWrapper>{listItems}</SkillBulletinOuterWrapper>
      </SkillInfoOuterWrapper>
    </Card>
  );
};

export default UserSkillComponent;
