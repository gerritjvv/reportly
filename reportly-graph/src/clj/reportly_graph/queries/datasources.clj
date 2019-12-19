(ns reportly-graph.queries.datasources
  (:require [com.walmartlabs.lacinia.schema :as lacina]
            [reportly-graph.db.datasources :as db]))



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

;;; Public queries


(defn get-data-sources
  "Graphql entry point for datasources
   Returns a list of data sources possibly filtering by id"
  [context args value]

  (prn "get-data-source: " {:context (keys context) :args args :value value})
  (map _convert-to-graph-spec
       (db/get-data-sources! args)))