import Spinner from "@components/Spinner";

export default function Loading() {
    return (
        <div className={`absolute top-0 bottom-0`}>
            <Spinner/>
        </div>
    );
}