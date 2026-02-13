import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";

const TableUserPaginate = (props) => {
  const { listuser, pageCount, currentPage, setCurrentPage } = props;

  const handlePageClick = (event) => {
    const currentPage = event.selected;

    setCurrentPage(currentPage);
    props.fetchListUserPaginate(currentPage);
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listuser &&
            listuser.length > 0 &&
            listuser.map((item, index) => {
              return (
                <tr key={`talbe-user-${index + 1}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => props.handleBtnEditUser(item)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          {listuser && listuser.length === 0 && (
            <tr>
              <td colSpan={"4"}>Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="user-pagination d-flex justify-content-center">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default TableUserPaginate;
