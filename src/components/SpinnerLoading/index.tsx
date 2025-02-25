type Props = {
    color?: string;
};

const SpinnerLoading = ({ color }: Props) => {
    return (
        <div className="w-full h-full flex justify-center items-center py-10">
            <div
                className={`w-20 h-20 border-8 border-gray-300 border-t-primary-purple rounded-full animate-spin ${color}`}
            ></div>
        </div>
    );
};

export default SpinnerLoading;
