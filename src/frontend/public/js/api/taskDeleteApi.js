import clientApi from "./_clientApi.js";

export async function taskDeleteApi(idUser, taskId) {
    const { data } = await clientApi.delete(`/users/${idUser}/tasks/${taskId}`);

    return data;
}
