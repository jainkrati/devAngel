// assets
import { QuestionCircleFilled, QuestionCircleOutlined, QuestionOutlined } from '@ant-design/icons';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
// icons
const icons = {
    QuestionOutlined,
    QuestionCircleOutlined,
    QuestionCircleFilled,
    LiveHelpIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const questions = {
    id: 'group-questions',
    title: 'Questions',
    type: 'group',
    children: [
        {
            id: 'latest-questions',
            title: 'Latest Questions',
            type: 'item',
            url: '/latest-questions',
            icon: icons.QuestionCircleFilled,
            breadcrumbs: true
        },
        {
            id: 'ask-question',
            title: 'Ask Question',
            type: 'item',
            url: '/ask-question',
            icon: icons.QuestionOutlined,
            breadcrumbs: true
        },
        {
            id: 'my-questions',
            title: 'My Questions',
            type: 'item',
            url: '/my-questions',
            icon: icons.QuestionCircleOutlined,
            breadcrumbs: true
        },
        {
            id: 'solved-questions',
            title: 'Solved Questions',
            type: 'item',
            url: '/solved-questions',
            icon: icons.LiveHelpIcon,
            breadcrumbs: true
        }
    ]
};

export default questions;
