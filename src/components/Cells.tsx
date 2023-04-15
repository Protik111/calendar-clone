import clsx from "clsx";
interface Props extends React.PropsWithChildren {
    isActive?: boolean;
    onClick?: () => void;
    className?: string;
}

const Cell: React.FC<Props> = ({ isActive, onClick, className, children }) => {
    return <div onClick={isActive ? undefined : onClick} className={clsx("h-12 flex items-center justify-center border-b border-r",
    { "cursor-pointer hover:bg-gray-100 active:bg-gray-200" : !isActive && onClick },
    { "bg-blue-700 text-white" : isActive },
    className)}>
        {children}
    </div>;
}

export default Cell;