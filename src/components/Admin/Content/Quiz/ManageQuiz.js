import * as React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import TabManageQuiz from "./TabManageQuiz";
import TabEditQA from "./TabEditQA";
import TabAssignUser from "./TabAssignUser";
const ManagerQuiz = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Manage Quiz" />
        <Tab label="Update QA Quiz" />
        <Tab label="Assign User" />
      </Tabs>

      <Box sx={{ padding: 2 }}>
        {value === 0 && (
          <div>
            <TabManageQuiz />
          </div>
        )}
        {value === 1 && (
          <div>
            <TabEditQA />
          </div>
        )}
        {value === 2 && (
          <div>
            <TabAssignUser />
          </div>
        )}
      </Box>
    </Box>
  );
};

export default ManagerQuiz;
