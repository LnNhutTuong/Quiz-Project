// import ReactPaginate from "react-paginate";
const TableUser = (props) => {
  const { listQuiz, setListQuiz, handleViewQuiz } = props;

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Date create</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`${index + 1} - quiz`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleViewQuiz(item)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
        {listQuiz && listQuiz.length === 0 && (
          <tr>
            <td colSpan={"4"}>Not found data</td>
          </tr>
        )}
      </table>
      {/* <div className="user-pagination d-flex justify-content-center">
        <ReactPaginate
          nextLabel="Next >"
          // onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          // pageCount={pageCount}
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
      </div> */}
    </>
  );
};

export default TableUser;
