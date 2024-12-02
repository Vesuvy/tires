import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import MaskedInput from 'antd-mask-input';

const TireStorageEditModal = ({ tireStorage, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  const initialValues = tireStorage
    ? {
        адрес: tireStorage.адрес,
        стоимость: tireStorage.стоимость,
        дата_начала_хранения: tireStorage.дата_начала_хранения,
        дата_окончания_хранения: tireStorage.дата_окончания_хранения,
        документ: tireStorage.документ,
        фио: tireStorage.фио,
        телефон: tireStorage.телефон,
        названия_шин: tireStorage.названия_шин,
      }
    : {};

  const handleFormSubmit = (values) => {
    onSubmit(values);
    message.success('Данные успешно сохранены');
  };

  return (
    <Modal
      visible={true}
      title={tireStorage ? 'Редактирование данных о хранении шин' : 'Добавление данных о хранении шин'}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} initialValues={initialValues} onFinish={handleFormSubmit}>
        <Form.Item
          label="Адрес"
          name="адрес"
          rules={[{ required: true, message: 'Поле "Адрес" обязательно для заполнения' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Стоимость"
          name="стоимость"
          rules={[{ required: true, message: 'Поле "Стоимость" обязательно для заполнения' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Дата начала хранения"
          name="дата_начала_хранения"
          rules={[{ required: true, message: 'Поле "Дата начала хранения" обязательно для заполнения' }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          label="Дата окончания хранения"
          name="дата_окончания_хранения"
          rules={[{ required: true, message: 'Поле "Дата окончания хранения" обязательно для заполнения' }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          label="Документ"
          name="документ"
          rules={[{ required: true, message: 'Поле "Документ" обязательно для заполнения' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="ФИО"
          name="фио"
          rules={[
            { 
              pattern: /^[A-Za-zА-Яа-я\s]+$/, 
              message: 'Поле "ФИО" должно содержать только буквы' 
            },
            { required: true, message: 'Поле "ФИО" обязательно для заполнения' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Телефон"
          name="телефон"
          rules={[
            { 
              pattern: /^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/, 
              message: 'Поле "Телефон" должно соответствовать формату +7-xxx-xxx-xx-xx' 
            },
            { required: true, message: 'Поле "Телефон" обязательно для заполнения' }
          ]}
        >
          <MaskedInput mask="+7-000-000-00-00" />
        </Form.Item>
        <Form.Item
          label="Названия шин"
          name="названия_шин"
          rules={[{ required: true, message: 'Поле "Названия шин" обязательно для заполнения' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {tireStorage ? 'Сохранить' : 'Добавить'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TireStorageEditModal;