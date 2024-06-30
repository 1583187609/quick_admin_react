import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  return {
    go(num: number) {
      navigate(num);
    },
    push(path: string) {
      // if(typeof path==='string'){
      navigate(path);
      // }else{
      //   navigate(path.name)
      // }
    },
    replace() {},
  };
};
