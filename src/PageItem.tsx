import React, { useEffect, useState } from "react";

import { ReactComponent as DeleteIcon } from "./assets/delete.svg";
import type { Action, Page } from "./types";
import { ActionType } from "./types";

import { PageStatus } from "./PageStatus";

const HEARTBEAT_INTERVAL = 10000;

type PageProps = {
  page: Page;
  dispatch: (action: Action) => void;
};

export const PageItem = ({ dispatch, page }: PageProps) => {
  const [status, setStatus] = useState(null);
  const [statusText, setStatusText] = useState("");
  const [loading, setLoading] = useState(false);
  const label = page?.title ?? page.url;

  useEffect(() => {
    const heartBeat = () => {
      console.log("heartbeat", page.url);
      setLoading(true);
      setStatusText("Loading…");
      try {
        fetch("http://localhost:5000/heartbeat?page=" + page.url)
          .then(response => response.json())
          .then(json => {
            setStatus(json.status);
            setStatusText(json.status === null ? "DOWN" : json.text);
            setLoading(false);
          });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    heartBeat();
    const interval = window.setInterval(heartBeat, HEARTBEAT_INTERVAL);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return (
    <li key={page.url} className="page">
      <PageStatus loading={loading} code={status} text={statusText} />
      <a href={page.url} target="_blank" rel="noreferrer">
        {label}
      </a>
      <button
        className="button-delete"
        onClick={() => {
          if (window.confirm(`Delete page "${label}"?`)) {
            dispatch({
              type: ActionType.Delete,
              page: {
                url: page.url,
              },
            });
          }
        }}
        title={`Delete page ${label}`}
      >
        <DeleteIcon />
      </button>
    </li>
  );
};
