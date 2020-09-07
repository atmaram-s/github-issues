import baseInstance from "./apiBase";
import { PAGE_SIZE } from "../constants";

export async function searchIssues({
    repo = "angular/angular/node",
    entries = PAGE_SIZE,
    page = 1,
    state = "open",
    searchText = "",
} = {}) {
    return baseInstance({
        url: "/search/issues",
        method: "GET",
        params: {
            q: `repo:${repo}+type:issue+state:${state} ${searchText}`,
            per_page: entries,
            page,
        },
    });
}
