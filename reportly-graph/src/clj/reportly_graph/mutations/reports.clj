(ns reportly-graph.mutations.reports
  (:require [reportly-graph.schema.data :as schema]
            [reportly-graph.util.resolvers :as resolvers]
            [reportly-graph.db.reports :as db]))

(def save-report
  (resolvers/wrapper
    ::schema/UpdateReport
    :report
    (fn [_ {:keys [report]} _]
      (db/update-report! report))))