export function setQueryParams(
    params: URLSearchParams,
    name: string,
    value?: string,
    defaultValue: string = "all"
) {
    if (value && value !== defaultValue) {
        params.set(name, value);
    } else {
        params.delete(name);
    }
}
