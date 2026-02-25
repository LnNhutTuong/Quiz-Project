import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Tab, Box } from "@mui/material";

import ListQuiz from "./Quiz/ListQuiz";
import History from "./Quiz/History";
import "../../assets/styles/User/user.scss";
import sleepingBoy from "../../assets/img/sleepingboy.png";

const User = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const account = useSelector((state) => state.user.account);
  console.log(">>>check account: ", account);
  return (
    <div className="user-container container">
      <div className="right">
        <div className="information">
          <div className="avatar">
            <img src={sleepingBoy} alt="your avatar" />
          </div>
          <div className="info">
            <div className="name">Tên: Tôi là tôi</div>
            <div className="email">Email: skibidi@gmail.com</div>
          </div>
        </div>
      </div>

      <div className="left">
        <Box
          sx={{
            width: "100%",
            height: "100%", // QUAN TRỌNG: Phải có chiều cao để con nó tính toán
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
              flex: 1, // Chiếm toàn bộ phần còn lại sau khi trừ đi thanh Tabs
              overflow: "hidden", // Ngăn nội dung tràn ra ngoài Box này
              display: "flex",
              flexDirection: "column",
            }}
          >
            {value === 0 && (
              <div className="tab-list">
                <div className="title">Quiz của bạn:</div>
                <div className="list">
                  <ListQuiz />
                </div>
              </div>
            )}
            {value === 1 && (
              <div>
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
