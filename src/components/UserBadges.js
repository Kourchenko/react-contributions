import './App.css';

import { Tooltip } from 'antd';

import {
    CrownTwoTone,
    DeleteTwoTone,
    NotificationTwoTone,
    MessageTwoTone
} from '@ant-design/icons';


const UserBadges = (props) => {

    const getIconComponent = (type) => {
        switch (type) {
            case 'CrownTwoTone':
                return CrownTwoTone;
            case 'DeleteTwoTone':
                return DeleteTwoTone;
            case 'NotificationTwoTone':
                return NotificationTwoTone;
            case 'MessageTwoTone':
                return MessageTwoTone;
        }
    };

    const icon = props.icon;
    const { type, title, color } = icon;
    const IconComponent = getIconComponent(type);
    return (
        <div className="icon-item bounce">
            <Tooltip title={title}>
                <IconComponent key={icon.id} twoToneColor="#faad14" />
            </Tooltip>
        </div>
    );
};

export default UserBadges;
