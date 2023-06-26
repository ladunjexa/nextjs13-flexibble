import Image from "next/image";

type Props = {
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: React.MouseEventHandler;
  isSubmitting?: boolean;
  type?: "button" | "submit";
  bgColor?: string;
  textColor?: string;
  classes?: string;
};

const Button = (props: Props) => {
  const {
    title,
    leftIcon,
    rightIcon,
    handleClick,
    isSubmitting,
    type,
    bgColor,
    textColor,
    classes,
  } = props;

  return (
    <button
      type={type || "button"}
      disabled={isSubmitting}
      className={`flexCenter gap-3 px-4 py-3 
      ${textColor || "text-white"}
      ${
        isSubmitting ? "bg-black/50" : bgColor || "bg-primary-purple"
      } rounded-xl text-sm font-medium max-md:w-full ${classes}`}
      onClick={handleClick}
    >
      {leftIcon && (
        <Image src={leftIcon} width={14} height={14} alt="left icon" />
      )}
      {title}
      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="right icon" />
      )}
    </button>
  );
};

export default Button;
