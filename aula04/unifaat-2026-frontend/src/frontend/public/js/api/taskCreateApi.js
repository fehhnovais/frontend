import clientApi from "./_clientApi.js";

export async function taskCreateApi(idUser, task) {
    const { data } = await clientApi.post(`/users/${idUser}/tasks`, task);

    return data;
}
