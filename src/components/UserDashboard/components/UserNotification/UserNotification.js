import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotification } from '../../../../actions/NotificationAction';
import React from 'react';
import { Card, Typography, Space } from 'antd';
import { BellOutlined, FieldTimeOutlined } from '@ant-design/icons';
import './UserNotification.css';
function UserNotification(props) {
    const dispatch = useDispatch();
    const candidate = useSelector((state) => state.getCandidateInfo.candidate);
    const notifications = useSelector((state) => state.getNotification.notifications);

    const page = {
        "pageNo": 0,
        "pageSize": 10,
        "sortBy": "createDate",
        "sortDir": "desc",
    }
    useEffect(() => {
        dispatch(getNotification(candidate?.accountId, page));
    }, [dispatch, candidate]);
    const { Text } = Typography;
    return (
        <div>
            {notifications && notifications.length === 0 ?
                (<p style={{ color: 'black', fontSize: '20px' }}>Không có kết quả </p>) :
                (
                    <div className="userNotification">
                        {notifications && notifications.map((item, index) => (
                            <div key={index} className='userNotificationDetail'>
                                {/* <Card style={{ width: '800px', marginTop: 16 }}>
                                    <Space direction="vertical" align="center" style={{ width: '100%' }}>
                                        <BellOutlined style={{ fontSize: '24px' }} />
                                        <Text>{item.content}</Text>
                                        <div>
                                            <FieldTimeOutlined style={{ marginRight: 8 }} />
                                            <Text>{item.timeAgo}</Text>
                                        </div>
                                    </Space>
                                </Card> */}
                                <BellOutlined style={{ fontSize: '24px' }} />
                                <Text>{item.content}</Text>
                                <div>
                                <FieldTimeOutlined style={{ marginRight: 8 }} />
                                            <Text>{item.timeAgo}</Text>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
}

export default UserNotification;