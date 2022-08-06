export const toJsTime = (date) => {
    return !!date ? new Date(date.seconds * 1000) : null;
}