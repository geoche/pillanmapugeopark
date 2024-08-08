const Spinner = () => {
    return (
        <div
            className="m-44 inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-[#6a9a8d]"
            role="status">
        </div>
    );
};

export default Spinner;
