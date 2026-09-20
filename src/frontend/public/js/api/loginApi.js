import clientApi from "./_clientApi.js";

export async function loginApi(email, password) {
    const { data } = await clientApi.post("/api/login", {
        email: email,
        password: password
    });

    return data;
}
