import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TaskBoard from "../components/TaskBoard/TaskBoard";

const Root = () => {
    return (
        <div>
            <Header></Header>
            <Banner></Banner>
            <TaskBoard></TaskBoard>
            <Footer></Footer>
        </div>
    );
};

export default Root;