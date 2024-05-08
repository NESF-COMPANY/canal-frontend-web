export interface ConfigTable {
    dataKey? : string;
    rows?:number;
    rowsPerPageOptions?: number[];
    loading?: boolean;
    paginator?: boolean;
    globalFilterFields? : string[];
}
