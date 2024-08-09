import ReusableButton from "@components/ReusableButton";

const TextWithImgAndButton = ({textToMap =[], label, buttonText, buttonRefLink}) => {
    return (
        <div className={`flex items-center justify-center py-12 mx-auto bg-default-opacity`}>
            <div className="text-center text-white w-screen max-w-7xl">
                <h2 className="text-3xl font-bold py-8 ">{label}</h2>
                {textToMap.map((text, index) => (
                    <p key={index} className="w-full py-4">
                        {text}
                    </p>))}
                <div className={`my-14`}></div>
                <ReusableButton buttonText={buttonText} refLink={buttonRefLink}/>
            </div>
        </div>
    );
};

export default TextWithImgAndButton;
