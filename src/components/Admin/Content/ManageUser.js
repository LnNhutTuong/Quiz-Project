import ModalCreateUser from "./ModalCreateUser";
import "../../../assets/styles/Manage/ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUser } from "../../../services/apiServices";

const ManageUser = (props) => {
  const [showmodal, setShowModal] = useState(false);
  const [listuser, setListUser] = useState([]);

  useEffect(async () => {
    fetchListUser();
  }, []);

  const fetchListUser = async () => {
    let res = await getAllUser();
    if (res.EC == 0) {
      setListUser(res.DT);
    }
  };

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
          <div className="table-add-newuser">
            <TableUser listuser={listuser} />
          </div>
          <ModalCreateUser
            show={showmodal}
            setShow={setShowModal}
            fetchListUser={fetchListUser}
          />
        </div>
      </div>
    </>
  );
};

export default ManageUser;
