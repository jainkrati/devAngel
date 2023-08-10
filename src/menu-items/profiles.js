// assets
import { GroupOutlined, UserOutlined } from '@ant-design/icons';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

// icons
const icons = {
    UserOutlined,
    GroupOutlined,
    QuestionAnswerIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const profiles = {
    id: 'group-profile',
    title: 'Profile',
    type: 'group',
    children: [
        {
            id: 'my-chats',
            title: 'My Chats',
            type: 'item',
            url: '/chats',
            icon: icons.QuestionAnswerIcon,
            breadcrumbs: true
        },
        {
            id: 'my-profile',
            title: 'My Profile',
            type: 'item',
            url: '/profile',
            icon: icons.UserOutlined,
            breadcrumbs: true
        },
        {
            id: 'experts',
            title: 'Experts',
            type: 'item',
            url: '/experts',
            icon: icons.GroupOutlined,
            breadcrumbs: true
        }
    ]
};

export default profiles;
