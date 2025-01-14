interface DrawerButton {
    id: number;
    icon: string;
    label: string;
    action: string;
    loading?: boolean;
}

export const drawerBtns: DrawerButton[] = [
    {
        id: 1,
        icon: "fas fa-plus",
        label: "New Chat",
        action: "newChat"
    },
    {
        id: 2,
        icon: "fas fa-history",
        label: "Chat History",
        action: "chatHistory",
        loading: false
    }
];