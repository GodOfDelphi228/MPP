const apiUrl = "http://localhost:3003";
export const endpoints = {
    getDish: id => `${apiUrl}/dishes/${id}`,
    putDish: id => `${apiUrl}/dishes/${id}`,
    deleteDish: id => `${apiUrl}/dishes/${id}`,
    postDishes: `${apiUrl}/dishes`,
    getDishList: `${apiUrl}/dishes`,

    login:`${apiUrl}/signIn`,
    registration:`${apiUrl}/signUp`
};
