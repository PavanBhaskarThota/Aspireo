// import React, { useEffect, useState } from 'react';
// import { Box, Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';
// import AddTask from '../components/AddTask';
// import { addTaskFun, deleteTaskFun, getTasksFun, updateTaskFun } from '../redux/taskReducer/action';
// import { useSelector, useDispatch } from 'react-redux';
// import TaskCard from '../components/TaskCard';
// import UpdateTask from '../components/UpdateTask';

// export const Tasks = () => {
//   const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
//   const [isUpdateTaskModalOpen, setUpdateTaskModalOpen] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [refresh, setRefresh] = useState(false);
//   const [sortOption, setSortOption] = useState('all');

//   const { tasks, isLoading, isError } = useSelector((store) => store.taskReducer);
//   const dispatch = useDispatch();

//   console.log(tasks, isLoading, isError);

//   const handleAddTask = (taskData) => {
//     dispatch(addTaskFun(taskData));
//     setRefresh(!refresh);
//   };

//   const handleEditTask = (task) => {
//     setSelectedTask(task);
//     setUpdateTaskModalOpen(true);
//   };

//   const handleUpdateTask = (updatedTaskData, taskId) => {
//     setUpdateTaskModalOpen(false);
//     dispatch(updateTaskFun(updatedTaskData, taskId));
//     setRefresh(!refresh);
//   };

//   const handleDeleteTask = (taskId) => {
//     console.log(taskId);
//     dispatch(deleteTaskFun(taskId));
//     setRefresh(!refresh);
//   };

//   const handleSort = (option) => {
//     setSortOption(option);
//   };

//   useEffect(() => {
//     dispatch(getTasksFun());
//   }, [dispatch,setRefresh,refresh]);

//   const sortedTasks = tasks.slice(); 

//   if (sortOption !== 'all') {
//     sortedTasks.sort((taskA, taskB) => {
//       const dateA = new Date(taskA.dueDateTime).getTime();
//       const dateB = new Date(taskB.dueDateTime).getTime();

//       return sortOption === 'asc' ? dateA - dateB : dateB - dateA;
//     });
//   }

//   return (
//     <div>
//       <Box m="auto">
//         <Button onClick={() => setAddTaskModalOpen(true)}>Add Task</Button>
//         <AddTask
//           isOpen={isAddTaskModalOpen}
//           onClose={() => setAddTaskModalOpen(false)}
//           onAddTask={handleAddTask}
//         />
//         {selectedTask && (
//           <UpdateTask
//             isOpen={isUpdateTaskModalOpen}
//             onClose={() => {
//               setUpdateTaskModalOpen(false);
//               setSelectedTask(null);
//             }}
//             onUpdateTask={handleUpdateTask}
//             data={selectedTask}
//           />
//         )}
//       </Box>
//       <Flex justify="center" p={4}>
//         <Text>Sort :</Text>
//         <Button onClick={() => handleSort('all')} variant={sortOption === 'all' ? 'solid' : 'outline'}>
//           All
//         </Button>
//         <Button onClick={() => handleSort('asc')} variant={sortOption === 'asc' ? 'solid' : 'outline'}>
//           Ascending
//         </Button>
//         <Button onClick={() => handleSort('desc')} variant={sortOption === 'desc' ? 'solid' : 'outline'}>
//           Descending
//         </Button>
//       </Flex>
//       {sortedTasks.length > 0 && (
//         <Flex justify="center" p={4}>
//           <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
//             {sortedTasks.map((task) => (
//               <TaskCard
//                 key={task._id}
//                 task={task}
//                 onEdit={handleEditTask}
//                 onDelete={handleDeleteTask}
//               />
//             ))}
//           </SimpleGrid>
//         </Flex>
//       )}
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, SimpleGrid } from '@chakra-ui/react';
import AddTask from '../components/AddTask';
import {
  addTaskFun,
  deleteTaskFun,
  getTasksFun,
  updateTaskFun,
} from '../redux/taskReducer/action';
import { useSelector, useDispatch } from 'react-redux';
import TaskCard from '../components/TaskCard';
import UpdateTask from '../components/UpdateTask';

