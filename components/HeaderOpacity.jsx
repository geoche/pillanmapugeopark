const HeaderOpacity = ({title}) => {
    return (
        <div className={`flex flex-center mx-auto bg-default-opacity w-full min-h-44 md:min-h-60 p-4`}>
            <h1 className={`text-h-main text-white`}>{title}</h1>
        </div>
    );
};

export default HeaderOpacity;
