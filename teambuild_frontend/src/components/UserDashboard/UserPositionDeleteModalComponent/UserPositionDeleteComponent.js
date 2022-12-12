import React from "react";
import { useState } from "react";
import Modal from "../../UI/Modal";
import classes from "../UserInfo.module.css";
import "../../UI/Modal.css";

const UserPositionDeleteComponent = ({
  popup,
  closeModalHandler,
  onDeletePosition,
  onDeletePositionSkill
  
}) => {
  // const [showModal, setShowModal] = useState(false);

  const ItemActions = {
    padding: "20px",
    height: "14%",
  };
  const ModalWrapper2 = {
    height: "20%",
    width: "30rem",
    left: "calc(50% - 15rem)",
    borderRadius: "10px",
  };

  const ItemModal2 = {
    padding: "0",
    height: "76%",
  };

  const ModalHeader = {
    height: "10%",
    // "font-family": "Montserrat",
    background: "#264ECA",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  };
  const deletecomponentHandler = () => {
    console.log("working", popup.id, popup.idx);
    onDeletePosition(popup.idx,popup.id);
  };

  const deletecomponentSkillHandler = () => {
    console.log("working", popup.id, popup.idx);
    onDeletePositionSkill(popup.idx,popup.id);
  };


  
  const header = (
    <React.Fragment>
      <div className={classes.ModalHeader}></div>
    </React.Fragment>
  );

  const modaldeleteFooter = (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          paddingTop: "12px",
        }}
      >
        <div
          style={{ width: "40%", display: "flex", justifyContent: "center" }}
        >
          {popup.item =='position'&&(
            <button className={`ButtonModal`} onClick={deletecomponentHandler}>
            yes
          </button>
          )}
          {popup.item =='skill'&&(
            <button className={`ButtonModal`} onClick={deletecomponentSkillHandler}>
            yes
          </button>
          )}
          
          
        </div>
        <div
          style={{ width: "40%", display: "flex", justifyContent: "center" }}
        >
          <button className={`ButtonModalClose`} onClick={closeModalHandler}>
            No
          </button>
        </div>
      </div>
    </React.Fragment>
  );

  // const openModalHandler = (value) => {
  //   setShowModal(true);
  //   console.log(value, "removal value final");
  //   // setIdValue(value);
  // };
  return (
    <Modal
      show={popup.show}
      modalWrapper={ModalWrapper2}
      onCancel={closeModalHandler}
      modalHeader={ModalHeader}
      contentClass={ItemModal2}
      header={header}
      footerClass={ItemActions}
      footer={modaldeleteFooter}
      height={"36%"}
    >
      <div className={classes.ModalMainContent}>
        <div className={classes.ModalMainInfoPosition}>
          <div className={classes.UserContentModal}>
            <div
              align="center"
              style={{
                fontSize: "25px",
                padding: "10px 20px 2px 20px",
                fontFamily: "ui-monospace",
              }}
            >
              {" "}
              Are you sure you want to delete{" "}
            </div>
          </div>
        </div>
        {/* {!isValid && <p>'error'</p>} */}
      </div>
    </Modal>
  );
};

export default UserPositionDeleteComponent;
