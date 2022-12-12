import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

import { BsPencilFill } from "react-icons/bs";
import { RiUpload2Fill } from "react-icons/ri";

import { CgProfile } from "react-icons/cg";
// import { env } from 'process';
// import Button from './Button';
import "./ImageUpload.css";
import Modal from "../../UI/Modal";

const CloseButton = styled.button`
  cursor: pointer;
  border: none;
  background: #a7a4a4;
  padding: 0.5rem;
  /* font: inherit; */
  margin: 2px 4px;
  color: white;
  font-family: "Roboto";
  font-weight: 600;
  border-radius: 4px;
  & :hover {
    background: #17583b;
    color: #ffffff;
  }
`;

const DeleteButton = styled.button`
  cursor: pointer;
  border: none;
  background: #d13c3c;
  padding: 0.5rem;
  /* font: inherit; */
  margin: 2px 4px;
  color: white;
  font-family: "Roboto";
  font-weight: 600;
  border-radius: 4px;
  & :hover {
    background: #17583b;
    color: #ffffff;
  }
`;

const UploadButton = styled.button`
  cursor: pointer;
  /* border: 1px solid #292929; */
  background: #19a219;
  padding: 0.5rem;
  font: inherit;
  margin: 2px 4px;
  border-radius: 4px;
  border: none;
  color: white;
  font-size: large;
  font-family: "Roboto";
  font-weight: 600;

  UploadButton& :hover {
    background: #4c7d43f5;
    color: #ffffff;
  }
  &:disabled,
  [disabled] {
    background-color: #cccccc;
    color: #ffffffa6;
  }
`;

const RemoveButton = styled.button`
  cursor: pointer;
  background: #e46464;
  padding: 0.5rem;
  font: inherit;
  margin: 2px 4px;
  border-radius: 4px;
  border: none;
  color: white;
  font-size: large;
  font-family: "Roboto";
  font-weight: 600;

  & :hover {
    background: #a92c2c;
    color: #ffffff;
  }
`;

const ItemActions = {
  padding: "2px",
  // "text-align": "center",
  // "border-top": "1px solid #ccc",
};

const ItemModal = {
  padding: "0",
  height: "100%",
};

// styled.
// const ModalHeader = styled.div`
//   height: 18%;
// `;

const ModalHeader = {
  height: "18%",
  // "font-family": "Montserrat",
};

const ModalWrapper = {
  height: "34%",
};

const Pencil = styled.div`
  padding: 0px;
  margin-left: 12px;
  margin-right: 12px;
  height: 20px;
  cursor: pointer;
`;

const Pick = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  margin-top: 25%;
  width: 100px;
  justify-content: center;
  border-radius: 50%;
`;

const Pick2 = styled.div`
  height: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding: 0px;
  width: 86%;
  padding: 6px 6px;
`;

const ImageUpload = ({ center, header, id, isEdit, onInput, img }) => {
  const [file, setFile] = useState();
  const [errorUpload, setErrorUpload] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [profilePhotoUrl, setProfilePhotoUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  // console.log(img, "ii");

  // const {isEdit} = props.isEdit
  // console.log(isEdit);
  const filePickerRef = useRef();

  const [currentImg, setImg] = useState("");
  useEffect(() => {
    if (img) {
      setPreviewUrl(img);
      setProfilePhotoUrl(img);
    }
  }, [img]);

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    // filePickerRef.current.click();
    if (!isEdit) {
      return;
    }
    openModalHandler();
  };

  const uploadImageHandler = () => {
    filePickerRef.current.click();
  };

  const uploadImageButtonHandle = async () => {
    if (!previewUrl) {
      setErrorUpload(true);
    }
    console.log('hiii')
    const token = JSON.parse(localStorage.getItem("userData"));
    const headers = {
      authorization: "Bearer " + token.token,
      Accept : 'application/json'
    };
    const formData = new FormData();
    formData.append("image", file);
    console.log(process.env.REACT_APP_BACKEND_SERVER);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER}upload`,
        {
          method: "POST",
          body: formData,
          headers: headers,
        }
      );
      const data = await response;
      if (data) {
        console.log(data.status);
        setProfilePhotoUrl(previewUrl);
      }
      //console.log(data);
      // if(data)
    } catch (err) {
      console.log(err);
    }

    closeModalHandler();
  };

  const removeImageButtonHandle = () => {
    if (!previewUrl) {
      // setErrorUpload(true);
      return;
    }
    setProfilePhotoUrl(null);
    setPreviewUrl(null);
    closeModalHandler();
  };

  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => {
    if (profilePhotoUrl) {
      setPreviewUrl(profilePhotoUrl);
    }
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setPreviewUrl(null);
    setShowModal(false);
  };
  const modalFooter = (
    <React.Fragment>
      <UploadButton onClick={uploadImageButtonHandle} disabled={!previewUrl}>
        Upload
      </UploadButton>
      {/* {profilePhotoUrl && (
        <RemoveButton onClick={removeImageButtonHandle}>Remove</RemoveButton>
      )} */}
      <DeleteButton onClick={removeImageButtonHandle}>Delete</DeleteButton>
      <CloseButton onClick={closeModalHandler}>Close</CloseButton>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <Modal
        show={showModal}
        modalWrapper={ModalWrapper}
        onCancel={closeModalHandler}
        modalHeader={ModalHeader}
        contentClass={ItemModal}
        header={header}
        footerClass={ItemActions}
        footer={modalFooter}
      >
        <div className="form-control">
          <input
            id={id}
            ref={filePickerRef}
            style={{ display: "none" }}
            type="file"
            accept=".jpg,.png,.jpeg"
            onChange={pickedHandler}
          />
          <div
            className={`image-upload ${center && "center"}`}
            onClick={uploadImageHandler}
          >
            <div className="image-upload__preview">
              {previewUrl && <img src={previewUrl} alt="Preview" />}
              {!previewUrl && <p>Click here to upload the image.</p>}
              {/* {<p>Click here to upload the image.</p>} */}
            </div>

            {/* <Button >
          PICK IMAGE
        </Button> */}
          </div>
          {/* {!isValid && <p>'error'</p>} */}
        </div>
      </Modal>
      <div className="image-upload__onprofile">
        {profilePhotoUrl && (
          <img src={profilePhotoUrl} onClick={pickImageHandler} alt="Preview" />
        )}
        {!profilePhotoUrl && (
          <React.Fragment>
            {isEdit && (
              <Pick
                className={isEdit ? "edit_form" : ""}
                onClick={pickImageHandler}
              >
                <RiUpload2Fill
                  className={`edit_icon ${isEdit ? "edit_icon_active" : ""}`}
                />
              </Pick>
            )}
            {!isEdit && (
              <Pick2
                className={isEdit ? "edit_form" : ""}
                onClick={pickImageHandler}
              >
                <CgProfile style={{ height: "3rem", width: "3rem" }} />
              </Pick2>
            )}
          </React.Fragment>
        )}
      </div>
      {/* {isEdit &&<Pencil>
        <BsPencilFill type="button" onClick={pickImageHandler} />
      </Pencil> }  */}
    </React.Fragment>
  );
};

export default ImageUpload;
