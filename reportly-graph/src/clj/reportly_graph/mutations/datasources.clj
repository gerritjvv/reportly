(ns reportly-graph.mutations.datasources
  (:require [reportly-graph.schema.datasources :as ds-schema]
            [reportly-graph.util.resolvers :as resolvers]
            [reportly-graph.db.datasources :as db]))


;;; Helper functions Data Sources

(defmulti _convert-to-graph-spec :type)


(defmethod _convert-to-graph-spec :default [record]
  (throw (ex-info (str "The type: " (:type record) " is not supported") record)))

;; Route for datasources to test connection of a datasource
(def test-db-data-source
  (resolvers/wrapper
    ::ds-schema/DBDataSourceInput
    :data_source
    (fn [_ {:keys [data_source]} _]
      (assoc
        data_source
        :id (System/currentTimeMillis)))))


(def save-db-data-source
  (resolvers/wrapper
    ::ds-schema/DBDataSourceInput
    :data_source
    (fn [_ {:keys [data_source]} _]
      (db/update-ds! (assoc data_source :type :DB)))))