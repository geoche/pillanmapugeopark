import Link from "next/link";

const ReusableButton = ({buttonText, refLink}) => {
    return (
        <Link href={refLink} passHref>
            <button
                className="px-8 py-3 bg-teal-700 text-white font-bold rounded-xl
                transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg 
                duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90">
                {buttonText}
            </button>
        </Link>
    );
};

export default ReusableButton;
