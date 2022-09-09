import { Link } from "react-router-dom";
import {
  HomeContainer,
  WidgetsContainer,
  ChartsContainer,
  ListContainer,
} from "./styles";

const Home = () => {
  return (
    <HomeContainer>
      <WidgetsContainer></WidgetsContainer>
      <ChartsContainer></ChartsContainer>
      <ListContainer></ListContainer>
    </HomeContainer>
  );
};

export default Home;
