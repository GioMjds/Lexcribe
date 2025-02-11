interface DrawerButton {
    id: number;
    icon: string;
    label: string;
    action: string;
    loading?: boolean;
}

// Additional buttons update here
export const drawerBtns: DrawerButton[] = [
    {
        id: 1,
        icon: "fas fa-plus",
        label: "New Chat",
        action: "newChat"
    }
];