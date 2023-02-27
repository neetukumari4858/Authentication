
import { Button } from "antd";
const UseButton = ({btn_Class,text}:any): JSX.Element => {
  return (
    <Button type="primary" htmlType="submit" className={btn_Class}>
     {text}
    </Button>
  );
};
export default UseButton;