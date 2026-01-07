import ModalCreateUser from "./ModalCreateUser";
import "../../../assets/styles/Manage/ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";

const ManageUser = (props) => {
  const [showmodal, setShowModal] = useState(false);

  return (
    <>
      <div className="manageuser-container">
        <div className="manageuser-title">Manage User</div>
        <div className="manageuser-content">
          <div className="btn-add-new">
            <button className="btn btn-dark" onClick={() => setShowModal(true)}>
              <FcPlus /> Add new user
            </button>
          </div>
          <div className="table-add-newuser">table</div>
          <ModalCreateUser show={showmodal} setShow={setShowModal} />
        </div>
      </div>
    </>
  );
};

export default ManageUser;
