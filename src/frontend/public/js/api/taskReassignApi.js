import clientApi from "./_clientApi.js";

export async function taskReassignApi(idUser, taskId, newUserId) {
    const { data } = await clientApi.put(`/users/${idUser}/tasks/${taskId}`, {
        id_user: newUserId
    });

    return data;
}
