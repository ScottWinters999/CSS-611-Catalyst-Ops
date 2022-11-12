import styled from "styled-components";
import { useForm } from "../../hooks/form-hook";
import ImageUpload from "./imageUpload/ImageUpload";
import Card from "../UI/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { BsPencilFill, BsCheckLg } from "react-icons/bs";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const UserInfoOuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 86%;
  padding: 20px 8px;
  // padding: 29px;
  margin: 32px 50px;
  border-radius:4px;
  // box-shadow: -1px 8px 65px 0px rgb(164 164 181 / 58%);
}
  @media (max-width: 1200px) {
    padding: 20px 16px;
  }
`;
const UserNameContainer = styled.div`
  display: flex;
  height: 36%;
  flex-direction: row;
`;

const UserProfilePhotoWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: flex-end;
`;

const UserProfileNameOutsideWrapper = styled.div`
  width: 60%;
`;

const UserProfileNameInsideWrapper = styled.div`
  color: blue;
  font-weight: 700;
  font-family: "PT Serif", serif;
  font-size: 36px;
`;

const Hr = styled.hr`
  size: 8;
  width: 100%;
  color: #bcbcbc;
`;

const UserProfileLocationWrapper = styled.div`
  color: #c8c3c3;
  font-size: 12px;
`;

const UserProfileInfoWrapper = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  padding: 4px 26px;
  @media (max-width: 1200px) {
    padding: 4px 4px;
  }
`;

const UserProfileInfoBulletinWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 13px;
  font-family: "PT Serif", serif;
  font-weight: 400;
  flex-grow: 1;
  padding: 4px 0px;
`;

const UserProfileInfoBulletinInnerWrapper = styled.div`
  width: 40%;
  font-weight: 600;
`;
const Pencil = styled.div`
  padding: 0px;
  margin-left: 12px;
  margin-right: 12px;
  height: 0px;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
`;

const Control = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  width: 74%;
  padding: 2px 4px 6px 2px;
  label {
    font-size: 16px;
    display: block;
    color: white;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-family: "Montserrat", sans-serif;
  }
  input {
    font: inherit;
    border-radius: 4px;
    border: 1px solid white;
    width: 100%;
    height: 30px;
    text-align: left;
    padding: 0.25rem;
  }
  @media (max-width: 540px) {
    width: 100%;
  }
`;

const Errortext = styled.p`
  font-family: "Montserrat", sans-serif;
  color: #d8c1c1;
  font-size: 14px;
  font-weight: bold;
