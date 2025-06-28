import Button from "../components/Buton";
import Menu from "../components/Menu";

function Home() {
    return (
        <div className="w-screen h-screen flex justify-center items-start">
            <div className="w-1/2 flex flex-col items-center">
                <img
                    src="/src/assets/title.png"
                    alt="Logo game"
                    className="w-10/12 py-6"
                />

                <Menu>
                    <Button label="Crear Sala" to="/lobby" />
                    <Button label="Unirse a una sala" to="/lobby" />
                </Menu>
            </div>
        </div>
    );
}

export default Home;
