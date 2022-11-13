import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import styled from "styled-components";
import Card from "../UI/Card";
import { BsPencilFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { width } from "@mui/system";




const SkillInfoOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 24px;

  @media (max-width: 760) {
    align-items: center;
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
  margin: 4px 14px;
  padding: 10px 18px;
  border-radius: 4px;
`;

const SingleSkill = styled.div`
  display: flex;
  justify-content: space-around;
`;

const SingleSkillEdit = styled.div`
  display: flex;
  justify-content: space-around;
  width: 20%;
  margin-left: 36px;
  align-items: center;
  height: 36px;
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
  width: 50%;
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


// const ExpandableTableRow = ({goalComponents}) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [goalComponentList, setGoalComponentList] = useState([]);
//   // const classes = useStyles();
// console.log(goalComponents,"passed")
//   useEffect(() => {
//     if (goalComponents) {
//       setGoalComponentList(goalComponents);
//       console.log(goalComponentList,"skillset")
//     }
//   }, [goalComponents]);
//   console.log(goalComponentList,"skillset")


//   return(
//     <div>
//         <div>
//           <div>Skillset</div>
//           <div>Experience</div>
//         </div>
//         {goalComponentList.map((skill,idx)=>(
//           <div>
//           <div>{skill.skillset}</div>
//           <div>{skill["experience"]}</div>
//         </div>
//         ))}
//     </div>
//   );
// };
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

  useEffect(() => {
    if (goalComponents) {
      setGoalComponentList(goalComponents);
    }

    console.log(goalComponentList);
  }, [goalComponents]);
  return (
    <div style={{ padding: "4px", marginTop: "22px" ,width:"100%"}}>
      <TablebodyRow {...otherProps}>
        <TablebodyCell style={{ width: "8%" }}>
          <ArrowWrapper onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <AiOutlineArrowUp style={{
    height: "1em",
    width: "1em"
}}/> : <AiOutlineArrowDown />}
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
                Experience in Years
              </TablebodyCellInner>
              {/* <TablebodyCell align="right">Fat&nbsp;(g)</TablebodyCell>
                <TablebodyCell align="right">Carbs&nbsp;(g)</TablebodyCell>
                <TablebodyCell align="right">Protein&nbsp;(g)</TablebodyCell> */}
            </TableDropDownBodyRow>
          </Tableheader>
          <TableBodyInner>
            {goalComponentList.map((skill, idx) => (
              <TableDropDownBodyRow key={idx}>
                <TablebodyCellInner>
                  {skill.skillset}
                </TablebodyCellInner>
                <TablebodyCellInner>
                  {skill.experience}
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




const UserSkillComponent = ({ title, data }) => {
  // if(data){
  //   console.log(data,'asadasdasdsad')
  // }
  const [skill, setSkill] = useState([]);
  const history = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  console.log(data,"skills")
  const editSkillHandler = (id) => {
    history("/userchat", {
      state: {
        editSkill: id,
      },
    });
    console.log(id);
  };


  // const skill = data;
  useEffect(() => {
    if (data) {
      setSkill(data);
    }
  }, [data]);
  console.log(data,"fix")
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
                      {val.positionExperience}
                    </SingleSkill>
                    <SingleSkillEdit>
                      <BsPencilFill onClick={() => editSkillHandler(val?.skillsetId)} />
                    </SingleSkillEdit>
                    </ExpandableTableRow>
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
