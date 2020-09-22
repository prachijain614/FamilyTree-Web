import React, { useState } from 'react'
import { Modal, Button, } from 'react-bootstrap';
import AddFamily from '../Forms/AddFamily';
import AddMember from '../Forms/AddMember';

const FTModal = props => {
  const getForm = () => {
    switch (props.formName) {
      case 'AddFamily':
        return <AddFamily onHide={props.onHide} onSubmit={props.onSubmit}/>
      case 'AddMember':
        return <AddMember onHide={props.onHide} onSubmit={props.onSubmit}/>
      default:
        return <div></div>
    }
  }

  return (
    <div className="ModalPopup">
      <Modal
        {...props}
        size="md"
        className="ModalMain"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.show}
      >
        <Modal.Header>
          <Button className="closebtn" onClick={props.onHide}><span className="pongopay-close"></span></Button>
          {/* <a onPress={props.onHide}><span className="pongopay-close"></span></a> */}
          <Modal.Title id="contained-modal-title-vcenter">{props.headerTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { getForm()}
        </Modal.Body>
      </Modal>
    </div>

  )
}

FTModal.defaultProps = {
  formName: '',
  headerTitle:'Modal Title',
  onSubmit: () => {}
}
export default FTModal
