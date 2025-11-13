import React from "react";

interface FaIconProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  // Add other props that might be passed from MDX if necessary
}

const FaIcon: React.FC<FaIconProps> = ({ children, className: propClassName, ...rest }) => {
  // Prioritize propClassName
  const finalClassName = propClassName || "";

  return (
    <i className={finalClassName} {...rest}>
      {children}
    </i>
  );
};

export default FaIcon;
