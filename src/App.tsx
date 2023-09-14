
import { useMemo, useState } from "react";
import { Row, Form, Card, Col, Button, Spin } from "antd"
import { showNotification } from "./components/general/notification";
import TextArea from "antd/es/input/TextArea";
import { BiTrashAlt, BiPencil } from "react-icons/bi";
import { postMessage } from "./service/service"
import useWindowSize from "./hooks/useWindowSize";






type FormValues = {
  content: string,
  role: string
}


const App = () => {
  const [messages, setMessages] = useState<Array<FormValues>>([])
  const [loading, setLoading] = useState<boolean>(false)

  const size = useWindowSize()
  const [form] = Form.useForm();


  const handleMessage = async (values: FormValues) => {
    const tempArr = [...messages]
    tempArr.push({ ...values, role: "user" })


    const response = await postMessage(values)

    tempArr.push(response.choices[0].message)

    setMessages(tempArr)
    showNotification("success", "Information", "response", null)
    setLoading(false)
  }

  const onFinish = (values: FormValues) => {
    setLoading(true)

    handleMessage(values)
    form.resetFields()
  };

  const onFinishFailed = () => {
    showNotification("error", "Uyarı", "Hop hemşerim nereye formda eksik alanlar var", null)
  };

  if (loading) return <Row justify={"center"}><Spin size="large" /></Row>



  return (
    <Row justify={"center"}>
      <Col xs={24}>
        <Card style={{ backgroundColor: "black", overflowY: "scroll", color: "green", height: size.height * 0.5 }}>
          <Row >
            {messages.map((obj, index) => {
              return (
                <Col xs={24} key={index}>
                  {obj.role === "user" ? "User: " : "Babür: "} {obj.content}
                </Col>

              )
            })}
          </Row>
        </Card>
      </Col>

      <Col xs={24}>


        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={false}
        >

          <Form.Item
            name="content"
            label="Message"
            rules={[{ required: true, message: 'Required' }]}
          >
            <TextArea
              allowClear
              showCount
              rows={3}
              placeholder="Please enter a Message"
            />
          </Form.Item>

          <Form.Item >
            <Button block ghost htmlType="submit">
              Send
            </Button>
          </Form.Item>


        </Form>
      </Col>

    </Row >

  )
}


export default App;