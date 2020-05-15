export const apiUrl = "http://localhost:3003";
export const endpointsServer = {
    getDish: 'get dish',
    putDish: 'update dish',
    deleteDish: 'delete dish',
    postDish: 'create dish',
    getDishList: 'get all dishes',
};
export const endpointsClient = {
    updated:'updated',
    getAll:'dishes',
    getNew:'new dish',
    getDelete: 'dish deleted'
};
export const authEndpoints = {
    login:`${apiUrl}/signIn`,
    registration:`${apiUrl}/signUp`,
};
