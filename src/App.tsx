
import { useMemo, useState } from "react";
import { Row, Popover, Table, Button, Space, Drawer, Form, Input, Tooltip } from "antd"
import { showNotification } from "./components/general/notification";
import { PlusOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import { BiTrashAlt, BiPencil } from "react-icons/bi";
import { postMessage } from "./service/service"






type FormValues = {
  content: string,
}


const App = () => {




  const handleMessage = async (values: FormValues) => {
    const response = await postMessage(values)
    console.log(response)
    showNotification("success", "Information", response, null)

  }


  useMemo(() => {
    handleMessage({ content: "hi,how are you?" })
  }, [])





  return (<Row justify={"center"}>


  </Row>
  )
}


export default App;