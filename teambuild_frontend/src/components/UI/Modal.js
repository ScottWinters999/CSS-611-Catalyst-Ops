import React from "react";
import ReactDOM from "react-dom";
// import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./Modal.css";

const ModalOverlay = (props) => {
  console.log(props.modalWrapper);
  const content = (
    <div className={`modal `} style={props.modalWrapper}>
      <header className={`modal__header `} style={props.modalHeader}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
        style={{height: "64%"}}
      >
        <div className={`modal__content`} style={props.contentClass}>
          {props.children}
        </div>
        <footer className={`modal__footer`} style={props.footerClass}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      {/* <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      > */}
      {props.show && <ModalOverlay className="modal" {...props} />}

      {/* </CSSTransition> */}
    </React.Fragment>
  );
};

export default Modal;
