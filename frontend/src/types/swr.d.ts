interface SWRResponse<Data = any, Error = any> {
    data?: Data;
    error?: Error;
    mutate: KeyedMutator<Data>;
    isValidating: boolean;
}