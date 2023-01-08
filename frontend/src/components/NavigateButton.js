import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const NavigateButton = ({ href, children }) => {
  const navigate = useNavigate();
  return <Button onClick={() => navigate(href)}>{children}</Button>;
};
