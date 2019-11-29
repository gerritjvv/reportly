(ns reportly-graph.queries.tables)


(defn _convert-to-graph-spec [record]
  record)

(defn _select-tables [db-data-source]
  [{:id "fkdsajfksdfd"
    :name "table1"
    }
   {:id "121213221"
    :name "table2"}
   ])

;;; Public queries


(defn get-data-source-tables
  "Graphql entry point for tables
   Returns a list of table objects belonging to a database"
  [context args db-data-source]

  (prn "get-tables-for-ds:  select-values: " (mapv :field (:selections (:com.walmartlabs.lacinia/selection context))))

  (when db-data-source
    (map _convert-to-graph-spec
         (_select-tables db-data-source))))