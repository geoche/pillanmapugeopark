import ReusableButton from "@components/ReusableButton";

const TextWithImgAndButton = ({sectionText, label, buttonText, buttonRefLink}) => {
    return (
        <div className={`flex items-center justify-center p-4 py-12 mx-auto bg-default-opacity`}>
            <div className="text-center text-white w-screen max-w-7xl">
                <h2 className="text-3xl font-bold py-8 ">{label}</h2>
                {Object.keys(sectionText).map((key, index) => (
                    <p key={index} className="w-full py-4">{sectionText[key]}</p>))}
                <div className={`my-8`}>
                    <ReusableButton buttonText={buttonText} refLink={buttonRefLink}/>
                </div>
            </div>
        </div>
    );
};

export default TextWithImgAndButton;
