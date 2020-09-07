import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import { getIssueDetail } from "../../service/issueDetail";

import "./styles.css";

export default function IssuesPage() {
    const { issueId } = useParams();

    const [detail, setDetail] = useState(null);

    useEffect(() => {
        fetchIssueDetail();
    }, [issueId]);

    async function fetchIssueDetail() {
        const response = await getIssueDetail({ id: issueId });

        setDetail(response.data);
    }

    return (
        <div className="issue-detail">
            <Link to="/">Back</Link>
            {detail && (
                <div className="issue-detail__content">
                    <div className="issue-detail__ section">
                        <Typography variant="h4">{`${detail.title} # ${detail.number}`}</Typography>
                        <Typography
                            classes={{
                                root: "issue-detail__description",
                            }}
                            variant="body1"
                        >
                            {detail.body}
                        </Typography>
                    </div>
                    <div className="issue-detail__section issue-detail__label-section">
                        <Typography variant="h5">Labels</Typography>
                        <div className="issue-detail__label-container">
                            {detail.labels.map((label) => (
                                <div
                                    className="issue-detail__label"
                                    style={{
                                        backgroundColor: `#${label.color}`,
                                    }}
                                >
                                    {label.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
