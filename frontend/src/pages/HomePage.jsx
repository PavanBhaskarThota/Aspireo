import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Link,
  List,
  ListIcon,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { MdCheckCircle } from "react-icons/md";
export const HomePage = () => {
  return (
    <>
      <Box
        //bgGradient="linear(to-r, #ffffff,#ffffff ,#ffffff, #e5e7f0 ,#b0bbe4, #4573D2)"
        pt={"150px"}
      >
        <Box w={"70%"} m={"auto"} textAlign={"center"} pb={"100px"}>
          <Heading
            fontWeight={"400"}
            size={"2xl"}
            lineHeight={"70px"}
            mb={10}
            //bgGradient="linear(to-r, #000000,#ffffff,)"
            //bgClip="text"
          >
            Empower your aspirations with 
            <span style={{ fontWeight: "bold", color: "#4573D2" }}>
               {" "}Aspireo{" "}
            </span>
            – Where Vision Meets Project, and Dreams Take Flight
          </Heading>
          <Text m={10} fontSize={"2xl"}>
            Keep everything in the same place — even if your team isn’t.
          </Text>
          <Flex
            w={"50%"}
            gap={2}
            justifyContent={"space-around"}
            alignItems={"center"}
            pt={10}
          >
            <Input placeholder="email" size="lg" w={"50%"} outline="#4573D2" />
            <Button
              h="50px"
              bgColor={"#06113C"}
              color={"white"}
              borderRadius={"40px"}
              w="30%"
              _hover={{
                bg: "white",
                color: "black",
                border: "1px solid #4573D2",
                outline: "blue",
              }}
            >
              Sign up -it's free
            </Button>
          </Flex>
        </Box>

        <Flex
          m={"auto"}
          bg="linear-gradient(0deg,#ffffff,#ffffff 24.59%,hsla(0,0%,100%,0))"
          //bgGradient="linear(to-r, #ffffff,#ffffff ,#ffffff, #e5e7f0 ,#b0bbe4, #4573D2)"
          gap={10}
          pt={"100px"}
        >
          <Box w={"50%"}>
            <Image
              src="https://img.freepik.com/free-vector/blogging-isometric-concept-with-content-plan-making-process-3d-illustration_1284-55140.jpg?size=626&ext=jpg&ga=GA1.1.937730311.1702627727&semt=ais"
              w={"90%"}
              display={"block"}
              margin={"auto"}
            />
          </Box>
          <Flex
            w={"50%"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box w={"50%"} m={"auto"}>
              <Heading size={"2xl"} mb={5}>
                Simple to build.
              </Heading>
              <Heading size={"2xl"} mb={5}>
                Intuitive to use.
              </Heading>
              <Text mt={10} fontSize={"2xl"} mb={5}>
                Enable those closest to the real-world details of your business
                to customize the apps that accelerate how work gets done.
              </Text>
              <Link href="#" color={"#4573D2"} fontSize={"2xl"}>
                Explore the platform
              </Link>
            </Box>
          </Flex>
        </Flex>
      </Box>

      <Box w={"90%"} m={"auto"} textAlign={"center"} mt={5} mb={"100px"}>
        <Box mt={10} mb={10}>
          <Heading w={"70%"} m={"auto"} mt={10} mb={10} size={"2xl"}>
            Drive efficiency across all departments
          </Heading>
          <Text w={"60%"} m={"auto"} mt={10} mb={10} fontSize={"2xl"}>
            Aspireo streamlines work processes for maximum efficiency,
            empowering teams across all departments to collaborate, manage
            projects, drive strategic initiatives, and achieve goals.
          </Text>
        </Box>
        <Flex gap={20} pt={"100px"} w={"90%"} m={"auto"}>
          <Box w={"50%"} textAlign={"left"}>
            <Heading size={"2xl"} lineHeight={"60px"} mb={10}>
              The one place for all your projects and team collaboration
            </Heading>
            <Text mt={10} fontSize={"xl"}>
              <span style={{ fontWeight: "bold" }}>Earlier : </span>
              Projects were scattered, it was hard to know where things stood,
              communication gaps existed, and people felt stressed.
            </Text>
            <Text mt={10} fontSize={"xl"}>
              <span style={{ fontWeight: "bold" }}> With Aspireo :</span>{" "}
              Everything is organized, project progress is everyone's on the
              same page, and people feel at ease.
            </Text>
          </Box>
          <Box w={"50%"}>
            <AspectRatio>
              <video
                src="https://cdn.wrike.com/video/LP_Animation_Reports_1x.mp4"
                autoPlay={true}
                muted={true}
                loop={true}
              />
            </AspectRatio>
          </Box>
        </Flex>
      </Box>

      <Flex w={"80%"} m={"auto"} mt={10} mb={10} gap={10}>
        <Heading size={"3xl"} w={"50%"} lineHeight={"80px"}>
          No matter your workflow, you can build it in Aspireo
        </Heading>
        <Text fontSize={"3xl"} w={"40%"} m={"auto"} color={"gray"}>
          End silos with a unique platform that connects every part of your
          work.
        </Text>
      </Flex>

      <Box w={"90%"} m={"auto"} mt={"100px"}>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab fontSize={"2xl"}>Tasks & Projects</Tab>
            <Tab fontSize={"2xl"}>Time Tracking</Tab>
            <Tab fontSize={"2xl"}>Deablines</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex gap={10} w={"90%"} m={"auto"}>
                <Box w={"50%"}>
                  <Image
                    src="https://img.freepik.com/free-vector/add-tasks-concept-illustration_114360-4765.jpg?size=626&ext=jpg&ga=GA1.1.937730311.1702627727&semt=sph"
                    w={"90%"}
                  />
                </Box>
                <Box w={"50%"} mt={10}>
                  <Heading size={"2xl"} mb={10}>
                    Tasks & Projects
                  </Heading>
                  <Text w={"80%"} fontSize={"2xl"}>
                    Plan, track, & manage projects of any size, from simple to
                    complex-across your team from one easy-to-use platform.
                  </Text>

                  <Flex w={"80%"} gap={"15%"} mt={10} fontSize={"2xl"}>
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
                    <Box>
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
                    mt={10}
                    h={"60px"}
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

            <TabPanel>
              <Flex gap={10} w={"90%"} m={"auto"}>
                <Box w={"50%"} mt={10}>
                  <Heading size={"2xl"} mb={10}>
                    Time Tracking
                  </Heading>
                  <Text w={"80%"} fontSize={"2xl"}>
                    Plan, track, & manage projects of any size, from simple to
                    complex-across your team from one easy-to-use platform.
                  </Text>

                  <Flex w={"80%"} gap={"10%"} mt={10} fontSize={"2xl"}>
                    <Box>
                      <List spacing={5}>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color="green.500" />
                          Timesheets
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color="green.500" />
                          Time estimates
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color="green.500" />
                          Timer
                        </ListItem>
                      </List>
                    </Box>
                    <Box>
                      <List spacing={5}>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color="green.500" />
                          Reports
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color="green.500" />
                          Export timesheets
                        </ListItem>
                      </List>
                    </Box>
                  </Flex>
                  <Button
                    mt={10}
                    h={"60px"}
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

                <Box w={"50%"}>
                  <Image
                    src="https://img.freepik.com/free-vector/isometric-outline-time-management-concept_52683-55736.jpg?size=626&ext=jpg&ga=GA1.1.937730311.1702627727&semt=ais"
                    w={"90%"}
                  />
                </Box>
              </Flex>
            </TabPanel>

            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};
