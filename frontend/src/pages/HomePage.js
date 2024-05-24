import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Login from "../components/authentication/Login";
import SignUp from "../components/authentication/SignUp";
const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0px 15px 0px"
        //borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          textAlign="center"
          fontSize="4xl"
          fontFamily="work sans"
          color="black"
        >
          Chat-App
        </Text>
      </Box>
      <Box bg={"white"} p={4} color="black" w="100%" borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
