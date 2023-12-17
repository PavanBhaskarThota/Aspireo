import React, { useEffect, useState } from "react";
import {
  addTaskFun,
  deleteTaskFun,
  getTasksFun,
  updateTaskFun,
} from "../redux/taskReducer/action";

import {
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Icon,
  Text,
} from "@chakra-ui/react";

import { IoIosArrowForward } from "react-icons/io";

import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Flex, Input, SimpleGrid } from "@chakra-ui/react";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";
import UpdateTask from "../components/UpdateTask";
import styled from "styled-components";

export const Tasks = () => {
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [isUpdateTaskModalOpen, setUpdateTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [refresh, setRefresh] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [dueDateSort, setDueDateSort] = useState("all");
  const [prioritySort, setPrioritySort] = useState("all");

  const { tasks, isLoading, isError } = useSelector(
    (store) => store.taskReducer
  );

  const token= localStorage.getItem("token");

  const dispatch = useDispatch();

  console.log(tasks, isLoading, isError);

  const handleAddTask = (taskData) => {
    dispatch(addTaskFun(taskData,token));
    setRefresh(!refresh);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setUpdateTaskModalOpen(true);
  };

  const handleUpdateTask = (updatedTaskData, taskId) => {
    setUpdateTaskModalOpen(false);
    dispatch(updateTaskFun(updatedTaskData, taskId,token));
    setRefresh(!refresh);
  };

  const handleDeleteTask = (taskId) => {
    // console.log(taskId);
    dispatch(deleteTaskFun(taskId,token));
    setRefresh(!refresh);
  };

  const totalTasks = tasks.length;

  
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;

  const overdueTasks = tasks.filter((task) => {
    const currentDate = new Date();
    const dueDate = new Date(task.dueDateTime);
    return task.status !== "Completed" && dueDate < currentDate;
  }).length;

  const percentage = Math.floor((completedTasks / totalTasks) * 100);

  const completionPercentage = totalTasks === 0 ? 0 : percentage;

  const filteredTasks = tasks.filter((task) => {
    const lowerCaseSearch = searchInput.toLowerCase();
    const taskTitle = task.title.toLowerCase();

    return taskTitle.includes(lowerCaseSearch);
  });

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const handleDueDateSort = (option) => {
    setDueDateSort(option);
  };

  const handlePrioritySort = (option) => {
    setPrioritySort(option);
  };

  const compareDueDate = (taskA, taskB) => {
    const dateA = new Date(taskA.dueDateTime).getTime();
    const dateB = new Date(taskB.dueDateTime).getTime();

    if (taskA.status === "Completed" && taskB.status === "Completed") {
      return 0;
    } else if (taskA.status === "Completed") {
      return 1;
    } else if (taskB.status === "Completed") {
      return -1;
    } else if (dueDateSort === "asc") {
      return dateA - dateB;
    } else if (dueDateSort === "desc") {
      return dateB - dateA;
    }
    return 0;
  };

  const comparePriority = (taskA, taskB) => {
    const priorityOrder = { Low: 0, Medium: 10, High: 20 };

    if (taskA.status === "Completed" && taskB.status === "Completed") {
      return 0;
    } else if (taskA.status === "Completed") {
      return 1;
    } else if (taskB.status === "Completed") {
      return -1;
    } else if (prioritySort === "asc") {
      return priorityOrder[taskA.priority] - priorityOrder[taskB.priority];
    } else if (prioritySort === "desc") {
      return priorityOrder[taskB.priority] - priorityOrder[taskA.priority];
    }
    return 0;
  };

  console.log(dueDateSort, prioritySort);

  useEffect(() => {
    dispatch(getTasksFun(token));
  }, [dispatch, refresh]);

  const filteredAndSortedTasks = filteredTasks.slice();

  if (dueDateSort !== "all") {
    filteredAndSortedTasks.sort(compareDueDate);
  }
  if (prioritySort !== "all") {
    filteredAndSortedTasks.sort(comparePriority);
  }

  return (
    <DIV>
      <Box w={"20%"} borderRight={"1px solid"} position={"relative"}>
        <Accordion allowMultiple position={"fixed"} w={"18%"}>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left" w={"90%"} m={"auto"}>
                <Heading size={"lg"} letterSpacing={1} fontWeight={"600"}>
                  Tasks
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={10}>
              <AccordionItem>
                <AccordionButton>
                  <Flex
                    w={"100%"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Text fontSize={"lg"} fontWeight={"bold"}>
                      {" "}
                      All Tasks{" "}
                    </Text>
                    <AccordionIcon />
                  </Flex>
                </AccordionButton>
                <AccordionPanel pl={10}>
                  <Flex
                    justify="center"
                    pl={4}
                    flexDirection={"column"}
                    gap={2}
                  >
                    <Text
                      fontSize={"lg"}
                      fontWeight={"500"}
                      cursor={"pointer"}
                      onClick={() => handleDueDateSort("all")}
                      variant={dueDateSort === "all" ? "solid" : "outline"}
                    >
                      <Icon as={IoIosArrowForward} /> All
                    </Text>
                    <Text
                      fontSize={"lg"}
                      cursor={"pointer"}
                      fontWeight={"500"}
                      onClick={() => handleDueDateSort("asc")}
                      variant={dueDateSort === "asc" ? "solid" : "outline"}
                    >
                      <Icon as={IoIosArrowForward} />
                      Due Date Asc
                    </Text>
                    <Text
                      fontSize={"lg"}
                      fontWeight={"500"}
                      cursor={"pointer"}
                      onClick={() => handleDueDateSort("desc")}
                      variant={dueDateSort === "desc" ? "solid" : "outline"}
                    >
                      <Icon as={IoIosArrowForward} />
                      Due Date Desc
                    </Text>

                    {/* <Text
                      fontSize={"lg"}
                      fontWeight={"500"}
                      cursor={"pointer"}
                      onClick={() => handlePrioritySort("all")}
                      variant={prioritySort === "all" ? "solid" : "outline"}
                    >
                      <Icon as={IoIosArrowForward} />
                      All
                    </Text> */}

                    <Text
                      fontSize={"lg"}
                      fontWeight={"500"}
                      cursor={"pointer"}
                      onClick={() => handlePrioritySort("asc")}
                      variant={prioritySort === "asc" ? "solid" : "outline"}
                    >
                      <Icon as={IoIosArrowForward} />
                      Priority Low
                    </Text>
                    <Text
                      fontSize={"lg"}
                      fontWeight={"500"}
                      cursor={"pointer"}
                      onClick={() => handlePrioritySort("desc")}
                      variant={prioritySort === "desc" ? "solid" : "outline"}
                    >
                      <Icon as={IoIosArrowForward} />
                      Priority High
                    </Text>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>

              <Flex alignItems={"center"} pl={10}>
                <Icon as={IoIosArrowForward} />
                <Text fontSize={'xl'}> Ongoing</Text>
              </Flex>
              <Flex alignItems={"center"} pl={10}>
                <Icon as={IoIosArrowForward} />
                <Text fontSize={'xl'}> Completed </Text>
              </Flex>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left" w={"90%"} m={"auto"}>
                <Heading size={"lg"} letterSpacing={1} fontWeight={"600"}>
                  Projects
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <Flex justify="center" p={4} flexDirection={"column"} gap={4}>
                <Button
                  onClick={() => handlePrioritySort("all")}
                  variant={prioritySort === "all" ? "solid" : "outline"}
                >
                  All
                </Button>

                <Button
                  onClick={() => handlePrioritySort("asc")}
                  variant={prioritySort === "asc" ? "solid" : "outline"}
                >
                  Priority Asc
                </Button>
                <Button
                  onClick={() => handlePrioritySort("desc")}
                  variant={prioritySort === "desc" ? "solid" : "outline"}
                >
                  Priority Desc
                </Button>
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>

      <Box w={"90%"} m={"auto"}>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          h={"90px"}
          p={4}
          boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
        >
          <Box>
            <Input
              type="text"
              w="md"
              h={"50px"}
              borderRadius={"30px"}
              border={"1px solid #06113C"}
              placeholder="Search tasks..."
              value={searchInput}
              onChange={handleSearch}
            />
          </Box>

          <Box>
            <Button
              onClick={() => setAddTaskModalOpen(true)}
              border={"1px solid #06113C"}
              borderRadius={"30px"}
              _hover={{
                bg: "#06113C",
                color: "white",
              }}
            >
              {" "}
              + Add Task
            </Button>
            <AddTask
              isOpen={isAddTaskModalOpen}
              onClose={() => setAddTaskModalOpen(false)}
              onAddTask={handleAddTask}
            />
            {selectedTask && (
              <UpdateTask
                isOpen={isUpdateTaskModalOpen}
                onClose={() => {
                  setUpdateTaskModalOpen(false);
                  setSelectedTask(null);
                }}
                onUpdateTask={handleUpdateTask}
                data={selectedTask}
              />
            )}
          </Box>
        </Flex>

        <Flex justifyContent={"center"} p={4}>
          <Flex
            flexDirection={"column"}
            p={5}
            textAlign={"center"}
            fontSize={"lg"}
            boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
            borderRadius={"10px"}
            bg={"gray.50"}
            color={"black"}
            w={"20%"}
          >
            <strong>Total Tasks</strong> <Heading>{totalTasks}</Heading>
          </Flex>
          <Flex
            flexDirection={"column"}
            p={5}
            textAlign={"center"}
            fontSize={"xl"}
            boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
            borderRadius={"10px"}
            bg={"gray.50"}
            color={"black"}
            w={"20%"}
            ml={4}
          >
            <strong>Completed Tasks</strong> <Heading>{completedTasks}</Heading>
          </Flex>
          <Flex
            flexDirection={"column"}
            p={5}
            textAlign={"center"}
            fontSize={"xl"}
            boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
            borderRadius={"10px"}
            bg={"gray.50"}
            color={"black"}
            w={"20%"}
            ml={4}
          >
            <strong>Overdue Tasks</strong> <Heading>{overdueTasks}</Heading>
          </Flex>
          <Flex
            flexDirection={"column"}
            p={5}
            textAlign={"center"}
            fontSize={"xl"}
            boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
            borderRadius={"10px"}
            bg={"gray.50"}
            color={"black"}
            w={"20%"}
            ml={4}
          >
            <strong>Completion Percentage</strong>{" "}
            <Heading>{completionPercentage}%</Heading>
          </Flex>
        </Flex>

        {filteredAndSortedTasks.length > 0 && (
          <Flex w={"90%"} m={"auto"} flexDirection={"column"} gap={5}>
            {filteredAndSortedTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </Flex>
        )}
      </Box>
    </DIV>
  );
};

const DIV = styled.div`
  display: flex;
`;
