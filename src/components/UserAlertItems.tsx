import React from 'react'
import { notification } from 'antd';
import { connect } from 'react-redux'
import { RootState } from '../store/root.reducer'

interface Props {
    userDataNotifications: {active: boolean, message: string}
}

const UserAlertItems: React.FC<Props> = ({
    userDataNotifications
}) => {
    const [api, contextHolder] = notification.useNotification();


    const openNotification = () => {
        api.open({
            message: 'Notification',
            description: userDataNotifications.message,

        });
    }

  return (
    <>
        {contextHolder}
        {
            userDataNotifications.active && openNotification()
        }
    
    </>
  )
}

const mapStateToProps = (st: RootState) => ({
    userDataNotifications: st.userDataNotifications
})

const ConectedUserAlertItems = connect(mapStateToProps, null)(UserAlertItems)

export default ConectedUserAlertItems