// Guarda o userId em memória durante a sessão
let currentUserId = null;

export function setUserId(userId) {
    currentUserId = userId;
}

export function getUserId() {
    return currentUserId;
}

export function clearUserId() {
    currentUserId = null;
}
