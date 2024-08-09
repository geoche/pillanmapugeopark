import Link from "next/link";

const ReusableButton = ({ buttonText, refLink, onClickAction }) => {
    const button = (
        <button
            onClick={onClickAction}
            className={`px-4 py-2 bg-button rounded text-white hover:bg-[#547b70] transition-colors duration-300 ease-in-out`}
        >
            {buttonText}
        </button>
    );

    if (refLink) {
        return (
            <Link href={refLink} passHref className={`my-4`}>
                {button}
            </Link>
        );
    }

    return <div className="my-4">{button}</div>;
};

export default ReusableButton;
