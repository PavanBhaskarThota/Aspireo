import { Navbar } from "./components/Navbar";
import { AllRoutes } from "./components/AllRoutes";
import { Box } from "@chakra-ui/react";

function App() {
  const newFont = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;500;600;700&family=Lexend:wght@400;500;600;700;800&family=Outfit:wght@400;600;800&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">`;

  return (
    <Box fontFamily="Lexend, sans-serif">
      <Box dangerouslySetInnerHTML={{ __html: newFont }} />
      <Navbar />

      <AllRoutes />
    </Box>
  );
}

export default App;
