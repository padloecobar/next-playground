import {getComponentByID} from "@/lib/api";
import {BaseComponent} from "@/components/BaseComponent";
import { ComponentResolver } from '@/components/ComponentResolver/ComponentResolver';
import DemoComponentLevelB from '@/components/DemoComponentLevelB/Model';

const ViewModel = async ({entry}: { entry: DemoComponentLevelB }) => {
  //console.log('entry = ', entry);
  const data = await getComponentByID<DemoComponentLevelB>(entry);
  const children = await data.getChildren();
  return (
    <>

      uniqueTitle : {data.title}
  {children.map(item => {
    <ComponentResolver entry={item}/>
  })}
  </>
);
}

export default ViewModel;