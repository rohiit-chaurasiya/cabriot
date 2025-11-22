interface Data {
    Status: string;
    title: string;
}

export default function Popup() {
    return (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md">
                <p className="text-lg font-bold mb-4">Success!</p>
                <p>Dish Add successfully!</p>
                <button
                    onClick={() => {
                        setKitchenUpdateShowPopup(false);
                    }}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    )
}
