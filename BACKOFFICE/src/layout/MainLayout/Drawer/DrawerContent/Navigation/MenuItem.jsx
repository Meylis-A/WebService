import { DashboardOutlined, ProfileOutlined,PlusCircleFilled } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    ProfileOutlined,
    PlusCircleFilled
};

const menuItem = {
    menu: [
        {
            label: 'Catégorie',
            url: '/category',
            icon: icons.ProfileOutlined
        },
        {
            label: 'Durée enchère',
            url: '/auction_duration',
            icon: icons.PlusCircleFilled
        },
        {
            label: 'Commission',
            url: '/commission',
            icon: icons.PlusCircleFilled
        },
        {
            label: 'Statistique',
            url: '/statistique',
            icon: icons.DashboardOutlined
        },
        {
            label: 'Validation du rechargement des comptes',
            url: '/recharge_tovalid',
            icon: icons.ProfileOutlined
        },
    ]
};

export default menuItem;
