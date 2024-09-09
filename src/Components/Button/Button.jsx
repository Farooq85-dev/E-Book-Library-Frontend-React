import { Button } from "@material-tailwind/react";

function ButtonComp({
  classes,
  title,
  btnClick,
  btnType,
  btnIcon,
  btnDisable,
}) {
  return (
    <div>
      <Button
        className={`flex shadow-none hover:shadow-none items-center justify-center gap-3 ${classes} bg-primary tracking-widest`}
        fullWidth
        type={btnType}
        disabled={btnDisable}
        onClick={btnClick}
      >
        {title}
        {btnIcon}
      </Button>
    </div>
  );
}

export default ButtonComp;
