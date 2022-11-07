import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MainContainer from "../layout/MainContainer";
import classes from "./ProfileViews.module.css";
import ProfileViewsCard from "./ProfileViewsCard";
import UserContext from "../../shared/context/user-context";
import { useState } from "react";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ProfileViews = (props) => {
  const userCtx = React.useContext(UserContext);
  const token = JSON.parse(localStorage.getItem("userData"));
  const headers = {
    authorization: "Bearer " + token.token,
  };
  console.log(headers, "222222");
  const [usersviewed, setUsersviewed] = useState([]);
  const [usersviewedAll, setUsersviewedAll] = useState([]);
  React.useEffect(() => {
    const userInfo = async () => {
      try {
        fetch("http://localhost:5000/api/userprofileview", { headers: headers })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            console.log(res);
            if (res) {
              if ("viewedData" in res) {
                const profileViewedData = res["viewedData"];

                let finalData = [];
                profileViewedData.forEach((val, idx) => {
                  // let temp = {};
                  // console.log(val["user"]);

                  if ("goalMapped" in val) {
                    val["goalMapped"].forEach((sg) => {
                      let temp = {};
                      console.log(sg);
                      Object.assign(temp, val["user"]);
                      temp["goalMapped"] = sg;
                      finalData.push(temp);
                    });
                  }
                  // console.log(temp, "asdasdfasfsdvfsdfvds");
                });
                console.log(finalData, "aasdadsd");
                setUsersviewed(finalData);
                setUsersviewedAll(finalData);
              }
            }
            // setLoadedUserInfo(res.userData);
          });
      } catch (err) {}
    };
    userInfo();
  }, []);

  const userContents = [
    {
      name: "John",
      industry: "Software",
      currentPosition: "Developer",
      Skillset: "Python",
      phone: "716324122",
      email: "john@john.com",
      location: "Buffalo,NY",
    },
    {
      name: "Mary",
      industry: "Business",
      currentPosition: "Manager",
      Skillset: "Marketing",
      phone: "716324868",
      email: "mary@mary.com",
      location: "Buffalo,NY",
    },
    {
      name: "Abraham",
      industry: "Human Resource",
      currentPosition: "HR",
      Skillset: "Management",
      phone: "716324315",
      email: "abraham@gmail.com",
      location: "Buffalo,NY",
    },
    {
      name: "John",
      industry: "Software",
      currentPosition: "Developer",
      Skillset: "Python",
      phone: "716324122",
      email: "john@john.com",
      location: "Buffalo,NY",
    },
    {
      name: "Mary",
      industry: "Business",
      currentPosition: "Manager",
      Skillset: "Marketing",
      phone: "716324868",
      email: "mary@mary.com",
      location: "Buffalo,NY",
    },
    {
      name: "Abraham",
      industry: "Human Resource",
      currentPosition: "HR",
      Skillset: "Management",
      phone: "716324315",
      email: "abraham@gmail.com",
      location: "Buffalo,NY",
    },
    {
      name: "John",
      industry: "Software",
      currentPosition: "Developer",
      Skillset: "Python",
      phone: "716324122",
      email: "john@john.com",
      location: "Buffalo,NY",
    },
    {
      name: "Mary",
      industry: "Business",
      currentPosition: "Manager",
      Skillset: "Marketing",
      phone: "716324868",
      email: "mary@mary.com",
      location: "Buffalo,NY",
    },
    {
      name: "Abraham",
      industry: "Human Resource",
      currentPosition: "HR",
      Skillset: "Management",
      phone: "716324315",
      email: "abraham@gmail.com",
      location: "Buffalo,NY",
    },
    {
      name: "John",
      industry: "Software",
      currentPosition: "Developer",
      Skillset: "Python",
      phone: "716324122",
      email: "john@john.com",
      location: "Buffalo,NY",
    },
    {
      name: "Mary",
      industry: "Business",
      currentPosition: "Manager",
      Skillset: "Marketing",
      phone: "716324868",
      email: "mary@mary.com",
      location: "Buffalo,NY",
    },
    {
      name: "Abraham",
      industry: "Human Resource",
      currentPosition: "HR",
      Skillset: "Management",
      phone: "716324315",
      email: "abraham@gmail.com",
      location: "Buffalo,NY",
    },
  ];

  const searchFilterInputHandler = (event) => {
    console.log(event.target.value);
    const lowercasedValue = event.target.value.toLowerCase().trim();
    if (lowercasedValue === "") {
      console.log("empty");
    } else {
      const excludeColumns = [
        "userUserId",
        "userProfileId",
        "updatedAt",
        "isPremiumUser",
        "createdAt",
      ];

      const includeColumns = [
        "firstName",
        "currentPosition",
        "goalMapped",
        "industry",
        "location",
      ];

      const filteredData = usersviewedAll.filter((item) => {
        console.log(Object.keys(item));
        return Object.keys(item).some((key) => {
          console.log(key, "keyaasdsadsad");
          console.log(excludeColumns, "key");

          return excludeColumns.includes(key)
            ? false
            : item[key]?.toString().toLowerCase().includes(lowercasedValue);
        });
      });
      console.log(filteredData);
      setUsersviewed(filteredData);
    }
  };
  return (
    <React.Fragment>
      <MainContainer>
        <header className={classes.Header}>
          Hi {userCtx.userName},See who all are looking at your profile
        </header>
        <div className={classes.SearchBarWrapper}>
          <div className={classes.SearchBarWrapperInner}>
            <input
              onChange={searchFilterInputHandler}
              placeholder="Type to search..."
            />
          </div>
        </div>
        <div className={classes.TableWrapper}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 4 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {usersviewed.map((val, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Item style={{ borderRadius: "16px" }}>
                    <ProfileViewsCard
                      name={val.firstName}
                      industry={val.industry}
                      currentPosition={val.currentPosition}
                      goalMapped={val.goalMapped}
                      phone={val.phoneNumber}
                      email={val.email}
                      location={val.location}
                    />
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </MainContainer>
    </React.Fragment>
  );
};

export default ProfileViews;
