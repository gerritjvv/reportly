(ns reportly-graph.queries.data
  (:require [reportly-graph.schema.data :as schema]
            [reportly-graph.util.resolvers :as resolvers])
  (:import (java.util UUID)))


;;; simple threading

(def QUERIES (atom {}))



(defn report-query [context {:keys [report]} value]
        (prn ">>>>>>>>>>>>>>>>>>> REPORT QUERY >>>>>>>>>")

  (prn report)

  (let [id (.toString (UUID/randomUUID))]

    ;;-- here we need to send the query to a queue for querying the data
    ;; {:report_id "122", :report_request {:data_source_id "1223", :tables [{:columns [{:as_name "bla", :key "abc"}], :name "my_table"}]}}
    (swap! QUERIES update id (fn [_]
                               {:status :INPROGRESS :poll-count 0 :columns (map :key (:columns (first (get-in report [:report_request :tables]))))}))
    (prn "Returning values: >>>>>>" )
    {:id id}))


(defn report-query-poll [context args value]
  (prn ">>>>>>>>>>>>>>>>>>> REPORT QUERY POLL >>>>>>>>>")
  (prn QUERIES)
  (prn args)

  (let [id (:report_query_id args)
        _ (prn "update in: " id)
        poll-count (get-in (swap! QUERIES update-in [id :poll-count] inc) [id :poll-count])]

    (if (and poll-count  (> poll-count 1))
      {:status :DONE
       :columns (get-in @QUERIES [id :columns])
       :rows (into [] (repeatedly 10 (fn [] [(str (rand-int 1000))])))}
      {:status :INPROGRESS})))