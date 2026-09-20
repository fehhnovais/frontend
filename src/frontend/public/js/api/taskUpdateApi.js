import clientApi from "./_clientApi.js";

export async function taskUpdateApi(idUser, taskId, updates) {
    const { data } = await clientApi.put(`/users/${idUser}/tasks/${taskId}`, updates);

    return data;
}
