import ReusableButton from "@components/ReusableButton";

const TextWithImgAndButton = ({textToMap =[], label, buttonText, buttonRefLink}) => {
    return (
        <div className={`flex items-center justify-center py-32 mx-auto bg-default-opacity`}>
            <div className="text-center text-white w-screen lg:px-32 xl:px-72">
                <h2 className="text-3xl font-bold mb-8 md:mb-10">{label}</h2>
                {textToMap.map((text, index) => (
                    <p key={index} className="w-full py-4 px-8 xl:px-72 2xl:px-96">
                        {text}
                    </p>))}
                <div className={`my-14`}></div>
                <ReusableButton buttonText={buttonText} refLink={buttonRefLink}/>
            </div>
        </div>
    );
};

export default TextWithImgAndButton;
