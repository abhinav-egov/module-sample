import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import safeEval from "safe-eval";

const getValue = (object, attrArray) => {
  const key = attrArray[0];
  if (key && object[key]) {
    attrArray.shift();
    if (attrArray.length > 0) {
      return getValue(object[key], attrArray);
    } else {
      return object[key];
    }
  }
  return null;
};

const getStyle = (base, val) => {
  if (base) {
    return base + (val >= 14 ? " green" : val >= 0 ? " orange" : " red");
  }
  return null;
};

const workflowStatusMap = {
  INWORKFLOW: "Waiting for Approval",
};

const ResultTable = ({ data, config, last }) => {
  const city = useSelector((state) => state.cityCode);
  const { t } = useTranslation();

  const formatVal = (property, att) => {
    let value = getValue(property, att.key.split("."));
    if (att.modify) {
      value = safeEval(att.modify, { value });
    }
    if (att.type && att.type === "workflow-status") {
      value = workflowStatusMap[value] || "NA";
    }
    if (att.translate) {
      const cityCode = city.replace(".", "_");
      value = t(`${att.i18nPrefix ? att.i18nPrefix.replace("{cityCode}", cityCode) : ""}${value}`.toUpperCase());
    }

    return (
      <span className={getStyle(att.style, value)}>
        {att.link ? <Link to={`/applicationNumber=${property.propertyId}&tenantId=${property.tenantId}`}>{value}</Link> : value}
      </span>
    );
  };

  return (
    <div>
      <table className="result">
        <thead>
          <tr>
            {config.map((column, index) => {
              return (
                <th key={column.key} onClick={() => {}}>
                  {column.title} {column.sort && column.sort.enabled && column.sort.sortBy ? (column.sort.sortBy === "asc" ? "↓" : "↑") : ""}
                </th>
              );
            })}
            <th>{last.title}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                {config.map((att, index2) => {
                  return <td key={index2}>{formatVal(item, att)}</td>;
                })}
                <td onClick={() => last.onClick(item)}>
                  <last.element />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
