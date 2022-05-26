import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { PostCard, LinearLoder } from "../../components";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function BasicTabs() {
  const [value, setValue] = useState(0);
  const { auth, posts } = useSelector((store) => store);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider", widht: "40rem" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="New Posts" {...a11yProps(0)} />
          <Tab label="Older Posts" {...a11yProps(1)} />
          <Tab label="New connection" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} sx={{ widht: "40rem" }}>
        <Box sx={{ widht: "40rem" }}>
          {posts.allPosts === null ? (
            <LinearLoder />
          ) : (
            posts.allPosts.map((data) => (
              <PostCard key={data.id} data={data} authId={auth.userID} />
            ))
          )}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {posts.olderPosts === null ? (
          <LinearLoder />
        ) : (
          posts.olderPosts.map((data) => (
            <PostCard key={data.id} data={data} authId={auth.userID} />
          ))
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
