export const Routes = {
    dishes: '/dishes',
    newDish: '/dishes/create',
    login: '/signIn',
    registration: '/signUp',
    dishDetail:`/dishes/:id?/editor`,
};

export const getRouteForUpdate = (url, id) => {
    return url.replace(':id?',id);
}
