import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Collapse,
  useDisclosure,
  Link,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const [remainingTime, setRemainingTime] = useState("");
  const [dt, setDt] = useState("");
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    const dueDate = new Date(task.dueDateTime);
    const currentTime = new Date();

    const timeDifference = dueDate.getTime() - currentTime.getTime();

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    const formattedDays = days === 0 ? "" : days < 0 ? `-${days}d` : `${days}d`;
    const formattedHours = hours < 0 ? `${hours}h` : `${hours}h`;
    const formattedMinutes = minutes < 0 ? `${minutes}m` : `${minutes}m`;

    if (task.status === "Completed") {
      setRemainingTime("Done");
    } else if (timeDifference < 0) {
      setRemainingTime("Over Due");
    } else {
      setRemainingTime(
        `${formattedDays} ${formattedHours} ${formattedMinutes} remaining`
      );
    }

    setDt(task.dueDateTime.split("T").join(" "));
  }, [task.dueDateTime, task.status]);

  return (
    <Box
      p={5}
      borderWidth="1px"
      borderRadius="30px"
      // boxShadow="md"
      bg={
        task.status === "Completed"
          ? "#c3ffcf"
          : task.status === "Started"
          ? "#F0F0FF"
          : "#FCF7E9"
      }
      // maxW="md"

      //color={task.status === "Completed" ? "white" : "black"}
      w="90%"
      m={"auto"}
      fontSize={"lg"}
    >
      <VStack align="start" spacing={1}>
        <Flex justifyContent={"space-between"} gap={5} w={"100%"}>
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              {task.title}
            </Text>
            <Text>{task.description}</Text>
          </Box>
          <Box>
            <HStack>
              <Badge colorScheme="blue" borderRadius={"20px"} p={2}>
                {task.status}
              </Badge>
              <Badge colorScheme="orange" borderRadius={"20px"} p={2}>
                {task.priority}
              </Badge>
            </HStack>
          </Box>
        </Flex>

        <Collapse width={"100%"} in={isOpen} animateOpacity >
          <Box  w={'100%'} justifyContent={'space-between'}>
            {/* <Text fontSize="lg" color="red.700">
              Concludes : {remainingTime}
            </Text> */}
            <Box w={'100%'}>
              <Text fontSize="sm">Due : {dt}</Text>

              <Text fontSize="sm">Tags : {task.tags}</Text>
            </Box>

            <Box justifyContent={"end"} w={"100%"} gap={2}>
              <Button
                colorScheme="blue"
                borderRadius={"30px"}
                bg={task.status === "Completed" ? "white" : "none"}
                variant={"outline"}
                onClick={() => onEdit(task)}
              >
                Edit
              </Button>
              <Button
                colorScheme="red"
                borderRadius={"30px"}
                bg={task.status === "Completed" ? "white" : "none"}
                variant={"outline"}
                onClick={() => onDelete(task._id)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Collapse>
        <Flex w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize="sm" color="red.700">
            Concludes : {remainingTime}
          </Text>
          <Link
            onClick={onToggle}
            cursor={"pointer"}
            // color={'#06113C'}
            fontSize={"sm"}
            textAlign={'right'}
            // textDecoration={"underline"}
            // _hover={{ fontWeight: "bold" }}
          >
            {" "}
            {isOpen ? "Show less..." : "Show More..."}
          </Link>
        </Flex>
      </VStack>
    </Box>
  );
};

export default TaskCard;

{
  /* <Text fontSize="sm" color="gray.500">
          Due: {dt}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Concludes:{remainingTime}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Tags: {task.tags}
        </Text>
        <HStack mt={4}>
          <Button
            colorScheme="blue"
            variant={"outline"}
            onClick={() => onEdit(task)}
          >
            Edit
          </Button>
          <Button
            colorScheme="red"
            variant={"outline"}
            onClick={() => onDelete(task._id)}
          >
            Delete
          </Button>
        </HStack> */
}
