import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  useToast,
  useToken,
} from "@chakra-ui/react";
import AddProject from "../components/AddProject";
import { useDispatch, useSelector } from "react-redux";
import {
  addProjectFun,
  getAllUsersFun,
  getProjectsFun,
  updateProjectFun,
} from "../redux/projectReducer/action";
import { useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import AddCollaborators from "../components/AddCollaborator";
import styled from "styled-components";

export const Projects = () => {
  const [isAddProjectModalOpen, setAddProjectModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isAddCollaboratorModalOpen, setAddCollaboratorModalOpen] =
    useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const { user } = useSelector((store) => store.userReducer);
  const { projects, users } = useSelector((store) => store.projectReducer);
  const dispatch = useDispatch();
  const toast = useToast();

  console.log(projects, "projects");
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleAddProject = (projectData) => {
    const colleborators = [];
    colleborators.push(userData._id);
    const tasks = [];

    projectData.colleborators = colleborators;
    projectData.tasks = tasks;

    console.log(projectData);

    dispatch(addProjectFun(projectData, token, toast));
    setRefresh(!refresh);
    setAddProjectModalOpen(false);
  };

  const handleAddTask = (project) => {
    console.log("Adding task to project:", project);
  };

  const handleAddCollaborator = (userId) => {
    const updatedProjects = projects.map((project) => {
      if (project._id === selectedProject._id) {
        const newCollaborators = [...project.colleborators, userId];
        return { ...project, colleborators: newCollaborators };
      }
      return project;
    });

    let patchProject = {};

    updatedProjects.forEach((el) => {
      if (el._id == selectedProject._id) {
        patchProject = el;
      }
    });

    // console.log(patchProject, "hi", selectedProject._id);

    dispatch(updateProjectFun(patchProject, userId, token, toast));

    setAddCollaboratorModalOpen(false);
    setRefresh(!refresh);
  };

  useEffect(() => {
    dispatch(getProjectsFun(token));
    dispatch(getAllUsersFun(token));
  }, [dispatch, refresh, setRefresh]);

  // console.log(projects,users);

  return (
    <DIV>
      <Box w={"20%"} borderRight={"1px solid lightgray"} >

        <Box w={"20%"} position={"fixed"}>
        {/* <Heading textAlign={"center"} >{userData.userName}</Heading> */}
          {" "}
          <Divider/>
          <Heading textAlign={"center"} size={'lg'} > All Projects</Heading>
          <Button
            onClick={() => setAddProjectModalOpen(true)}
            display={"block"}
            m={"auto"}
            borderRadius={"30px"}
            mt={10}
            color={"white"}
            bg={"#06113C"}
            _hover={{
              border:'1px solid #06113C',
              bg:'white',
              color:'black'
            }}
          >
            + Create New Project
          </Button>
          <AddProject
            isOpen={isAddProjectModalOpen}
            onClose={() => setAddProjectModalOpen(false)}
            onAddProject={handleAddProject}
          />
        </Box>
      </Box>

      <Box m="auto" w={"80%"}>
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onAddCollaborator={() => {
                setSelectedProject(project);
                setAddCollaboratorModalOpen(true);
              }}
              users={users}
              onAddTask={handleAddTask}
            />
          ))}

        <AddCollaborators
          isOpen={isAddCollaboratorModalOpen}
          onClose={() => setAddCollaboratorModalOpen(false)}
          users={users}
          onAddCollaborator={handleAddCollaborator}
        />
      </Box>
    </DIV>
  );
};

const DIV = styled.div`
  display: flex;
`;
