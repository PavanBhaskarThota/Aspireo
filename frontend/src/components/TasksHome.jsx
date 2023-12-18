import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/layout";
import { TabPanel } from "@chakra-ui/tabs";
import { MdCheckCircle } from "react-icons/md";

import React from "react";
import { Button } from "@chakra-ui/button";

export const TasksHome = () => {
  return (
    <div>
      {" "}
      <TabPanel>
        <Flex
          gap={20}
          w={{ base: "100%", md: "90%" }}
          m={"auto"}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Box w={{ base: "100%", md: "50%" }} pt={10}>
            <AspectRatio
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <video
                src="https://cdn.wrike.com/video/LP_Animation_Request_1x.mp4"
                autoPlay={true}
                muted={true}
                loop={true}
              />
            </AspectRatio>
          </Box>
          <Box w={{ base: "100%", md: "50%" }} mt={5}>
            <Heading size={"2xl"} mb={5}>
              Tasks & Projects
            </Heading>
            <Text
              w={{ base: "100%", md: "80%" }}
              fontSize={"xl"}
              textAlign={{ base: "center" ,md:'left'}}
            >
              Plan, track, & manage projects of any size, from simple to
              complex-across your team from one easy-to-use platform.
            </Text>

            <Flex
              w={"100%"}
              gap={"15%"}
              mt={5}
              fontSize={"lg"}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Box>
                <List spacing={5}>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Forms
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Workflows
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Custom fields
                  </ListItem>
                </List>
              </Box>
              <Box mt={{ base: 5 , md:0}}>
                <List spacing={5}>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Dependencies
                  </ListItem>
                  <ListItem>
                    <ListIcon as={MdCheckCircle} color="green.500" />
                    Reports
                  </ListItem>
                </List>
              </Box>
            </Flex>
            <Button
              display={"block"}
              m={{ base: "auto", md: 0 }}
              mt={5}
              h={"50px"}
              borderRadius={"25px"}
              bg={"#4573D2"}
              color={"white"}
              _hover={{
                bg: "white",
                color: "black",
                border: "1px solid #4573D2",
                outline: "blue",
              }}
            >
              {" "}
              Get Started for free{" "}
            </Button>
          </Box>
        </Flex>
      </TabPanel>
    </div>
  );
};
