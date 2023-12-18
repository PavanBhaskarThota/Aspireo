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
  useToast,
  Radio,
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

  const toast = useToast();

  const { tasks, isLoading, isError } = useSelector(
    (store) => store.taskReducer
  );

  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  console.log(tasks, isLoading, isError);

  const handleAddTask = (taskData) => {
    dispatch(addTaskFun(taskData, token, toast));
    setRefresh(!refresh);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setUpdateTaskModalOpen(true);
  };

  const handleUpdateTask = (updatedTaskData, taskId) => {
    setUpdateTaskModalOpen(false);
    dispatch(updateTaskFun(updatedTaskData, taskId, token, toast));
    setRefresh(!refresh);
  };

  const handleDeleteTask = (taskId) => {
    // console.log(taskId);
    dispatch(deleteTaskFun(taskId, token, toast));
    setRefresh(!refresh);
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

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
        <Box w={"20%"} position={"fixed"}>
          <Heading textAlign={"center"} mt={5} w={'90%'}>
            {" "}
            Tasks
          </Heading>
          <Flex justify="center" flexDirection={"column"} gap={2}>
            <Box display={"flex"} flexDirection={"column"}>
              {/* <Text>Sort Your tasks</Text> */}
            </Box>
            <Button
              w={"70%"}
              display={"block"}
              ml={5}
              fontSize={"md"}
              fontWeight={"500"}
              cursor={"pointer"}
              onClick={() => handleDueDateSort("all")}
              variant={dueDateSort === "all" ? "solid" : "outline"}
            >
              All
            </Button>
            <Text textAlign={"center"} w={'90%'} fontSize={'xl'} fontWeight={'bold'} mt={5}>Sort By Due Date</Text>
            <Button
              w={"70%"}
              display={"block"}
              ml={5}
              fontSize={"md"}
              cursor={"pointer"}
              fontWeight={"500"}
              onClick={() => handleDueDateSort("asc")}
              variant={dueDateSort === "asc" ? "solid" : "outline"}
            >
              Old Tasks 
            </Button>
            <Button
              w={"70%"}
              display={"block"}
              ml={5}
              fontSize={"md"}
              fontWeight={"500"}
              cursor={"pointer"}
              onClick={() => handleDueDateSort("desc")}
              variant={dueDateSort === "desc" ? "solid" : "outline"}
            >
              Latest Tasks
            </Button>

            {/* <Button
                      fontSize={"md"}
                      fontWeight={"500"}
                      cursor={"pointer"}
                      onClick={() => handlePrioritySort("all")}
                      variant={prioritySort === "all" ? "solid" : "outline"}
                    >
                     
                      All
                    </Button> */}
            <Text textAlign={"center"} w={'90%'} fontSize={'xl'} fontWeight={'bold'} mt={5}>Sort By Priority</Text>
            <Button
              w={"70%"}
              display={"block"}
              ml={5}
              fontSize={"md"}
              fontWeight={"500"}
              cursor={"pointer"}
              onClick={() => handlePrioritySort("asc")}
              variant={prioritySort === "asc" ? "solid" : "outline"}
            >
              Priority Low
            </Button>
            <Button
              w={"70%"}
              display={"block"}
              ml={5}
              fontSize={"md"}
              fontWeight={"500"}
              cursor={"pointer"}
              onClick={() => handlePrioritySort("desc")}
              variant={prioritySort === "desc" ? "solid" : "outline"}
            >
              Priority High
            </Button>
          </Flex>
        </Box>
      </Box>

      <Box w={"90%"} m={"auto"} mb={"30px"}>
        <Box h={"70px"} zIndex={999}>
          <Flex
            justifyContent={"space-around"}
            alignItems={"center"}
            p={4}
            //boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
            borderBottom={"0.5px solid lightgray"}
            position={"fixed"}
            w={"80%"}
            ml="auto"
            bg={"white"}
            zIndex={999}
          >
            <Box>
              <Input
                type="text"
                w="md"
                // h={"50px"}
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
        </Box>

        <Flex justifyContent={"center"} p={4}>
          <Flex
            flexDirection={"column"}
            p={4}
            textAlign={"center"}
            fontSize={"sm"}
            justifyContent={"space-between"}
            borderRadius={"30px"}
            bg={"gray.100"}
            color={"black"}
            w={"20%"}
          >
            <strong>Total Tasks</strong>{" "}
            <Heading color="darkblue.400">{totalTasks}</Heading>
          </Flex>
          <Flex
            flexDirection={"column"}
            p={4}
            textAlign={"center"}
            fontSize={"sm"}
            justifyContent={"space-between"}
            borderRadius={"30px"}
            bg={"gray.100"}
            color={"black"}
            w={"20%"}
            ml={4}
          >
            <strong>Completed Tasks</strong>{" "}
            <Heading color="darkblue.400">{completedTasks}</Heading>
          </Flex>
          <Flex
            flexDirection={"column"}
            p={4}
            textAlign={"center"}
            fontSize={"sm"}
            justifyContent={"space-between"}
            borderRadius={"30px"}
            bg={"gray.100"}
            color={"black"}
            w={"20%"}
            ml={4}
          >
            <strong>Overdue Tasks</strong>{" "}
            <Heading color="darkblue.400">{overdueTasks}</Heading>
          </Flex>
          <Flex
            flexDirection={"column"}
            p={4}
            textAlign={"center"}
            fontSize={"sm"}
            justifyContent={"space-between"}
            borderRadius={"30px"}
            bg={"gray.100"}
            color={"black"}
            w={"20%"}
            ml={4}
          >
            <strong>Completion Percentage</strong>{" "}
            <Heading color="darkblue.400">{completionPercentage}%</Heading>
          </Flex>
        </Flex>

        {filteredAndSortedTasks.length > 0 && (
          <Flex
            w={"90%"}
            m={"auto"}
            flexDirection={"column"}
            gap={5}
            mb={"30px"}
          >
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
