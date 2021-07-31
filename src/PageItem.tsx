import React from "react";

import { ReactComponent as DeleteIcon } from "./assets/delete.svg";
import type { Action, Page } from "./types";
import { ActionType } from "./types";

type PageProps = {
  page: Page;
  dispatch: (action: Action) => void;
};

export const PageItem = ({ dispatch, page }: PageProps) => {
  const label = page?.title ?? page.url;

  return (
    <li key={page.url} className="page">
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
