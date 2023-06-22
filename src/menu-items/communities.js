import ExploreIcon from '@mui/icons-material/Explore';
import PeopleIcon from '@mui/icons-material/People';
// icons
const icons = {
    ExploreIcon,
    PeopleIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const communities = {
    id: 'group-communities',
    title: 'Communities',
    type: 'group',
    children: [
        {
            id: 'explore',
            title: 'Explore',
            type: 'item',
            url: '/explore',
            icon: icons.ExploreIcon,
            breadcrumbs: true
        },
        {
            id: 'my-communities',
            title: 'My Communities',
            type: 'item',
            url: '/mycommunities',
            icon: icons.PeopleIcon,
            breadcrumbs: true
        }
    ]
};

export default communities;
