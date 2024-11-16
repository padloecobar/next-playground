import {getComponentByID} from "@/lib/api";
import DemoComponentLevelA from "@/components/DemoComponentLevelA/Model";
import {BaseComponent} from "@/components/BaseComponent";
import { ComponentResolver } from '@/components/ComponentResolver/ComponentResolver';

const ViewModel = async ({entry}: { entry: BaseComponent }) => {
    console.log('ViewModel entry = ', entry);
    const data = await getComponentByID<DemoComponentLevelA>(entry);
    console.log('ViewModel data = ', data);
    const children = await data.getChildren();
    return (
        <>

            uniqueTitle : {data.uniqueTitle}
            {children.map(item => {
                <ComponentResolver entry={item}/>
            })}
        </>
    );
}

export default ViewModel;