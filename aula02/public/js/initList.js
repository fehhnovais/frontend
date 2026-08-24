import createNameList from "./createNameList.js";
import jsonContent from "../example.json" with { type: "json" };

export default function initList(ulElement) {

    jsonContent.data.forEach(({ name }) => {
        const liElement = createNameList(name);

        ulElement.append(liElement);
    });

}
