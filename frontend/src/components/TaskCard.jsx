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
      borderRadius="md"
      boxShadow="md"
      bg={
        task.status === "Completed"
          ? "#007b19"
          : task.status === "Started"
          ? "#F0F0FF"
          : "#FCF7E9"
      }
      // maxW="md"

      color={task.status === "Completed" ? "white" : "black"}
      w="90%"
      m={"auto"}
      fontSize={"xl"}
    >
      <VStack align="start" spacing={2}>
        <Flex justifyContent={"space-between"} gap={10} w={"100%"}>
          <Box>
            <Text fontSize="3xl" fontWeight="bold">
              {task.title}
            </Text>
            <Text>{task.description}</Text>
          </Box>
          <Box>
            <HStack>
              <Badge colorScheme="blue">{task.status}</Badge>
              <Badge colorScheme="orange">{task.priority}</Badge>
            </HStack>
          </Box>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <Box>
            <Text fontSize="lg" color="red.700">
              Concludes : {remainingTime}
            </Text>
            <Text fontSize="lg">Due : {dt}</Text>

            <Text fontSize="lg">Tags : {task.tags}</Text>
            <HStack mt={4}>
              <Button
                colorScheme="blue"
                bg={task.status === "Completed" ? "white" : "none"}
                variant={"outline"}
                onClick={() => onEdit(task)}
              >
                Edit
              </Button>
              <Button
                colorScheme="red"
                bg={task.status === "Completed" ? "white" : "none"}
                variant={"outline"}
                onClick={() => onDelete(task._id)}
              >
                Delete
              </Button>
            </HStack>
          </Box>
        </Collapse>
        <Link
          onClick={onToggle}
          cursor={"pointer"}
          // color={'#06113C'}
          fontSize={"md"}
          // textDecoration={"underline"}
          // _hover={{ fontWeight: "bold" }}
        >
          {" "}
          {isOpen ? "Show less" : "Show More"}
        </Link>
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
