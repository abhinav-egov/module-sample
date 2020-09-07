import React from "react"
import { useSelector } from "react-redux"
import Pages from "../@egovernments/digit-utils/enums/Pages"

const ListPage = () => {
  const pageConfig = useSelector(state => state.config[Pages.PGR_LIST])
  return <div>
    Complaints List
    <pre>{JSON.stringify(pageConfig, null, 2)}</pre>
  </div>
}

export default ListPage;