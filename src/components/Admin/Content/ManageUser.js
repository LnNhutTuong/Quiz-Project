import ModalCreateUser from "./ModalCreateUser";

const ManageUser = (props) => {
  return (
    <>
      <div className="manageuser-container">
        <div className="manageuser-title">Manage User</div>
        <div className="manageuser-content">Manage User content</div>
        <div className="manageuser-btn">
          <button>Manage User button</button>
        </div>
        <div className="manageuser-table">
          Manage User
          <ModalCreateUser />
        </div>
      </div>
    </>
  );
};

export default ManageUser;
