

export const API = {
    signup: "http://localhost:4000/api/v1/auth/signup",
    login: "http://localhost:4000/api/v1/auth/login",
    // inventory: "http://localhost:4000/api/v1/mess/updatestock"
    inventory: "/api/mess/putstock",
    getInventory: "/api/mess/getStock",
    addItems: "/api/mess/addItem",
    addConsumption: "/api/mess/addConsumption",
    purchaseStock: "/api/mess/purchaseStock",
    feedback: "/api/mess/feedback",
    recciSave: "/api/recci/save",
    recciGetAll: "/api/recci/getAll",
    recciGetById: "/api/recci/getById"
}
