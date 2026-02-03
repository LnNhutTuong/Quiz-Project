import ModalCreateUser from "./ModalCreateUser";
import "../../../assets/styles/Manage/ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import {
  getAllUser,
  getUserWithPaginate,
} from "../../../API/services/admin.service";
import ModalEditUser from "./ModalEditUser";
import ModalDeleteUser from "./ModalDeleteUser";

import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
  // Pagination
  const LIMIT_USER = 5;
  const [pageCount, setPageCount] = useState(``);
  const [currentPage, setCurrentPage] = useState(0);

  // Create new user
  const [showmodalcreate, setShowModalCreate] = useState(false);

  // Update user
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [dataupdate, setDataUpdate] = useState({});

  // Delete user
  const [showmodaldelete, setShowModalDelete] = useState(false);
  const [datadelete, setDataDelete] = useState({});

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

  const handleBtnEditUser = (user) => {
    setShowModalEdit(true);
    setDataUpdate(user);
  };

  const handleBtnDeleteUser = (userId, userEmail) => {
    setDataDelete({ userId, userEmail });
    setShowModalDelete(true);
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
            <TableUserPaginate
              listuser={listuser}
              // seccond
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              fetchListUserPaginate={fetchListUserPaginate}
              handleBtnEditUser={handleBtnEditUser}
              pageCount={pageCount}
            />
          </div>
          <ModalCreateUser
            show={showmodalcreate}
            setShow={setShowModalCreate}
            fetchListUserPaginate={fetchListUserPaginate}
          />
          <ModalEditUser
            show={showModalEdit}
            setShow={setShowModalEdit}
            dataupdate={dataupdate}
            setDataUpdate={setDataUpdate}
            currentPage={currentPage}
            fetchListUserPaginate={fetchListUserPaginate}
            handleBtnDeleteUser={handleBtnDeleteUser}
          />
          <ModalDeleteUser
            show={showmodaldelete}
            setShow={setShowModalDelete}
            setShowModalEdit={setShowModalEdit}
            datadelete={datadelete}
            currentPage={currentPage}
            fetchListUserPaginate={fetchListUserPaginate}
          />
        </div>
      </div>
    </>
  );
};

export default ManageUser;
