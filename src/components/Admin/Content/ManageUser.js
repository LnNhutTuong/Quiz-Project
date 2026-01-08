import ModalCreateUser from "./ModalCreateUser";
import "../../../assets/styles/Manage/ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import { getAllUser, getUserWithPaginate } from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalViewUser from "./ModalViewUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
  // Pagination
  const LIMIT_USER = 5;
  const [pageCount, setPageCount] = useState(``);
  const [currentPage, setCurrentPage] = useState(0);

  // Create new user
  const [showmodalcreate, setShowModalCreate] = useState(false);

  // Update user
  const [showmodalupdate, setShowModalUpdate] = useState(false);
  const [dataupdate, setDataUpdate] = useState({});

  // Delete user
  const [showmodaldelete, setShowModalDelete] = useState(false);
  const [datadelete, setDataDelete] = useState({});

  // Delete user
  const [showmodalview, setShowModalView] = useState(false);
  const [dataview, setDataView] = useState({});

  // List user
  const [listuser, setListUser] = useState([]);

  useEffect(async () => {
    fetchListUserPaginate(currentPage);
  }, []);

  const fetchListUser = async () => {
    let res = await getAllUser();
    if (res.EC == 0) {
      setListUser(res.DT);
    }
  };

  const fetchListUserPaginate = async (page) => {
    let res = await getUserWithPaginate(page + 1, LIMIT_USER);
    if (res.EC == 0) {
      console.log(">>>res.dt:", res.DT);
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  const handleBtnUpdateUser = (user) => {
    setShowModalUpdate(true);
    setDataUpdate(user);
  };

  const handleBtnDeleteUser = (user) => {
    setShowModalDelete(true);
  };

  const handleBtnViewUser = (user) => {
    setShowModalView(true);
    setDataView(user);
  };

  return (
    <>
      <div className="manageuser-container">
        <div className="manageuser-title">Manage User</div>
        <div className="manageuser-content">
          <div className="btn-add-new">
            <button
              className="btn btn-dark"
              onClick={() => setShowModalCreate(true)}
            >
              <FcPlus /> Add new user
            </button>
          </div>
          <div className="table-add-newuser">
            {/* <TableUser
              listuser={listuser}
              handleBtnUpdateUser={handleBtnUpdateUser}
              handleBtnDeleteUser={handleBtnDeleteUser}
            /> */}
            <TableUserPaginate
              listuser={listuser}
              // seccond
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              fetchListUserPaginate={fetchListUserPaginate}
              handleBtnUpdateUser={handleBtnUpdateUser}
              handleBtnDeleteUser={handleBtnDeleteUser}
              handleBtnViewUser={handleBtnViewUser}
              pageCount={pageCount}
            />
          </div>
          <ModalCreateUser
            show={showmodalcreate}
            setShow={setShowModalCreate}
            // fetchListUser={fetchListUser}
            fetchListUserPaginate={fetchListUserPaginate}
          />
          <ModalUpdateUser
            show={showmodalupdate}
            setShow={setShowModalUpdate}
            dataupdate={dataupdate}
            setDataUpdate={setDataUpdate}
            currentPage={currentPage}
            fetchListUserPaginate={fetchListUserPaginate}
          />
          <ModalDeleteUser
            show={showmodaldelete}
            setShow={setShowModalDelete}
            datadelete={datadelete}
            currentPage={currentPage}
            fetchListUserPaginate={fetchListUserPaginate}
          />
          <ModalViewUser
            show={showmodalview}
            setShow={setShowModalView}
            dataview={dataview}
            setDataView={setDataView}
            currentPage={currentPage}
            fetchListUserPaginate={fetchListUserPaginate}
          />
        </div>
      </div>
    </>
  );
};

export default ManageUser;
