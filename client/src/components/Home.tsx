import "@/scss/Home.scss";
import { useDate } from "@/util/useDate";
import { useNavigator } from "@/util/useNavigator";
export const Home = () => {
  const { goToAbout } = useNavigator();
  const date = useDate();
  return (
    <div className="home-container">
      <button onClick={() => goToAbout(`todo?day=${date}`)}>
        TodoList 바로가기
      </button>
      <button>ShoppingList 바로가기</button>
    </div>
  );
};
