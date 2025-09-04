import Collapse from "./components/collapse";
import Issues from "./components/Issues";
import HeaderBar from "./components/headerBar";
import Sheets from "./sheets";

function Project() {
    return (
        <div>
            <HeaderBar />
            <div className="flex w-full gap-2 mt-2">
            <Collapse/>
            <Issues />
           </div>
           <Sheets/>
        </div>
    );
}

export default Project;
