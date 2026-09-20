import clientApi from "./_clientApi.js";

export async function tasksListApi(idUser, { page = 1, limit = 10 } = {}) {
    const { data } = await clientApi.get(`/users/${idUser}/tasks`, {
        params: { page, limit }
    });

    return data;
}
