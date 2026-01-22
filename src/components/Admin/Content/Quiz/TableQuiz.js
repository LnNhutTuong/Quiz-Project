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
      </table>
    </>
  );
};

export default TableUser;
