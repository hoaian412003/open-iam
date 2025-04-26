
import BasicLayout from "@/components/BasicLayout";
import { ReactFlowProvider } from "@xyflow/react";

export default (props: any) => {
  return <>
    <ReactFlowProvider>
      <BasicLayout {...props} />
    </ReactFlowProvider>
  </>
};
