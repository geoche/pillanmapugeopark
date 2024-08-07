import Spinner from "@components/Spinner";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className={`absolute top-0 bottom-0`}>
            <Spinner/>
        </div>)
}