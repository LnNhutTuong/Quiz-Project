import ModalCreateUser from "./ModalCreateUser";
import "../../../assets/styles/Manage/ManageUser.scss";
const ManageUser = (props) => {
  return (
    <>
      <div className="manageuser-container">
        <div className="manageuser-title">Manage User</div>
        <div className="manageuser-content">
          <div>
            <button>add user</button>
          </div>
          <div>table</div>
          <ModalCreateUser />
        </div>
      </div>
    </>
  );
};

export default ManageUser;
