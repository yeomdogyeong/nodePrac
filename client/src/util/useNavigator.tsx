import { useNavigate } from "react-router";

export const useNavigator = () => {
  const navigate = useNavigate();
  const goToAbout = (route: string) => {
    navigate(`${route}`);
  };

  return { goToAbout };
};
