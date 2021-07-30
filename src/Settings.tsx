import React, { useRef, useState } from "react";
import { useOutsideClick } from "./useOutsideClick";

import { ReactComponent as ResetIcon } from "./assets/delete-forever.svg";
import { ReactComponent as ExportIcon } from "./assets/download.svg";
import { ReactComponent as ImportIcon } from "./assets/upload.svg";
import { ReactComponent as HeartbeatIcon } from "./assets/heart-pulse.svg";
import { ReactComponent as SettingsIcon } from "./assets/cog.svg";

import { Action, ActionType, State } from "./types";
import { ImportForm } from "./ImportForm";

type SettingsProps = {
  dispatch: (action: Action) => void;
  state: State;
};

export const Settings = ({ dispatch, state }: SettingsProps) => {
  const [visible, setVisible] = useState(false);
  const [importDialogVisible, setImportDialogVisible] = useState(false);

  const settingsRef = useRef(null);

  useOutsideClick(settingsRef, () => setVisible(false));

  return (
    <>
      <div className="settings-wrapper">
        <button
          className="settings-button"
          onClick={() => setVisible(true)}
          style={{ opacity: visible ? 0.25 : 1 }}
        >
          <SettingsIcon width={24} />
        </button>

        {visible && (
          <div className="settings" ref={settingsRef}>
            {/* <div className="tooltip">
              <button
                className="heartbeat-button"
                type="button"
                onClick={() => {
                  console.log("heartbeat");
                }}
              >
                <HeartbeatIcon width={24} />
              </button>
              <label>Heartbeat</label>
            </div> */}

            <div className="tooltip">
              <button
                className="export-button tooltip"
                type="button"
                onClick={() => {
                  const base64Data = btoa(JSON.stringify(state, null, 2));
                  const dataUrl = `data:application/json;base64,${base64Data}`;
                  const downloadLink = document.createElement("a");

                  downloadLink.href = dataUrl;
                  downloadLink.download = "start-page.json";

                  document.body.appendChild(downloadLink);
                  downloadLink.click();
                  document.body.removeChild(downloadLink);
                }}
              >
                <ExportIcon width={24} />
              </button>
              <label>Export</label>
            </div>

            <div className="tooltip">
              <button
                className="import-button tooltip"
                type="button"
                onClick={() => {
                  setImportDialogVisible(true);
                }}
              >
                <ImportIcon width={24} />
              </button>
              <label>Import</label>
            </div>

            <div className="tooltip">
              <button
                className="reset-button tooltip"
                type="button"
                onClick={() => {
                  if (
                    window.confirm("Do you really want to delete all pages?")
                  ) {
                    dispatch({ type: ActionType.Reset });
                  }
                }}
              >
                <ResetIcon width={24} />
              </button>
              <label>Reset</label>
            </div>
          </div>
        )}
      </div>
      {importDialogVisible && (
        <ImportForm
          dispatch={dispatch}
          hide={() => {
            setImportDialogVisible(false);
          }}
        />
      )}
    </>
  );
};
