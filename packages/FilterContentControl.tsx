import type { FunctionalComponent } from "preact";
import "./ContentFilterSelect.css";
import * as CONFIG from "../../config";

let NAME = CONFIG.FILTER_OPTIONS.label || CONFIG.FILTER_OPTIONS.prefix || "";

const setCookie = (val) => {
    if (val) {
        localStorage.setItem("content-filter", val);
    } else {
        localStorage.removeItem("content-filter");
    }
};

export const setDOM = (val) => {
    if (!val) {
        val = localStorage.getItem("content-filter");
    }
    //if multiple selections are allowed, set the status of the summary text
    document.querySelectorAll(".content-filter-multi-name").forEach((x) => {
        x.innerText = val ? (NAME ? NAME + " " : "") + val : NAME;
    });

    //TODO: DOM visibility work
    if (val) {
        document.body.dataset.adf = val;
    } else {
        document.body.removeAttribute("data-adf");
    }
};

const changeFilterLevel = (e) => {
    let idx = e.target.selectedIndex;
    let selected = e.target.options[idx].value;
    document.querySelectorAll(".content-filter-select").forEach((select) => {
        select.selectedIndex = idx;
        setCookie(selected);
        setDOM(selected);
    });
};

const changeFilterMulti = (e) => {
    e.path
        .filter((x) => x.className == "content-filter-select")
        .forEach((parent) => {
            let boxes = parent.querySelectorAll("input[type='checkbox']");
            let res = [];
            boxes.forEach((box) => {
                if (box.checked) {
                    res.push("" + box.value);
                }
            });
            let selected = res.sort().join(", ");
            setCookie(selected);
            setDOM(selected);
        });
};

const filterIcon = (
    <svg
        aria-hidden="true"
        focusable="false"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height="1.2em"
        width="1.2em"
        style="vertical-align:middle;margin-right:0.5em;"
        class="content-filter-icon"
    >
        <path
            fill="currentColor"
            d="M3.853 54.87C10.47 40.9 24.54 32 40 32H472C487.5 32 501.5 40.9 508.1 54.87C514.8 68.84 512.7 85.37 502.1 97.33L320 320.9V448C320 460.1 313.2 471.2 302.3 476.6C291.5 482 278.5 480.9 268.8 473.6L204.8 425.6C196.7 419.6 192 410.1 192 400V320.9L9.042 97.33C-.745 85.37-2.765 68.84 3.854 54.87L3.853 54.87z"
        />
    </svg>
);

const FilterContentControl: FunctionalComponent<{ lang: string }> = ({ lang }) => {
    const stored = localStorage.getItem("content-filter");
    const ADF_NAME = stored?((CONFIG.FILTER_OPTIONS.prefix?CONFIG.FILTER_OPTIONS.prefix+" ":"")+ stored) : NAME;
    const allOptions = CONFIG.FILTER_OPTIONS.items.join(",");
    return (
        <div class="content-filter-select-wrapper">
            {CONFIG.FILTER_OPTIONS.multiple && (
                <details class="content-filter-select">
                    <summary>
                        {filterIcon}
                        <span class="content-filter-multi-name">{ADF_NAME || "Filter"}</span>
                    </summary>
                    <ul onclick={changeFilterMulti}>
                        {CONFIG.FILTER_OPTIONS.items.map((opt, idx) => (
                            <li>
                                <input type="checkbox" id={`content-filter-${idx}`} value={opt}/>
                                <label for={`content-filter-${idx}`}>
                                    {CONFIG.FILTER_OPTIONS.prefix.length >= 1 &&
                                        CONFIG.FILTER_OPTIONS.prefix + " "}
                                    {opt}
                                </label>
                            </li>
                        ))}
                    </ul>
                </details>
            )}
            {!CONFIG.FILTER_OPTIONS.multiple && (
                <div class="content-filter-select-wrapper">
                    {filterIcon}
                    <select
                        class="content-filter-select"
                        value={lang}
                        onChange={changeFilterLevel}
                        placeholder={NAME || "Filter"}
                        multiple={CONFIG.FILTER_OPTIONS.multiple ? true : false}
                    >
                        {NAME && (
                            <option value={allOptions}>
                                <span>
                                    All{" "}
                                    {CONFIG.FILTER_OPTIONS.label || CONFIG.FILTER_OPTIONS.prefix}
                                </span>
                            </option>
                        )}
                        {!NAME && (
                            <option value="">
                                <span>No Filter</span>
                            </option>
                        )}
                        {CONFIG.FILTER_OPTIONS.items.map((opt) => {
                            return (
                                <option value={opt}>
                                    <span>
                                        {CONFIG.FILTER_OPTIONS.prefix &&
                                            CONFIG.FILTER_OPTIONS.prefix + " "}
                                        {opt}
                                    </span>
                                </option>
                            );
                        })}
                    </select>
                </div>
            )}
        </div>
    );
};

export default FilterContentControl;
