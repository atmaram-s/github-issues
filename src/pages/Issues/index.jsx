import React, { useEffect, useState, useRef } from "react";

import { useHistory } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Search from "@material-ui/icons/Search";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Pagination from "@material-ui/lab/Pagination";

import { PAGE_SIZE } from "../../constants";

import { searchIssues } from "../../service/search";

import "./styles.css";

export default function IssuesPage() {
    const [issues, setIssues] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchText, setSearchText] = useState("");

    const timeOutRef = useRef(null);
    const valueRef = useRef("");

    const history = useHistory();

    useEffect(() => {
        fetchIssues();
    }, [page, searchText]);

    async function fetchIssues() {
        const response = await searchIssues({ page, searchText });

        setIssues(response.data.items);
        setTotalPages(Math.ceil(response.data.total_count / PAGE_SIZE));
    }

    function handlePageChange(_event, value) {
        setPage(value);
    }

    function handleSearchInputChange(event) {
        valueRef.current = event.target.value;

        if (timeOutRef.current) {
            clearTimeout(timeOutRef.current);
        }

        timeOutRef.current = setTimeout(() => {
            timeOutRef.current = null;
            setSearchText(valueRef.current);
            valueRef.current = "";
        }, 200);
    }

    function handleItemClick(issueId) {
        history.push(`/detail/${issueId}`);
    }

    return (
        <div className="issues">
            <div>
                <TextField
                    placeholder="Search"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    onChange={handleSearchInputChange}
                />
            </div>
            <List>
                {issues.map((issue) => (
                    <ListItem
                        key={issue.id}
                        button
                        onClick={handleItemClick.bind(null, issue.number)}
                    >
                        <ListItemText
                            primary={issue.title}
                            secondary={`#${issue.number} opened by ${issue.user.login}`}
                        />
                    </ListItem>
                ))}
            </List>

            {Boolean(issues.length) && (
                <div className="issues__pagination-container">
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
}
