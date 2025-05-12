import Collapse from "./components/collapse";
import Issues from "./components/Issues";

function Project() {
    return (
        <div className="px-2 flex items-start gap-4">
           <Collapse/>
            <div className="flex flex-col gap-2 w-full">
                <Issues />
            </div>
        </div>
    );
}

export default Project;
