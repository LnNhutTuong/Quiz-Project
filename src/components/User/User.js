import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Tab, Box } from "@mui/material";

import ListQuiz from "./Quiz/ListQuiz";
import History from "./Quiz/History";
import "../../assets/styles/User/user.scss";

const User = (props) => {
  const [value, setValue] = useState(0);

  const account = useSelector((state) => state.user.account);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="user-container container">
      <div className="right">
        <div className="information">
          <div className="avatar">
            <img
              src={`data:image/jpeg;base64,${account.image}`}
              alt="your avatar"
            />
          </div>
          <div className="info">
            <div className="name">Tên: {account.username}</div>
            <div className="email">Email: {account.email}</div>
          </div>
        </div>
      </div>

      <div className="left">
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Danh sách Quiz" />
            <Tab label="Lịch sử bài làm" />
          </Tabs>

          <Box
            sx={{
              flex: 1,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {value === 0 && (
              <div className="tab-list">
                <div className="list">
                  <ListQuiz />
                </div>
              </div>
            )}
            {value === 1 && (
              <div className="tab-history">
                <History />
              </div>
            )}
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default User;
