(ns reportly-graph.queries.columns)


(defn _convert-to-graph-spec [record]
  record)

(defn _select-columns [table]
  [
   {:key     "col1"
    :name    "Col1"
    :type    "string"
    :as_name "Column One"}
   ])

;;; Public queries


(defn get-table-columns
  "Graphql entry point for columns
   Returns a list of table column objects belonging to a table"
  [context args table]

  (prn "get-table-columns:  select-values: " table)

  (when table
    (map _convert-to-graph-spec
         (_select-columns table))))