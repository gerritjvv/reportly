(ns reportly-graph.schema.data
  (:require [clojure.spec.alpha :as s]))

(s/def ::key string?)
(s/def ::name string?)
(s/def ::type string?)
(s/def ::as_name string?)

(s/def ::report_id string?)

(s/def ::data_source_id string?)

(s/def ::column (s/keys :req-un
                        [::key
                         ::name
                         ::type
                         ::as_name]))

(s/def ::columns (s/coll-of ::column))

(s/def ::name string?)
(s/def ::table (s/keys :req-un
                       [::name
                        ::columns]))

(s/def ::tables (s/coll-of ::table))

(s/def ::report_request (s/keys :req-un
                                [::data_source_id
                                 ::tables]))

(s/def ::ReportQuery (s/keys :req-un
                           [::report_id
                            ::report_request]))

(comment

  (def ValidReportQuery {
                         :report_id "122332"
                         :report_request {
                                          :data_source_id "121223"
                                          :tables [{:name "abc"
                                                    :columns [{:key "12"
                                                               :name "abc"
                                                               :type "string"
                                                               :as_name "bla"}]}]

                                          }
                         })
  (defn valid? [obj]
    (when (not (s/valid? ::ReportQuery obj))
      (s/explain ::ReportQuery obj))))