`;

// const useStyles = makeStyles(() =>
//   createStyles({
//     textfield: {
//       backgroundColor: 'red',
//     },
//   }),
// );

const UserInfoComponent = ({ userData }) => {
  // console.log(props)
  // const basicInfo = props.userData;
  // const classes = useStyles();
  const [isEdit, setIsEdit] = useState(false);
  const basicInfo = userData;
  const token = JSON.parse(localStorage.getItem("userData"));
  const headers = {
    authorization: "Bearer " + token.token,
    "Content-Type": "application/json",
  };
  // if (props){
  //   setName(basicInfo.userName)
  //   console.log(name,basicInfo.userName,basicInfo)
  // }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isnameInvalid, setIsnameInvalid] = useState(false);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [industry, setIndustry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  useEffect(() => {
    if (userData) {
      // console.log("140");
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setCity(userData.city);
      setState(userData.state);
      setCountry(userData.country);
      setCurrentPosition(userData.currentPosition);
      setIndustry(userData.industry);
      setPhone(userData.phone);
      setEmail(userData.email);
    }
  }, [userData]);

  useEffect(() => {
    const userPhoto = async () => {
      try {
        fetch("http://localhost:5000/api/getpicture", { headers: headers })
          .then((res) => {
            // console.log(res)
            return res.json();
          })
          .then((res) => {
            // console.log(res);
            if (res.image) {
              const imgUrl = "http://localhost:5000/upload/images/" + res.image;
              // console.log(imgUrl)
              setPhotoUrl(imgUrl);
            }

            // setLoadedUserInfo(res.userData);
          });
        // responseData.t
        // responseData./
        // console.log(responseData,'aa')
        // setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    userPhoto();
  }, []);

  const setEditOnHandler = () => {
    // console.log(isEdit);
    setIsEdit((prev) => {
      return !prev;
    });
  };

  const onNameChangeHandler = (event) => {
    // console.log(event.target.value.length);
    let name = event.target.value.trim();

    if (name.length <= 0) {
      setIsnameInvalid(true);
    }
    if (isnameInvalid) {
      setIsnameInvalid(false);
    }
    setFirstName(event.target.value);
  };

  const onCityChangeHandler = (event) => {
    // console.log(event.target);
    setCity(event.target.value);
  };
  const onStateChangeHandler = (event) => {
    // console.log(event.target);
    setState(event.target.value);
  };
  const onCountryChangeHandler = (event) => {
    // console.log(event.target);
    setCountry(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log("hi");
    if (isnameInvalid) {
      return;
    }

    const body = {
      firstName: firstName,
      lastName: lastName,
      currentPosition: currentPosition,
      industry: industry,
      phoneNumber: phone,
      city: city,
      state:  state,
      country: country
    };
    console.log(body)

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER}userupdate`,
        {
          method: "PATCH",
          body: JSON.stringify(body),
          headers: headers,
        }
      );
      const data = await response.json();
      // console.log(data);
      if (data) {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
    // fetch(process.env.BACKEND_SERVER)

    setEditOnHandler();
  };

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );
  // console.log(basicInfo);
  return (
    <Card>
      <UserInfoOuterWrapper>
        <UserNameContainer>
          <UserProfilePhotoWrapper>
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              header="Image Upload"
              isEdit={isEdit}
              img={photoUrl}
            />
          </UserProfilePhotoWrapper>
          <UserProfileNameOutsideWrapper>
            {/* <UserProfileNameInsideWrapper>
              {basicInfo.userName}
            </UserProfileNameInsideWrapper> */}
            <Pencil>
              {isEdit && <BsCheckLg type="button" onClick={submitHandler} />}
              {!isEdit && (
                <BsPencilFill type="button" onClick={setEditOnHandler} />
              )}
            </Pencil>
            {isEdit && (
              <TextField
                error={false}
                id="standard-basic"
                // label="Name"
                // className={classes.textfield}
                variant="standard"
                size="small"

                value={firstName}
                helperText={isnameInvalid ? "Enter a valid name" : ""}
                onChange={onNameChangeHandler}
              />
            )}
            {!isEdit && (
              <UserProfileNameInsideWrapper>
                {firstName}
              </UserProfileNameInsideWrapper>
            )}

            <UserProfileLocationWrapper>
              {isEdit && (
                <TextField
                  id="standard-basic"
                  label="City"
                  variant="standard"
                  size="small"
                  height="4px"
                  value={city}
                  onChange={onCityChangeHandler}
                />
              )}
              {isEdit && (
                <TextField
                  id="standard-basic"
                  label="State"
                  variant="standard"
                  size="small"
                  height="4px"
                  value={state}
                  onChange={onStateChangeHandler}
                />
              )}
              {!isEdit && <React.Fragment>{city}</React.Fragment>}
              {!isEdit && <React.Fragment>{state}</React.Fragment>}
            </UserProfileLocationWrapper>
            <UserProfileLocationWrapper>
              {isEdit && (
                <TextField
                  id="standard-basic"
                  label="Country"
                  variant="standard"
                  size="small"
                  value={country}
                  onChange={onCountryChangeHandler}
                />
              )}
              {!isEdit && <React.Fragment>{country}</React.Fragment>}
            </UserProfileLocationWrapper>
          </UserProfileNameOutsideWrapper>
        </UserNameContainer>
        <Hr />
        <UserProfileInfoWrapper>
          {/* <div> */}
          <UserProfileInfoBulletinWrapper>
            <UserProfileInfoBulletinInnerWrapper>
              Current position :
            </UserProfileInfoBulletinInnerWrapper>
            {!isEdit && <div>{currentPosition}</div>}
            {isEdit && (
              <TextField
                id="standard-basic"
                variant="standard"
                size="small"
                value={currentPosition}
                onChange={(event) => {
                  setCurrentPosition(event.target.value);
                }}
              />
            )}
          </UserProfileInfoBulletinWrapper>
          <UserProfileInfoBulletinWrapper>
            <UserProfileInfoBulletinInnerWrapper>
              Industry :
            </UserProfileInfoBulletinInnerWrapper>
            {!isEdit && <div>{industry}</div>}
            {isEdit && (
              <TextField
                id="standard-basic"
                variant="standard"
                size="small"
                value={industry}
                onChange={(event) => {
                  setIndustry(event.target.value);
                }}
              />
            )}
          </UserProfileInfoBulletinWrapper>
          <UserProfileInfoBulletinWrapper>
            <UserProfileInfoBulletinInnerWrapper>
              Phone :
            </UserProfileInfoBulletinInnerWrapper>
            {!isEdit && <div>{phone}</div>}
            {isEdit && (
              <TextField
                id="standard-basic"
                variant="standard"
                size="small"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />
            )}
          </UserProfileInfoBulletinWrapper>
          <UserProfileInfoBulletinWrapper>
            <UserProfileInfoBulletinInnerWrapper>
              Email:
            </UserProfileInfoBulletinInnerWrapper>
            <div>{email}</div>
          </UserProfileInfoBulletinWrapper>
          {/* </div> */}
        </UserProfileInfoWrapper>
      </UserInfoOuterWrapper>
    </Card>
  );
};

export default UserInfoComponent;
