import { Box, Chip, Tab, Tabs } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ShowPropertyProps } from "adminjs";
import React from "react";
import VerifiedUser from "@mui/icons-material/Verified";

const MoreInfoUser: React.FC<ShowPropertyProps> = (props) => {
  // const { record, property } = props;
  // const refId = record.params[property.path];
  // const populated = record.populated[property.path];
  // const value = (populated && populated.title) || refId;
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Documentos" value="1" />
              <Tab label="Extrato" value="3" />
              <Tab label="Imoveis" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Extrato</TabPanel>
        </TabContext>
      </Box>
    </>
  );

  // return <Chip label={value} color="success"></Chip>;
};

export default MoreInfoUser;
