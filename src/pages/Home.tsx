import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import "../styles/container.css";
import { useWebSocket } from "../hooks/useWebsocket";

function Home() {
    const navigate = useNavigate();
    const { sendMessage } = useWebSocket();

    const handleCreateLobby = () => {
        const newRoomCode = nanoid(5).toUpperCase();
        sendMessage({
            type: "CREATE_ROOM",
            roomCode: newRoomCode,
        });
        navigate(`/lobby/${newRoomCode}`);
    };

    return (
        <div className="w-screen h-screen flex justify-center items-start">
            <div className="w-1/2 flex flex-col items-center">
                <img
                    src="/src/assets/title.png"
                    alt="Logo game"
                    className="w-full my-6"
                />
                <div className="container-menu w-11/13 flex-col flex gap-8 justify-center ">
                    <button
                        onClick={handleCreateLobby}
                        className="text-4xl cursor-pointer bg-[#863832] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-[#402120] transition-all duration-200"
                    >
                        Create Lobby
                    </button>
                    <button
                        onClick={handleCreateLobby}
                        className="text-4xl cursor-pointer bg-[#863832] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-[#402120] transition-all duration-200"
                    >
                        Join Lobby
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
