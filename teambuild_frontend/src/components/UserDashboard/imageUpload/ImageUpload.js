import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

import { BsPencilFill } from "react-icons/bs";
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

const Pick = styled.p`
  height: 54px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px;
  width: 70%;
  padding: 6px 6px;
  border: 1px solid;
`;

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [errorUpload, setErrorUpload] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [profilePhotoUrl, setProfilePhotoUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

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
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    // filePickerRef.current.click();
    openModalHandler();
  };

  const uploadImageHandler = () => {
    filePickerRef.current.click();
  };

  const uploadImageButtonHandle = () => {
    if (!previewUrl) {
      setErrorUpload(true);
    }
    setProfilePhotoUrl(previewUrl);
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
    if (profilePhotoUrl){
      setPreviewUrl(profilePhotoUrl)
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
      {profilePhotoUrl && (
        <RemoveButton onClick={removeImageButtonHandle}>Remove</RemoveButton>
      )}
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
        header={props.header}
        footerClass={ItemActions}
        footer={modalFooter}
      >
        <div className="form-control">
          <input
            id={props.id}
            ref={filePickerRef}
            style={{ display: "none" }}
            type="file"
            accept=".jpg,.png,.jpeg"
            onChange={pickedHandler}
          />
          <div
            className={`image-upload ${props.center && "center"}`}
            onClick={uploadImageHandler}
          >
            <div className="image-upload__preview">
              {previewUrl && <img src={previewUrl} alt="Preview" />}
              {!previewUrl && <p>Please pick an image.</p>}
            </div>

            {/* <Button >
          PICK IMAGE
        </Button> */}
          </div>
          {!isValid && <p>{props.errorText}</p>}
        </div>
      </Modal>
      <div className="image-upload__onprofile">
        {profilePhotoUrl && <img src={profilePhotoUrl} alt="Preview" />}
        {!profilePhotoUrl && <Pick>Please pick an image.</Pick>}
      </div>
      <Pencil>
        <BsPencilFill type="button" onClick={pickImageHandler} />
      </Pencil>
    </React.Fragment>
  );
};

export default ImageUpload;
