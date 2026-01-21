const TableUser = (props) => {
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Date update</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr key={"123"}>
            <td>1</td>
            <td>Quiz 1</td>
            <td>22/22/2202</td>
            <td>
              <button>View</button>
            </td>
          </tr>

          {/* <tr>
            <td>Not found data</td>
          </tr> */}
        </tbody>
      </table>
    </>
  );
};

export default TableUser;
