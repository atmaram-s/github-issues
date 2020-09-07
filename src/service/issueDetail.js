import baseInstance from "./apiBase";

export async function getIssueDetail({ repo = "angular/angular", id }) {
    return baseInstance({
        url: `repos/${repo}/issues/${id}`,
        method: "GET",
    });
}
