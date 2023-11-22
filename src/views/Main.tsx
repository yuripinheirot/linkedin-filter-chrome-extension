import { ExclamationCircleFilled, PlusSquareFilled } from '@ant-design/icons'
import {
  Button,
  Flex,
  Form,
  Input,
  List,
  Modal,
  Tooltip,
  Typography,
} from 'antd'
import Title from 'antd/es/typography/Title'
import { useContext } from 'react'
import { EditableText } from '../components/EditableText'
import { BlackListContext } from '../context/BlackList.context'
import { BlackListType } from '../types/BlackList.type'
const { info, confirm, destroyAll } = Modal

export const MainView = () => {
  const { blackListActions, blackListStore } = useContext(BlackListContext)

  const saveChangesEditableText = async (data: BlackListType) => {
    await blackListActions.update(data)
  }

  const deleteFilter = async (data: BlackListType) => {
    await blackListActions.delete(data)
  }

  const handleDeleteModal = (data: BlackListType) => {
    confirm({
      title: 'Deseja realmente deletar este filtro?',
      icon: <ExclamationCircleFilled />,
      content: data.description,
      onOk() {
        deleteFilter(data)
      },
    })
  }

  const handleCreateModal = () => {
    info({
      icon: <ExclamationCircleFilled />,
      footer: null,
      closable: true,
      maskClosable: true,
      content: (
        <Form
          layout='vertical'
          onFinish={async (payload) => {
            await blackListActions.create(payload)
            destroyAll()
          }}
        >
          <Typography.Title level={5}>
            Adicione uma descrição para seu filtro
          </Typography.Title>
          <Form.Item<string>
            name='description'
            rules={[
              { required: true, message: 'Por favor, insira uma descrição!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              margin: 0,
            }}
          >
            <Button
              type='primary'
              htmlType='submit'
            >
              Salvar
            </Button>
          </Form.Item>
        </Form>
      ),
    })
  }

  return (
    <Flex
      vertical
      style={{ width: 500, height: 700, padding: 20 }}
    >
      <Flex
        justify='space-between'
        align='center'
      >
        <Title>Filtros</Title>
        <Tooltip title='Novo'>
          <Button
            icon={<PlusSquareFilled />}
            size='small'
            style={{ marginRight: 7 }}
            onClick={handleCreateModal}
          />
        </Tooltip>
      </Flex>
      <List
        itemLayout='horizontal'
        dataSource={blackListStore}
        renderItem={(item) => (
          <EditableText
            data={item}
            saveChanges={saveChangesEditableText}
            openModal={handleDeleteModal}
          />
        )}
        rowKey={(item) => item.id!}
      />
    </Flex>
  )
}
