import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store/root.reducer';
import { message } from 'antd';

// Imported Types
import { NotifyState } from '../store/notifications/notify.reducer';

interface Props {
  appNotifications: NotifyState;
}

const Notifications: React.FC<Props> = ({ appNotifications }) => {
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const openNotification = () => {
      switch (appNotifications.type) {
        case 'info':
          return messageApi.open({
            type: 'success',
            content: appNotifications.message,
          });
        case 'error':
          return messageApi.open({
            type: 'error',
            content: appNotifications.message,
          });
        case 'warning':
          return messageApi.open({
            type: 'warning',
            content: appNotifications.message,
          });
        default:
          return null;
      }
    };

    if (appNotifications.active) {
      openNotification();
    }
  }, [appNotifications, messageApi]);

  return (
    <>
      {contextHolder}
    </>
  );
};

const ConnectedNotifications = connect((st: RootState) => ({
    appNotifications: st.appNotifications,
}))(Notifications);



export default ConnectedNotifications
