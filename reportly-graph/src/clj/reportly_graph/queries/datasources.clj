(ns reportly-graph.queries.datasources
  (:require [com.walmartlabs.lacinia.schema :as lacina]))



;;; Helper functions Data Sources

(defmulti _convert-to-graph-spec :type)


(defmethod _convert-to-graph-spec :default [record]
  (throw (ex-info (str "The type: " (:type record) " is not supported") record)))

(defmethod _convert-to-graph-spec :DB [record]
  (lacina/tag-with-type
    record
    :db_data_source))

(defmethod _convert-to-graph-spec :API [record]
  (lacina/tag-with-type
    record
    :api_data_source))

(defn _select-data-sources [{:keys [id]}]
  [ {:id       "uuid123323"
     :name     "Test1"
     :type     :DB
     :user     "test"
     :password "1234"
     :db_type  :POSTGRES
     :url      "localhost"
     :port     5432
     :ssl      true
     }])

;;; Public queries


(defn get-data-sources
  "Graphql entry point for datasources
   Returns a list of data sources possibly filtering by id"
  [context args value]

  (prn "get-data-source: " {:context (keys context) :args args :value value})
  (map _convert-to-graph-spec
       (_select-data-sources args)))