export const Tasks = () => {
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [isUpdateTaskModalOpen, setUpdateTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const [dueDateSort, setDueDateSort] = useState('all');
  const [prioritySort, setPrioritySort] = useState('all');

  const { tasks, isLoading, isError } = useSelector((store) => store.taskReducer);
  const dispatch = useDispatch();

  console.log(tasks, isLoading, isError);

  const handleAddTask = (taskData) => {
    dispatch(addTaskFun(taskData));
    setRefresh(!refresh);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setUpdateTaskModalOpen(true);
  };

  const handleUpdateTask = (updatedTaskData, taskId) => {
    setUpdateTaskModalOpen(false);
    dispatch(updateTaskFun(updatedTaskData, taskId));
    setRefresh(!refresh);
  };

  const handleDeleteTask = (taskId) => {
    console.log(taskId);
    dispatch(deleteTaskFun(taskId));
    setRefresh(!refresh);
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
  
    if (dueDateSort === 'asc') {
      // Ascending due date
      return dateA - dateB;
    } else if (dueDateSort === 'desc') {
      // Descending due date
      return dateB - dateA;
    }
  
    return 0; // Default sorting (no sorting)
  };
  
  const comparePriority = (taskA, taskB) => {
    const priorityOrder = { Low: 0, Medium: 10, High: 20 };
  
    if (prioritySort === 'asc') {
      // Ascending priority
      return priorityOrder[taskA.priority] - priorityOrder[taskB.priority];
    } else if (prioritySort === 'desc') {
      // Descending priority
      return priorityOrder[taskB.priority] - priorityOrder[taskA.priority];
    }
  
    return 0; // Default sorting (no sorting)
  };
  
  console.log(dueDateSort,prioritySort)

  useEffect(() => {
    dispatch(getTasksFun());
  }, [dispatch,refresh]);

  // Apply sorting based on the user's selection
  const sortedTasks = tasks.slice(); // Create a copy to avoid mutating the original array

  if (dueDateSort !== 'all') {
    sortedTasks.sort(compareDueDate);
  }
  if (prioritySort !== 'all') {
    sortedTasks.sort(comparePriority);
  }
  

  return (
    <div>
      <Box m="auto">
        <Button onClick={() => setAddTaskModalOpen(true)}>Add Task</Button>
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
      
      
      <Flex justify="center" p={4}>
        <Button
          onClick={() => handleDueDateSort('all')}
          variant={dueDateSort === 'all' ? 'solid' : 'outline'}
        >
          All
        </Button>
        <Button
          onClick={() => handleDueDateSort('asc')}
          variant={dueDateSort === 'asc' ? 'solid' : 'outline'}
        >
          Due Date Asc
        </Button>
        <Button
          onClick={() => handleDueDateSort('desc')}
          variant={dueDateSort === 'desc' ? 'solid' : 'outline'}
        >
          Due Date Desc
        </Button>
        </Flex>
        <Flex justify="center" p={4}>
        <Button
          onClick={() => handlePrioritySort('all')}
          variant={prioritySort === 'all' ? 'solid' : 'outline'}
        >All</Button>

        <Button
          onClick={() => handlePrioritySort('asc')}
          variant={prioritySort === 'asc' ? 'solid' : 'outline'}
        >
          Priority Asc
        </Button>
        <Button
          onClick={() => handlePrioritySort('desc')}
          variant={prioritySort === 'desc' ? 'solid' : 'outline'}
        >
          Priority Desc
        </Button>
      </Flex>

      {sortedTasks.length > 0 && (
        <Flex justify="center" p={4}>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
            {sortedTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </SimpleGrid>
        </Flex>
      )}
    </div>
  );
};
