export const defaultImage = (name: string) => {
    name.split(' ').map((item: string) => {
        return item.charAt(0).toUpperCase() + item.slice(1);
    });
};
